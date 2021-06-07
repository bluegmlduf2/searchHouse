/*eslint-disable*/
import react, { useState } from 'react';//export Default된 항목은 {}없이 받음
import { Row, Col, InputGroup, FormControl, Card, Form, Pagination } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import { Link } from 'react-router-dom' /* 라우터 초기 설정 */
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';
import GoogleMapReact from 'google-map-react';
import { keys } from '../../key.js'
import axios from 'axios'
import { connect } from 'react-redux';
import Swal from 'sweetalert2'


function Main() {
    let [roomInfo, roomUpd] = useState([1, 4, 5, 6])
    const optionsArray = [
        { key: "2", label: "ワンルーム" },
        { key: "3", label: "1K" },
        { key: "4", label: "1DK" },
        { key: "5", label: "1LDK" },
        { key: "6", label: "2K" },
        { key: "7", label: "2DK" },
        { key: "8", label: "2LDK" },
    ];

    let [roomDetailInfo, roomDetailUpd] = useState([1, 2, 3, 4, 5, 6])


    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>
        );
    }

    let [locationInfo, locationUpd] = useState({
        center: { lat: 35.681167, lng: 139.767052 },
        zoom: 11
    })


    return (
        <div>
            <Row className="map">
                <Col md="12">
                    <Row className="filter">
                        {/* 고정된 열을 표시위해 xs 사용 */}
                        <Col md="3">
                            <Form.Group>
                                <Form.Control type="text" placeholder="キーワードから検索（地名,駅名,物件名など）" />
                            </Form.Group>
                        </Col>
                        <Col md="9">
                            <Row>
                                <Col md="2">
                                    <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Control as="select" custom>
                                            <option>建物種別</option>
                                            <option>マンション</option>
                                            <option>アパート</option>
                                            <option>一戸建て</option>
                                            <option>その他</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col md="2">
                                    <DropdownMultiselect placeholder="間取りタイプ" options={optionsArray} name="countries" />
                                </Col>

                                <Col md="3">
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="3" className="text-center">
                                            <h5>賃料</h5>
                                        </Form.Label>
                                        <Col sm="9">
                                            <RangeSlider val="50" min='10' max="101" step="1" tooltip="off" />
                                        </Col>
                                    </Form.Group>
                                </Col>

                                <Col md="4">
                                    <Form.Group as={Row} controlId="formPlaintextPassword">
                                        <Form.Label column sm="3" className="text-center" size="l">
                                            <h5>賃料上限</h5>
                                        </Form.Label>
                                        <Col sm="5">
                                            <InputGroup>
                                                <FormControl readOnly />
                                                <InputGroup.Append>
                                                    <InputGroup.Text>万円</InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mapCont">
                        <Col md="3">
                            {roomDetailInfo.map((e, i) => {
                                return (
                                    <Link to="#">
                                        <Card>
                                            <Row>
                                                <Col md="5">
                                                    <Card.Img variant="top" src="./cardImg.svg" width="100%" height="80%" />
                                                </Col>
                                                <Col md="7">
                                                    <Card.Body>
                                                        <span>
                                                            2LDK～4LDK
                                                    </span>
                                                        <Card.Title><h4><b>6066万円～8983万円</b></h4></Card.Title>
                                                        <Card.Text>
                                                            ■中心部に位置しながら歴史と緑が色濃く残る、平尾山荘・浄水エリア。 <br />
                                                        ■多くの自然に包まれ、ゆったりと時間が流れる閑静な住宅街。<br />
                                                        ■都心に近く、優雅な暮らしに彩りを添える豊富な利便施設が整っています。
                                                    </Card.Text>
                                                    </Card.Body>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Link>
                                )
                            })}
                            <Row className="pagenation">
                                <Col>
                                    <Pagination className=" justify-content-center">
                                        <Pagination.Prev />
                                        {items}
                                        <Pagination.Next />
                                    </Pagination>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="9">
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: keys.googleKey }}
                                defaultCenter={locationInfo.center}
                                defaultZoom={locationInfo.zoom}
                            >
                            </GoogleMapReact>
                        </Col>
                    </Row>
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