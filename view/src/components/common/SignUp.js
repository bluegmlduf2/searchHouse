/*eslint-disable*/
import react, { useState ,useEffect} from 'react';
import { Row, Col, Form } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import axios from 'axios'

function LoginForm() {

    return (
        <Row className="loginForm justify-content-md-center">
            <Col md="4">
                <div className="div-outline">
                    <Form onSubmit={register}>
                        <h3>登録</h3>

                        <div className="form-group">
                            <label>ID</label>
                            <input type="text" className="form-control" placeholder="IDを入力してください。" />
                        </div>

                        <div className="form-group">
                            <label>パスワード</label>
                            <input type="password" className="form-control" placeholder="パスワードを入力してください。" />
                        </div>

                        <div className="form-group">
                            <label>パスワードの確認</label>
                            <input type="password" className="form-control" placeholder="パスワードをもう一度入力してください。" />
                        </div>

                        <div className="form-group">
                            <label>メールアドレス</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="メールアドバイスを入力してください。"/>
                                <button className="btn btn-outline-secondary" type="button" onClick={sendMail}　id="button-addon2">認証コード転送</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>認証コード</label>
                            <input type="text" className="form-control" placeholder="メールに転送された認証コードを入力してください。" />
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


function sendMail(params) {
    //withCredentials:true =자격을 허락한다. 즉 쿠키,세션등과같은 값을 허락한다(쿠기,세션필수)
    axios.post('http://localhost:5000/signup-data/sendMail', { email : 'test'},{withCredentials: true })
    .then((result)=>{  
        debugger
    })
    .catch(()=>{ })
}

function register(e) {
    e.preventDefault()

    const option={
        url: 'http://localhost:5000/signup-data/register',
        method: 'PUT',
        data: {
            a: 10,
            b: 20
        },withCredentials: true 
    }
    
    axios(option)
    .then((result)=>{ })
    .catch(()=>{ })
}

export default LoginForm