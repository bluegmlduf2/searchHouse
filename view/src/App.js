/*eslint-disable*/
import react, { useState } from 'react';
import { Container } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import { Route, Link, Switch } from 'react-router-dom' /* 라우터 초기 설정 */

import Nav from "./components/common/Nav.js";
import Footer from "./components/common/Footer.js";
import Main from "./components/main/Main.js";
import SignIn from "./components/common/SignIn.js";
import SignUp from "./components/common/SignUp.js";
import Sell from "./components/sell/Sell.js";
import Map from "./components/map/Map.js";


function App() {
  return (
    <Container fluid className="App">
      
      <Route path="/" component={Nav}/>

      <Switch>
        <Route path="/map" component={Map}/>
        <Route path="/signin" component={SignIn}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/Sell" component={Sell}/>
        <Route path="/" component={Main}/>
      </Switch>

      <Route path="/" component={Footer}/>
    </Container>
  );
}

export default App;
