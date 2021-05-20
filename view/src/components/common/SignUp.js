/*eslint-disable*/
import react, { useState ,useEffect} from 'react';
import { Row, Col, Form } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import axios from 'axios'
import {lpad} from '../lib/lib.js'

function LoginForm() {
    let [timer,timerUpd]=useState(false)
    let [sec,secUpd]=useState("")
    
    function sendMail(params) {
        //withCredentials:true =자격(인증정보)을 허락한다. 즉 쿠키,세션등과같은 값을 허락한다(쿠기,세션필수) ,fetch()사용시 credentials:'include'를 사용
        //기본적으로 비동기는 쿠키,세션정보를 담지않기때문에 세션쿠키사용시 아래와 같이 설정필요
    
        axios.post('http://34.82.122.40:5000/signup-data/sendMail', { email : 'test'},{withCredentials: true })
        .then((result)=>{  
            if(result.status==200){
                let time=180
                //세션 유지 시간에 따른 인증시간 제어
                timerUpd(true)
                
                const timerFunc=setInterval(() => {
                    let minuite=parseInt(time/60) //몫을 반환
                    let second=lpad(time%60,"0",2) //60으로 나눈 후 나머지를 반환
                    time--

                    //0초미만일시 정지
                    if (time <0){
                        timerUpd(false)
                        clearInterval(timerFunc)
                    }

                    secUpd(`認証コード有効時間： ${minuite}:${second}`)
                }, 1000);
            }
        })
        .catch(()=>{ })
    }

    
    function register(e) {
        e.preventDefault()
    
        const option={
            url: 'http://34.82.122.40:5000/signup-data/register',
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
                        <p className="p-sessionChk text-center">
                            <h4>
                                {timer===true?sec:null}
                            </h4>
                        </p>
                    </Form>
                </div>
            </Col>
        </Row>
    );
}



export default LoginForm
