/*eslint-disable*/
import react, { useState } from 'react';
import {Row,Col} from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import { Route, Link, Switch ,useLocation} from 'react-router-dom' /* 라우터 초기 설정 */

function Nav(){
    const navFont=(useLocation().pathname.length>1 ? 'a-fontBlack' : null)

    return(
        <Row className={"navi p-2 text-center "+navFont}>
            <Col md="3" className="div-logo">
                <img src="./logo2.png" width="45px" />
                <h3 className={"h3-logo"}> BANG</h3>
            </Col>
            <Col md="2">
                <Link to="/map" className={"btn "+navFont}>マップ</Link>
            </Col>
            <Col md="2">
                <Link to="/like" className={"btn "+navFont}>お気に入り</Link>
            </Col>
            <Col md="2">
                <Link to="/sale" className={"btn "+navFont}>売る</Link>
            </Col>
            <Col md="3" className="">
                <Link to="/signup" className={"btn btn-outline "+navFont} size="lg">新規登録</Link>
                <Link to="/signin" className={"btn btn-outline ml-3 "+navFont } size="lg">ログイン</Link>
            </Col>
        </Row>
    )
}

export default Nav;