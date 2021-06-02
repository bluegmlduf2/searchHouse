import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './css/common/_reset.css';
import './css/common/common.css';
import './css/lib/bootstrap.min.css'
import './css/main/main.css';
import './css/map/map.css';
import './css/sell/sell.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import './css/lib/react-bootstrap-range-slider.css';
import { Provider } from 'react-redux'// 리덕스 환경설정 
import { combineReducers, createStore } from 'redux'// 리덕스 환경설정 


//로그인세션을 리덕스로 관리함
let initState = {"id":null}

//리덕스의 값 수정 방법을 정의 (해당 함수는 state를 반환해야함)
function reducer(state = initState, action) {
  if (action.type === "addId") {
    //수정값 반환
    state["id"]=action.idLoad

    return state
  } else if (action.type === "removeId") {
    state["id"]=null
    
    return state
  }else {
    //기존값반환
    return state
  }
}
//리덕스로 사용할 값 생성
let store = createStore(combineReducers({ reducer }))
// let store = createStore(reducer)//전달값 1개인 경우


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    {/* 1.Redux의 셋팅 Provider*/}
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
