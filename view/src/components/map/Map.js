/*eslint-disable*/
import react, { useState } from 'react';
import { Row, Col, Card, CardDeck, Form } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import { Link } from 'react-router-dom' /* 라우터 초기 설정 */
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

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
    return (
        <div>
            <Row className="map justify-content-md-center">
                <Col md="12">
                    <Row className="filter">
                        {/* <Row > */}
                            {/* 고정된 열을 표시위해 xs 사용 */}
                            <Col md="3">
                                <div className="form-group custom-control">
                                    <input type="text" className="form-control" placeholder="キーワードから検索（地名,駅名,物件名など）" />
                                </div>
                            </Col>
                            <Col md="9">
                                <Row>
                                    <Col md="2">
                                        <select class="form-control">
                                            <option>建物種別</option>
                                            <option>マンション</option>
                                            <option>アパート</option>
                                            <option>一戸建て</option>
                                            <option>その他</option>
                                        </select>
                                    </Col>
                                    <Col md="2">
                                        <DropdownMultiselect placeholder="間取りタイプ"
                                            options={optionsArray} name="countries" />
                                    </Col>

                                    <Col md="1" className="align-self-center" style={{ textAlign: 'center'}}>
                                        <label  for="customRange1" class="form-label">賃料</label>
                                    </Col>
                                    <Col md="2" className="align-self-center">
                                        <input style={{ width: '100%' }} type="range" class="form-range" id="customRange1"></input>
                                    </Col>

                                </Row>
                            </Col>
                        {/* </Row> */}
                    </Row>
                    <Row className="mapCont">
                        {/* <Row> */}
                            <Col xs="3">1111111111</Col>
                            <Col xs="9">22222222</Col>
                        {/* </Row> */}
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Main;