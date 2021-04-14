/*eslint-disable*/
import react, { useState } from 'react';
import { Navbar, Nav, Button,Item } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import './css/App.css';
import './css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <Nav
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item>
          <Nav.Link href="/home">지도</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav.Item>
      </Nav>
      <div>

      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default App;
