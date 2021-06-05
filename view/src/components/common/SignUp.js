/*eslint-disable*/
import react, { useState, useEffect, useRef } from 'react';
import { Row, Col, Form } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import axios from 'axios'
import { lpad, SHA256 } from '../lib/lib.js'
import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
import { connect } from 'react-redux';

function RegForm(props) {
    const inputId = useRef(false)
    const inputPass = useRef(false)
    const inputPassCheck = useRef(false)
    const inputEmail = useRef(false)
    const inputAuth = useRef(false)
    let [timer, timerUpd] = useState(false)
    let [sec, secUpd] = useState("")
    let args = null
    let timerFunc=null
    // const MySwal = withReactContent(Swal)//sweetAlert객체생성

    /**
     * 인증코드 전송버튼
     */
    const sendMail = (params) => {
        //유효성체크
        if (!validationCheck()) return
        
        //타이머체크
        if (timer === true) {
            Swal.fire({
                icon: 'warning',
                title: 'お知らせ',
                text: '認証が進行中です。',
            })
            return
        }

        //withCredentials:true =자격(인증정보)을 허락한다. 즉 쿠키,세션등과같은 값을 허락한다(쿠기,세션필수) ,fetch()사용시 credentials:'include'를 사용
        //기본적으로 비동기는 쿠키,세션정보를 담지않기때문에 세션쿠키사용시 아래와 같이 설정필요
        axios.post(`${props.state.rootUrl}/signup-data/sendMail`, {
            data: args, headers: {
                "Content-Type": "application/json"
            }
        }, { withCredentials: true })
            .then((result) => {
                if (result.status == 200) {
                    let time = 180
                    //세션 유지 시간에 따른 인증시간 제어
                    timerUpd(true)
                    inputEmail.current.readOnly=true
                    
                    Swal.fire({
                        icon: 'info',
                        title: 'お知らせ',
                        text: result.data.message,
                    })

                    timerFunc = setInterval(() => {
                        let minuite = parseInt(time / 60) //몫을 반환
                        let second = lpad(time % 60, "0", 2) //60으로 나눈 후 나머지를 반환
                        time--

                        //0초미만일시 정지
                        if (time < 0) {
                            inputEmail.current.readOnly=false
                            timerUpd(false)
                            clearInterval(timerFunc)
                        }

                        secUpd(`認証コード有効時間： ${minuite}:${second}`)
                    }, 1000);
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

    /**
     * 등록버튼
     */
    const register = () => {
        //유효성체크
        if (!validationCheck()) return

        if(!timer){
            Swal.fire({
                icon: 'warning',
                title: 'お知らせ',
                text: "認証コードを転送してください。",
            })
            return
        }
        if(!inputAuth.current.value){
            Swal.fire({
                icon: 'warning',
                title: 'お知らせ',
                text: "認証コードを入力してください。",
            })
            inputAuth.current.focus()
            return
        }

        args["auth"]=inputAuth.current.value
        axios.put(`${props.state.rootUrl}/signup-data/register`, {
            data: args, headers: {
                "Content-Type": "application/json"
            }
        }, { withCredentials: true })
            .then((result) => {
                //인증코드 유효기간 메시지 초기화
                if(result.status=="200"){
                    timerUpd(false)
                    clearInterval(timerFunc)
                    inputAuth.current.value=""
                    inputEmail.current.readOnly=false
                    
                    Swal.fire({
                        icon: 'info',
                        title: 'お知らせ',
                        text: result.data.message,
                    }).then((result)=>{
                        if(result.isConfirmed){
                            location.href="/signin"//로그인페이지이동
                        }
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

    /**
     * 입력값의 유효성 체크
     */
    const validationCheck = () => {
        let flag = true
        args = {
            "id": inputId.current.value,
            "pass": inputPass.current.value,
            "passCheck": inputPassCheck.current.value,
            "email": inputEmail.current.value
        };
        const lableNm = ["ID", "パスワード", "パスワード確認", "メールアドレス"]
        const nullList = []
        const regExpPass = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; //  8 ~ 10자 영문, 숫자 조합
        const regExpMail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;//이메일 형식의 정규식

        Object.values(args).forEach((value, index) => {
            if (!value) {
                nullList.push(lableNm[index])
                return
            }
        });

        //널체크
        if (nullList.length > 0) {
            Swal.fire({
                icon: 'warning',
                title: 'お知らせ',
                text: `[ ${nullList.join(" , ")} ] を入力してください。`,
            })
            flag = false
            return
        }

        //비밀번호동일여부
        if (args["pass"] != args["passCheck"]) {
            Swal.fire({
                icon: 'warning',
                title: 'お知らせ',
                text: "パスワードが一致しません。ご確認お願い致します",
            })
            flag = false
            return
        }

        //비밀번호정규식
        if (!regExpPass.test(args["pass"])) {
            Swal.fire({
                icon: 'warning',
                title: 'お知らせ',
                text: "パスワードは英語と数字を含めて8桁以上入力お願い致します。",
            })
            flag = false
            return
        }

        //메일정규식
        if (!regExpMail.test(args["email"])) {
            Swal.fire({
                icon: 'warning',
                title: 'お知らせ',
                text: "メールアドレスの形式を確認してください。",
            })
            flag = false
            return
        }

        //비밀번호 해시암호화
        args["pass"] = SHA256(args["pass"])
        args["passCheck"] = SHA256(args["passCheck"])

        return flag
    }

    return (
        <Row className="regForm justify-content-md-center">
            <Col md="4">
                <div className="div-outline">
                    <Form>
                        <h3>登録</h3>

                        <div className="form-group">
                            <label>ID</label>
                            <input type="text" className="form-control" ref={inputId} placeholder="IDを入力してください。"/>
                        </div>

                        <div className="form-group">
                            <label>パスワード</label>
                            <input type="password" className="form-control" ref={inputPass} placeholder="英語を含めた8桁~12桁を入力してください。"/>
                        </div>

                        <div className="form-group">
                            <label>パスワードの確認</label>
                            <input type="password" className="form-control" ref={inputPassCheck} placeholder="パスワードをもう一度入力してください。"/>
                        </div>

                        <div className="form-group">
                            <label>メールアドレス</label>
                            <div className="input-group mb-3">
                                <input type="email" ref={inputEmail} className="form-control" placeholder="メールアドバイスを入力してください。"/>
                                <button className="btn btn-outline-secondary" type="button" onClick={sendMail} id="button-addon2">認証コード転送</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>認証コード</label>
                            <input type="text" ref={inputAuth} className="form-control" placeholder="メールに転送された認証コードを入力してください。" />
                        </div>

                        <button className="btn btn-dark btn-lg btn-block" type="button" onClick={register}>登録</button>
                        <div className="p-sessionChk text-center">
                            <h4>
                                {timer === true ? sec : null}
                            </h4>
                        </div>
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

export default connect(reduxStateToProps)(RegForm);
