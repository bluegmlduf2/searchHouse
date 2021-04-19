/*eslint-disable*/
import react, { useState } from 'react';
import { Row, Col } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import { Route, Link } from 'react-router-dom' /* 라우터 초기 설정 */

function Footer() {
    return (
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
    )
}
export default Footer;