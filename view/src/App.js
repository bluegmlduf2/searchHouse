/*eslint-disable*/
import react, { useState } from 'react';
import { Container, Row, Nav, Col, Button } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import './css/App.css';
import './css/_reset.css';
import './css/content.css';
import './css/bootstrap.min.css'

function App() {
  return (
    <Container fluid className="App">
      <Row className="nav p-2 text-center btn">
        <Col className="logo text-left" md={1}>
          <img src="./logo2.png" width="45px" />
        </Col>
        <Col md={{ span: "2" }} className="">
          <Button variant="/home" size="lg">지도</Button>
        </Col>
        <Col md={{ span: "2" }}>
          <Button variant="/home" size="lg">관심목록</Button>
        </Col>
        <Col md={{ span: "2" }}>
          <Button variant="/home" size="lg">방내놓기</Button>
        </Col>
        <Col md={{ span: "2" }}>
          <Button variant="" className="btn_outline" size="lg">회원가입</Button>
          <Button variant="/home" className="btn_outline ml-3" size="lg">로그인</Button>
        </Col>
      </Row>

      <Row className="serach">

      </Row>


      <div className="roomList">

      </div>
      <div className="apartList">

      </div>
      <div className="guide">

      </div>
      <div className="news">

      </div>
      <footer>

      </footer>
    </Container>
  );
}

export default App;
