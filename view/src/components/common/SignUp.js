/*eslint-disable*/
import react, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap'; // npm install react-bootstrap bootstrap

function LoginForm() {
    return (
        <Row className="loginForm justify-content-md-center">
            <Col md="4">
                <div className="div-outline">
                    <Form action="">
                        <h3>登録</h3>

                        <div className="form-group">
                            <label>ID</label>
                            <input type="text" className="form-control" placeholder="IDを入力してください。" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="パスワードを入力してください。" />
                        </div>

                        <div className="form-group">
                            <label>Confirm your Password</label>
                            <input type="password" className="form-control" placeholder="パスワードをもう一度入力してください。" />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="メールアドバイスを入力してください。" />
                        </div>

                        <button type="submit" className="btn btn-dark btn-lg btn-block">登録</button>
                        <p className="forgot-password text-right">
                            Already registered <a href="#">log in?</a>
                        </p>
                    </Form>
                </div>
            </Col>
        </Row>
    );
}

export default LoginForm