/*eslint-disable*/
import react, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap'; // npm install react-bootstrap bootstrap

function LoginForm() {
    return (
        <Row className="loginForm justify-content-md-center">
            <Col md="4">
                <div className="div-outline">
                    <Form action="">

                        <h3>ログイン</h3>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="メールアドバイスを入力してください。" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="パスワードを入力してください。" />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-dark btn-lg btn-block">ログイン</button>
                        <p className="forgot-password text-right">
                            Forgot <a href="#">password?</a>
                        </p>
                    </Form>
                </div>
            </Col>
        </Row>
    );
}

export default LoginForm