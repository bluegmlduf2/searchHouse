/*eslint-disable*/
import react, { useState } from 'react';
import { Row, Col, Card, CardDeck, Form } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import { Link } from 'react-router-dom' /* 라우터 초기 설정 */

function Main() {
    let [roomInfo, roomUpd] = useState([1, 4, 5, 6])

    return (
        <div>
            <Row className="map justify-content-md-center">
                <Col md="12">
                    <Col className="filter">
                        <Row >
                            {/* 고정된 열을 표시위해 xs 사용 */}
                            <Col xs="3">11111</Col>
                            <Col xs="9">222222</Col>
                        </Row>
                    </Col>
                    <Col className="mapCont">
                        <Row>
                            <Col xs="3">11111</Col>
                            <Col xs="9">222222</Col>
                        </Row>
                    </Col>
                </Col>
            </Row>
        </div>
    );
}

export default Main;