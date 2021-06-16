/*eslint-disable*/
import react, { useState, useRef,useEffect } from 'react';//export Default된 항목은 {}없이 받음
import { Row, Col, InputGroup, FormControl, Button, Form, Pagination, Image, Tabs, Tab, ButtonGroup } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import { keys } from '../../key.js'
import axios from 'axios'
import { connect } from 'react-redux';
import Swal from 'sweetalert2'


function Sell(props) {

    const codeItems = {};
    let [codeR, codeRUpd] = useState([])
    let [codeM, codeMUpd] = useState([])

    //코드초기화
    useEffect(() => {
        const searchCode=["R","M"]

        axios.post(`${props.state.rootUrl}/common-data/code`,searchCode, {
            headers: {
                "Content-Type": "application/json"
            },withCredentials: true
        })
        .then((result) => {
            if (result.status == 200) {
                result.data.forEach((codeArr,i) => {
                    codeItems[searchCode[i]]=[]
                    codeArr.forEach((elem,idx)=>{
                        codeItems[searchCode[i]].push(<option value={elem['code']}>{elem['name']}</option>)
                    })
                });
                codeRUpd(codeItems['R'])
                codeMUpd(codeItems['M'])
                debugger
            }
        }).catch((result) => {
            debugger
            console.log(result.response.data.message)
        })
    },[])


    const btnSearchPost = useRef(false)

    const [initVal, setInitVal] = useState({
        houseType1: "",
        houseType2: "",
        post: "",
        city1: "",
        city2: "",
        city3: "",
        title: "",
        content: "",
        fileNm1: "",
        fileNm2: ""
    });

    const [tempImg, setTempImg] = useState({
        fileTemp1: "./cardImg.svg",
        fileTemp2: "./cardImg.svg"
    });

    function searchPost() {

        //우편번호길이체크
        if (initVal.post.length !=7) {
            Swal.fire({
                icon: 'warning',
                title: 'お知らせ',
                text: `郵便番号は七桁入力してください。`,
            })
            return
        }

        //구글지오코딩파라미터 ../반환받을형태?우편주소?반환받을언어?검색할지역&키
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${initVal.post}&language=ja&components=country:JP&key=${keys.googleKey_geo}`, {
        headers: {
            "Content-Type": "application/json"
        }})
        .then((result) => {
            //상태가 200정상이고 검색결과가 있는경우
            if (result.status == 200 && result.data.status=="OK") {
                let addrArr=result.data.results[0].address_components //주소결과
                let latArr=result.data.results[0].geometry.location.lat //위도경로결과

                //첫번째 우편번호 마지막 국가명은 필요없다(i>0,-2)
                for (let i = addrArr.length-2; i > 0; i--) {   
                    //도도후현
                    if(i==addrArr.length-2){
                        document.querySelector(".city1").value=addrArr[i].long_name
                        continue
                    }

                    //주소
                    let city2=document.querySelector(".city2");
                    city2.value+=' '+addrArr[i].long_name
                }
                Swal.fire({
                    icon: 'success',
                    title: 'お知らせ',
                    text: `検索完了しました。`,
                })
                
            }else{
                Swal.fire({
                    icon: 'warning',
                    title: 'お知らせ',
                    text: `有効な郵便番号ではありません。`,
                })

                document.querySelector(".post").value=""
                document.querySelector(".city1").value=""
                document.querySelector(".city2").value=""
                document.querySelector(".city3").value=""

                return
            }
        })
        .catch((result) => {
            Swal.fire({
                icon: 'warning',
                title: 'お知らせ',
                text: result.response.data.message,
            })
        })
    }

    //이미지를 임시폴더에 업로드
    function imageUpload(e) {
        const formData = new FormData();//ajax등의 통신에서 form형태의 데이터전송이 가능하게함. append를 이용해서 key,value로 등록
        formData.append(
            "imageFile",
            e.target.files[0]
        );
        
        //axios api참고.. axios.post(url,{data},{config})..  formData는 예외적으로 axios.post(url,formData,{config})
        axios.post(`${props.state.rootUrl}/sell-data/imageUploadTemp`, 
             formData,
            { 
                headers: {"Content-Type": "multipart/form-data"},
                withCredentials: true 
            })
            .then((result) => {
                if (result.status == 200) {
                    let lastNum=e.target.name.slice(-1)
                    
                    //자바스크립트객체의 키값의 동적할당은 []를 사용한다
                    //파일명
                    setInitVal({
                        ...initVal,
                        ["fileNm"+lastNum]: result.data.fileNm,
                    });

                    //임시저장의 파일의 base64이미지
                    setTempImg({
                        ...tempImg,
                        ["fileTemp"+lastNum]: "data:image/jpeg;base64, "+result.data.fileBase64,
                    });
                
                    Swal.fire({
                        icon: 'success',
                        title: 'お知らせ',
                        text: result.data.message,
                    })
                }
            })
            .catch((result) => {
                Swal.fire({
                    icon: 'warning',
                    title: 'お知らせ',
                    text: result.response.data.message,
                })
            })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        //1.initVal을 ...을 이용한 스프레드구문으로 풀고 넣은 다음 2.name을 갱신함
        setInitVal({
            ...initVal,
            [name]: value,
        });
    };

    return (
        <Row className="sell justify-content-center">
            <Col md="7">
                <Tabs defaultActiveKey="regSell" id="uncontrolled-tab-example">
                    <Tab eventKey="regSell" title="登録">
                        <Form>
                            <Row className="sell1">
                                <Col md="6">
                                    {/* Form.Group 상하로 라벨과 입력컨트롤러를 넣어주고 마진을 자동으로 조절해줌 */}
                                    <Form.Group>
                                        <Form.Label>建物種別</Form.Label>
                                        <Form.Control as="select" custom name="houseType1" onChange={handleInputChange}>
                                            {codeR.map((e, i) => {
                                                return (e)
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group>
                                        <Form.Label>間取りタイプ</Form.Label>
                                        <Form.Control as="select" name="houseType2" onChange={handleInputChange}>
                                            {codeM.map((e, i) => {
                                                return (e)
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="sell2">
                                <Col md="7">
                                    <Form.Group>
                                        <Form.Label>郵便番号</Form.Label>
                                        <InputGroup>
                                            <FormControl type="number" className="post" placeholder="1050011" name="post" onChange={handleInputChange}/>
                                            <InputGroup.Append>
                                                <Button variant="secondary" onClick={searchPost} ref={btnSearchPost}>検索</Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group>
                                        <Form.Label>都道府県</Form.Label>
                                        <Form.Control type="text" className="city1" name="city1" onChange={handleInputChange} placeholder="東京都" readOnly/>
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group>
                                        <Form.Label>市区町村・番地</Form.Label>
                                        <Form.Control type="text" className="city2" name="city2" onChange={handleInputChange} placeholder="港区芝公園４丁目２−8" />
                                    </Form.Group>
                                </Col>
                                <Col md="12">
                                    <Form.Group>
                                        <Form.Label>建物名・部屋番号</Form.Label>
                                        <Form.Control type="text" className="city3" name="city3" onChange={handleInputChange} placeholder="東京タワー" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="sell3">
                                <Col md="8">
                                    <Form.Group>
                                        <Form.Label>タイトル</Form.Label>
                                        <Form.Control type="text" placeholder="タイトルを入力してください。" name="title" onChange={handleInputChange} />
                                    </Form.Group>
                                </Col>
                                <Col md="8">
                                    <Form.Group>
                                        <Form.Label>コンテンツ</Form.Label>
                                        <Form.Control as="textarea" rows={3} name="content" onChange={handleInputChange}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="sell4" >
                                <Col md="6" >
                                    <Form.Group>
                                        <Form.Label>メインイメージ</Form.Label>
                                        <Form.File
                                            id="custom-file"
                                            label="メイン写真を選択してください"
                                            data-browse="選択"
                                            custom
                                            name="fileNm1"
                                            onChange={imageUpload}
                                            accept="image/*"
                                        />
                                    </Form.Group>
                                    <div className="text-center">
                                        <Image src={tempImg.fileTemp1} xs={12} md={6} thumbnail />
                                    </div>
                                </Col>
                                <Col md="6">
                                    <Form.Group>
                                        <Form.Label>イメージ</Form.Label>
                                        <Form.File
                                            id="custom-file"
                                            label="メイン写真を選択してください"
                                            data-browse="選択"
                                            custom
                                            name="fileNm2"
                                            onChange={imageUpload}
                                            accept="image/*"
                                        />
                                    </Form.Group>
                                    <div className="text-center">
                                        <Image src={tempImg.fileTemp2} xs={12} md={6} thumbnail />
                                    </div>
                                </Col>
                            </Row>
                            <Button variant="secondary" style={{ margin: "20px 0" }} type="submit" size="lg" block>登録</Button>
                        </Form>
                    </Tab>
                    <Tab eventKey="listTab" title="登録した部屋">
                        <h4>お知らせ</h4>
                        <Row>
                            <Col>
                                <ul className="sellNotice">
                                    <li>●　会員は1人一個</li>
                                    <li>●　広告中：</li>
                                    <li>●　完了：</li>
                                    <li>●　違反：</li>
                                </ul>
                            </Col>
                        </Row>
                        <h4>登録したお部屋</h4>
                        <Row className="sellRoom">
                            <Col md="2" className="sellRoom-title">
                                <Row>11</Row>
                                <Row style={{ color: "dodgerblue" }}>1111111111</Row>
                            </Col>
                            <Col md="4" className="sellRoom-content">
                                <Row>
                                    <Col xs="6" style={{ lineHeight: "180px" }}>
                                        <Image src="./cardImg.svg" width="160px" xs={12} thumbnail />
                                    </Col>
                                    <Col xs="6">
                                        <Row>
                                            <b>333333</b>
                                        </Row>
                                        <Row>
                                            33333333333
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="2" style={{ lineHeight: "180px" }} className="sellRoom-detail">
                                33333333333333333333333333
                            </Col>
                            <Col md="4" className="sellRoom-status">
                                <Row>
                                    44444444444444
                                </Row>
                                <Row className="btn-center">
                                    <ButtonGroup>
                                        <Button variant="secondary">修正</Button>
                                        <Button variant="secondary">削除</Button>
                                        <Button variant="secondary">広告終了</Button>
                                        <Button variant="secondary">完了</Button>
                                    </ButtonGroup>
                                </Row>
                            </Col>
                        </Row>
                    </Tab>
                </Tabs>
            </Col>
        </Row>
    );
}

// 리덕스에서 설정한 값을 세팅해주는 함수 (redux->state->props)
function reduxStateToProps(state) {
    //index.js에서 설정한 store(state)통채로 가져와서 Nav(props)함수의 props로 던짐 
    return {
        state: state.reducer
    }
}

export default connect(reduxStateToProps)(Sell);
