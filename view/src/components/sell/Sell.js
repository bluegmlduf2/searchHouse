/*eslint-disable*/
import react, { useState } from 'react';//export Default된 항목은 {}없이 받음
import { Row, Col, InputGroup, FormControl, Button, Form, Pagination, Image, Tabs, Tab ,ButtonGroup} from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import { Link } from 'react-router-dom' /* 라우터 초기 설정 */
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';
import GoogleMapReact from 'google-map-react';
import { keys } from '../../key.js'


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
                                        <Form.Control as="select" custom>
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
                                        <Form.Control as="select">
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
                                            <FormControl placeholder="1050011" />
                                            <InputGroup.Append>
                                                <Button variant="secondary">検索</Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group>
                                        <Form.Label>都道府県</Form.Label>
                                        <Form.Control type="text" placeholder="東京都" />
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group>
                                        <Form.Label>住所</Form.Label>
                                        <Form.Control type="text" placeholder="港区芝公園４丁目２−8" />
                                    </Form.Group>
                                </Col>
                                <Col md="12">
                                    <Form.Group>
                                        <Form.Label>建物名</Form.Label>
                                        <Form.Control type="text" placeholder="東京タワー" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="sell3">
                                <Col md="8">
                                    <Form.Group>
                                        <Form.Label>タイトル</Form.Label>
                                        <Form.Control type="text" placeholder="東京都" />
                                    </Form.Group>
                                </Col>
                                <Col md="8">
                                    <Form.Group>
                                        <Form.Label>コンテンツ</Form.Label>
                                        <Form.Control as="textarea" rows={3} />
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

export default Main;