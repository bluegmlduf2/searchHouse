/*eslint-disable*/
import react, { useState } from 'react';
import { Container, Row, Card, CardDeck, Col, Button, Form } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import './css/App.css';
import './css/_reset.css';
import './css/content.css';
import './css/bootstrap.min.css'

function App() {
  let [roomInfo, roomUpd] = useState([1, 4, 5, 6])

  return (
    <Container fluid className="App">
      <Row className="nav p-2 text-center">
        <Col md={3}>
          <img src="./logo2.png" width="45px" />
          <h3 className={"h3-logo"}> BANG</h3>
        </Col>
        <Col md={{ span: "2" }}>
          <Button variant="/home" size="lg">マップ</Button>
        </Col>
        <Col md={{ span: "2" }}>
          <Button variant="/home" size="lg">お気に入り</Button>
        </Col>
        <Col md={{ span: "2" }}>
          <Button variant="/home" size="lg">売る</Button>
        </Col>
        <Col md={3} className="">
          <Button variant="" className="btn-outline" size="lg">新規登録</Button>
          <Button variant="/home" className="btn-outline ml-3" size="lg">ログイン</Button>
        </Col>
      </Row>

      <Row className="serach justify-content-md-center align-items-center">
        <Col md="8"className="div-centerPad" >
          <Form className="form-search">
            <Form.Row>
              <Form.Group as={Col} controlId="idSearchRoom">
                <Form.Label className="label-white xl"><h2>どんな部屋をお探しですか？</h2></Form.Label>
                <Form.Control type="text" className="h-100" placeholder="探す場所を入力して下さい。" />
              </Form.Group>
            </Form.Row>
          </Form>
        </Col>
      </Row>

      <Row className="roomList justify-content-md-center">
        <Col md="8" className={"label-title"}>
          <h2><span className={"label-bold"}>おすすめ</span><span>の部屋</span></h2>
        </Col>
        <Col md="8">
          <CardDeck>
            {roomInfo.map((e, i) => {
              return (
                <Col md="3" className="">
                  <Card>
                    <Card.Img variant="top" src="./cardImg.svg" />
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })}
          </CardDeck>
        </Col>
      </Row>

      <Row>
        <Col>
          <footer>

          </footer>
        </Col>
      </Row>

    </Container>
  );
}

export default App;
