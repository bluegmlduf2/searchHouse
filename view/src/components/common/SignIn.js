/*eslint-disable*/
import react, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import { SHA256 } from '../lib/lib.js'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

function LoginForm(props) {
    let history = useHistory();//페이지이동라우터 초기화
    const [initVal, setInitVal] = useState({
        email: "",
        pass: "",
        loginSave: ""
    });

    const regExpPass = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; //  8 ~ 10자 영문, 숫자 조합
    const regExpMail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;//이메일 형식의 정규식

    const login = () => {
        let nullList = [];

        //널체크
        ["メールアドレス", "パスワード"].forEach((value, index) => {
            if (!Object.values(initVal)[index]) {
                nullList.push(value)
            }
        });

        //널체크
        if (nullList.length > 0) {
            Swal.fire({
                icon: 'warning',
                title: 'お知らせ',
                text: `[ ${nullList.join(" , ")} ] を入力してください。`,
            })
            return
        }
        //메일정규식
        if (!regExpMail.test(initVal.email)) {
            Swal.fire({
                icon: 'warning',
                title: 'お知らせ',
                text: "メールアドレスの形式を確認してください。",
            })
            return
        }

        //비밀번호정규식
        if (!regExpPass.test(initVal.pass)) {
            Swal.fire({
                icon: 'warning',
                title: 'お知らせ',
                text: "パスワードは英語と数字を含めて8桁以上入力お願い致します。",
            })
            return
        }

        //암호화
        setInitVal(initVal.pass=SHA256(initVal.pass))

        //통신
        axios.post(`${props.state.rootUrl}/signin-data/login`, {
            data: initVal,
            headers: {
                "Content-Type": "application/json"
            }
            }, { withCredentials: true })
            .then((result) => {
                if (result.status == 200) {
                    //ID 리덕스에 추가
                    props.dispatch({ type: 'addId', idLoad: result.data['id'] })
                    
                    //토큰을 로컬스토리지에 저장
                    if (result.data['token']) {
                        localStorage.setItem('token', result.data['token'])
                    }
                    
                    //홈이동
                    history.push('/');
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'お知らせ',
                        text: result.data['id']+' 様ようこそ！',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch((result) => {
                Swal.fire({
                    icon: 'warning',
                    title: 'お知らせ',
                    text: result.response.data.message,
                })
            })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        //1.initVal을 ...을 이용한 스프레드구문으로 풀고 넣은 다음 2.name을 갱신함
        setInitVal({
            ...initVal,
            [name]: value,
        });
    };

    return (
        <Row className="loginForm justify-content-md-center">
            <Col md="4">
                <div className="div-outline">
                    <Form>
                        <h3>ログイン</h3>

                        <div className="form-group">
                            <label>メールアドレス</label>
                            <input type="email" name="email" onChange={handleInputChange} className="form-control" placeholder="メールアドバイスを入力してください。" />
                        </div>

                        <div className="form-group">
                            <label>パスワード</label>
                            <input type="password" name="pass" onChange={handleInputChange} className="form-control" placeholder="パスワードを入力してください。" />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" name="loginSave" onChange={handleInputChange} id="loginSave" />
                                <label className="custom-control-label" htmlFor="loginSave">ログイン情報を保持する (1日)</label>
                            </div>
                        </div>

                        <button type="button" onClick={login} className="btn btn-dark btn-lg btn-block">ログイン</button>
                    </Form>
                </div>
            </Col>
        </Row>
    );
}

// 리덕스에서 설정한 값을 세팅해주는 함수 (redux->state->props)
function reduxStateToProps(state) {
    //index.js에서 설정한 store(state)통채로 가져와서 Nav(props)함수의 props로 던짐 
    return {
        state: state.reducer
    }
}

export default connect(reduxStateToProps)(LoginForm);