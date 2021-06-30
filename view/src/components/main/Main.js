/*eslint-disable*/
import react, { useState,useEffect } from 'react';
import { Row, Col, Card, CardDeck, Form } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import { Link } from 'react-router-dom' /* 라우터 초기 설정 */
import axios from 'axios'
import Swal from 'sweetalert2'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


function Main(props) {
    let [roomInfo, roomUpd] = useState([])
    
    //메인에표시할방정보가져오기
    useEffect(() => {
        axios.post(`${props.state.rootUrl}/main-data/getRooms`,{}, {
            headers: {
                "Content-Type": "application/json"
            },withCredentials: true
        })
        .then((result) => {
            if (result.status == 200) {
                roomUpd(result.data)
            }
        }).catch((result) => {
            console.log(result.response.data.message)
        })
    },[])
    
    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
      ];

    const value = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
    ];


    return (
        <div>
            <Row className="serach justify-content-md-center align-items-center">
                <Col md="8" className="div-centerPad" >
                    <Form className="form-search">
                        <Form.Row>
                            <Form.Group as={Col} controlId="idSearchRoom">
                                <Form.Label className="label-white"><span>どんな部屋をお探しですか？</span></Form.Label>
                                {/* <Form.Control type="text" placeholder="探す場所を入力して下さい。" /> */}
                                <Autocomplete
                                    id="comboAutoMain"
                                    // value={value}
                                    options={top100Films}
                                    getOptionLabel={(option) => option.title}
                                    renderInput={(params) => <TextField {...params}  variant="outlined" />}
                                    freeSolo
                                    onChange={(event, newInputValue) => {
                                        console.log(newInputValue)
                                    }}
                                    />
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Col>
            </Row>

            <Row className="roomList justify-content-md-center">
                <Col md="8" className={"label-title"}>
                    <h2>
                        <span className={"label-bold"}>おすすめ</span><span>の部屋</span>
                        <Link to="#"><span className={"label-showMore"}>もっと見る&gt;</span></Link>
                    </h2>
                </Col>
                <Col md="8">
                    <CardDeck>
                        {roomInfo.map((e, i) => {
                            return (
                                <Col md="3" className="mb-4">
                                    <Link to="#">
                                        <Card>
                                            <Card.Img variant="top" src={e['fileNm1']} width="286px" height="220px" style={{borderRadius: '9px'}}/>
                                            <Card.Body>
                                                <span>{e['houseType1']} / {e['houseType2']}</span>
                                                <Card.Title><h4><b>{e['title']}</b></h4></Card.Title>
                                                <Card.Text>{e['content']}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                            )
                        })}
                    </CardDeck>
                </Col>
            </Row>
        </div>
    );
}


// 리덕스에서 설정한 값을 세팅해주는 함수 (redux->state->props)
function reduxStateToProps(state) {
    //index.js에서 설정한 store(state)통채로 가져와서 Nav(props)함수의 props로 던짐 
    return {
        state: state.reducer
    }
}


export default connect(reduxStateToProps)(Main);