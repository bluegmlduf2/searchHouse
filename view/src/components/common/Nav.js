/*eslint-disable*/
import react, { useState } from 'react';
import {Row,Col} from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import { Route, Link, Switch ,useLocation} from 'react-router-dom' /* 라우터 초기 설정 */
import { connect } from 'react-redux';

function Nav(props){
    const navFont=(useLocation().pathname.length>1 ? 'a-fontBlack ' : null)
    const navLine=(useLocation().pathname.length>1 ? 'div-bottomLine ' : null)

    function logout() {
        debugger 
        props.dispatch({ type: 'removeId' })
        debugger 
    }
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
            <Col md="2">
                <Link to="/like" className={"btn "+navFont}>お気に入り</Link>
            </Col>
            <Col md="2">
                <Link to="/sell" className={"btn "+navFont}>売る</Link>
            </Col>
            <Col md="4" className="">
                <Link to="/signup" className={"btn btn-outline "+navFont} size="lg">新規登録</Link>
                <Link to="/signin" className={"btn btn-outline ml-3 "+navFont } size="lg">ログイン</Link>
                <Link to="#" onClick={logout} className={"btn btn-outline3"+navFont} size="lg">ログアウト</Link>
            </Col>
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