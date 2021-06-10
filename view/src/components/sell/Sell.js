/*eslint-disable*/
import react, { useState, useRef } from 'react';//export Default된 항목은 {}없이 받음
import { Row, Col, InputGroup, FormControl, Button, Form, Pagination, Image, Tabs, Tab, ButtonGroup } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import { Link } from 'react-router-dom' /* 라우터 초기 설정 */
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';
import GoogleMapReact from 'google-map-react';
import { keys } from '../../key.js'
import axios from 'axios'
import { connect } from 'react-redux';
import Swal from 'sweetalert2'


function Sell() {
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
        file1: "",
        file2: ""
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
            
            if (result.status == 200) {
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
                                            <option>マンション</option>
                                            <option>アパート</option>
                                            <option>一戸建て</option>
                                            <option>その他</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group>
                                        <Form.Label>間取りタイプ</Form.Label>
                                        <Form.Control as="select" name="houseType2" onChange={handleInputChange}>
                                            <option>ワンルーム</option>
                                            <option>1K</option>
                                            <option>1DK</option>
                                            <option>1LDK</option>
                                            <option>2K</option>
                                            <option>2DK</option>
                                            <option>2LDK</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="sell2">
                                <Col md="7">
                                    <Form.Group>
                                        <Form.Label>郵便番号</Form.Label>
                                        <InputGroup>
                                            <FormControl type="number" placeholder="1050011" name="post" onChange={handleInputChange}/>
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
                                        <Form.Control type="text" name="city3" onChange={handleInputChange} placeholder="東京タワー" />
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
                                            name="file1"
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <div className="text-center">
                                        <Image src="./cardImg.svg" xs={12} md={6} thumbnail />
                                    </div>
                                </Col>
                                <Col md="6">
                                    <Form.Group>
                                        <Form.Label>イメージ</Form.Label>
                                        <Form.File
                                            id="custom-file"
                                            label="メイン写真を選択してください"
                                            data-browse="選択"
                                            name="file2"
                                            onChange={handleInputChange}
                                            custom
                                        />
                                    </Form.Group>
                                    <div className="text-center">
                                        <Image src="./cardImg.svg" xs={12} md={6} thumbnail />
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
