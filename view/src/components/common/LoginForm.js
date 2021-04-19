/*eslint-disable*/
import react, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap'; // npm install react-bootstrap bootstrap

function LoginForm() {
    return (
        <Row className="justify-content-md-center">
            <Col md="4">
                <Form action="">
                    <Col><h3>ログイン</h3></Col>
                    <Col>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Col>
                </Form>
            </Col>
        </Row>
    );
}

export default LoginForm