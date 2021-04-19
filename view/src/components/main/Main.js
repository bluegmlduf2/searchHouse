/*eslint-disable*/
import react, { useState } from 'react';
import { Row, Col, Card, CardDeck, Form } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import { Link } from 'react-router-dom' /* 라우터 초기 설정 */

function Main() {
    let [roomInfo, roomUpd] = useState([1, 4, 5, 6])
    
    return (
        <div>
            <Row className="serach justify-content-md-center align-items-center">
                <Col md="8" className="div-centerPad" >
                    <Form className="form-search">
                        <Form.Row>
                            <Form.Group as={Col} controlId="idSearchRoom">
                                <Form.Label className="label-white"><span>どんな部屋をお探しですか？</span></Form.Label>
                                <Form.Control type="text" placeholder="探す場所を入力して下さい。" />
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
                                            <Card.Img variant="top" src="./cardImg.svg" width="286px" height="220px" />
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

export default Main;