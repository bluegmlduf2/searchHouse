/*eslint-disable*/
import react, { useState } from 'react';
import { Container, Row,Col, Card, CardDeck , Button, Form } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import './css/App.css';
import './css/_reset.css';
import './css/content.css';
import './css/bootstrap.min.css'
import { Route, Link, Switch } from 'react-router-dom' /* 라우터 초기 설정 */

function App() {
  let [roomInfo, roomUpd] = useState([1, 4, 5, 6])

  return (
    <Container fluid className="App">
      <Row className="navi p-2 text-center">
        <Col md="3" className="div-logo">
          <img src="./logo2.png" width="45px" />
          <h3 className={"h3-logo"}> BANG</h3>
        </Col>
        <Col md="2">
          <Link to="/map" className="btn">マップ</Link>
        </Col>
        <Col md="2">
          <Link to="/like" className="btn">お気に入り</Link>
        </Col>
        <Col md="2">
          <Link to="/sale" className="btn">売る</Link>
        </Col>
        <Col md="3" className="">
          <Link to="/login" className="btn btn-outline" size="lg">新規登録</Link>
          <Link to="/signup" className="btn btn-outline ml-3" size="lg">ログイン</Link>
        </Col>
      </Row>

      <Row className="serach justify-content-md-center align-items-center">
        <Col md="8"className="div-centerPad" >
          <Form className="form-search">
            <Form.Row>
              <Form.Group as={Col} controlId="idSearchRoom">
                <Form.Label className="label-white"><h2>どんな部屋をお探しですか？</h2></Form.Label>
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
            <span className={"label-showMore"}>もっと見る&gt;</span>
          </h2>
        </Col>
        <Col md="8">
          <CardDeck>
            {roomInfo.map((e, i) => {
              return (
                <Col md="3" className="mb-4">
                  <Link to="#">
                  <Card>
                    <Card.Img variant="top" src="./cardImg.svg" width="286px" height="220px"/>
                    <Card.Body>
                      <span>
                      2LDK～4LDK 
                      </span>
                      <Card.Title><h4><b>6066万円～8983万円</b></h4></Card.Title>
                      <Card.Text>
                      ■中心部に位置しながら歴史と緑が色濃く残る、平尾山荘・浄水エリア。 <br/>
                      ■多くの自然に包まれ、ゆったりと時間が流れる閑静な住宅街。<br/>
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

      <Row className="footer justify-content-md-center">
        <Col md="8" className="btn-footer">
            <Link to="/company" className="btn btn-secondary">会社概要</Link>
            <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
            <Link to="/info" className="btn btn-secondary">個人情報管理</Link>
        </Col>
        <Col md="8" className="txt-footer">
          <Row>
            <Col md="8">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Col>
            <Col md="4">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate</Col>
          </Row>
        </Col>
      </Row>

    </Container>
  );

  function LoginForm(){
    return (
      <form>
        <h3>Log in</h3>

        <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" placeholder="Enter email" />
        </div>

        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" />
        </div>

        <div className="form-group">
            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
            </div>
        </div>

        <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
        <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
        </p>
    </form>
    );
  }
}

export default App;
