/*eslint-disable*/
import react, { useState ,useEffect} from 'react';
import {Row,Col} from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import { Route, Link, Switch ,useLocation} from 'react-router-dom' /* 라우터 초기 설정 */
import { connect } from 'react-redux';
import axios from 'axios'
import Swal from 'sweetalert2'


function Nav(props){
    const navFont=(useLocation().pathname.length>1 ? 'a-fontBlack ' : null)
    const navLine=(useLocation().pathname.length>1 ? 'div-bottomLine ' : null)
    const [tokenChk, setTokenChk] = useState(false);

    //로그아웃기능
    function logout() {
        props.dispatch({ type: 'removeId' })//리덕스의 아이디삭제
        localStorage.removeItem('token') //로컬스토리지의 토큰삭제
    }

    //로그인 토큰 체크
    useEffect(() => {
        //withCredentials:true =자격(인증정보)을 허락한다. 즉 쿠키,세션등과같은 값을 허락한다(쿠기,세션필수) ,fetch()사용시 credentials:'include'를 사용
        //기본적으로 비동기는 쿠키,세션정보를 담지않기때문에 세션쿠키사용시 아래와 같이 설정필요
        let token=localStorage.getItem('token')
        
        //로그인토큰체크  : axios.post(url,data,option)경우 option에 헤더만 보내줄 경우에도 data를 {}공백으로 보내줘야함 
        if(token){
            axios.post(`${props.state.rootUrl}/signin-data/checkToken`,{}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }, { withCredentials: true })
            .then((result) => {
                if (result.status == 200 && result.data) {
                    //로그인토큰 리덕스에 할당
                    props.dispatch({ type: 'addId', idLoad: result.data})
                    setTokenChk(true)
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
    })

    return(
        <Row className={"navi text-center "+navFont+navLine}>
            <Col md="2" className="div-logo">
                <Link to="/">
                    <img src="./logo2.png" width="45px" />
                    <h3 className={"h3-logo"}> BANG</h3>
                </Link>
            </Col>
            <Col md="2">
                <Link to="/map" className={"btn "+navFont}>マップ</Link>
            </Col>
            {props.state.id?
            <Col md="2">
                <Link to="/like" className={"btn "+navFont}>お気に入り</Link>
            </Col>
            :null}
            {props.state.id?
            <Col md="2">
                <Link to="/sell" className={"btn "+navFont}>売る</Link>
            </Col>
            :null}
            {props.state.id?
            <Col md="2"  style={{position: "relative"}}>
                <span className={"nav-name "+navFont}>{props.state.id} 様！ようこそ</span>
            </Col>
            :null}
            {/* span:박스크기(md넓이차지) , offset:간격넓이(md넓이차지/왼쪽기준으로차이) */}
            {!props.state.id?
            <Col md={{  span:4 ,offset: 4 }}>
                <Link to="/signup" className={"btn btn-outline "+navFont} size="lg">新規登録</Link>
                <Link to="/signin" className={"btn btn-outline ml-3 "+navFont } size="lg">ログイン</Link>
            </Col>
            :<Col md={{  span:2 }}>
                <Link to="#" onClick={logout} className={"btn btn-outline "+navFont} size="lg">ログアウト</Link>
            </Col>
            }
        </Row>
    )
}

// 리덕스에서 설정한 값을 세팅해주는 함수 (redux->state->props)
function reduxStateToProps(state) {
    //index.js에서 설정한 store(state)통채로 가져와서 Nav(props)함수의 props로 던짐 
    return {
        state: state.reducer
    }
}

export default connect(reduxStateToProps)(Nav);