import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import fire from "../../config/Fire";

function Nav() {

  function logout(){
    fire.auth().signOut();
  }

  return (
    <>
    <Navbar bg="light" variant="light" className="shadow-sm p-3 mb-5 bg-white rounded">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/800px-Pok%C3%A9_Ball_icon.svg.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Pokemon List
          </Navbar.Brand>
        <Navbar.Brand>
            edward
        </Navbar.Brand>
        <Navbar.Brand>
            <Button variant="primary" onClick={() => logout}>Cerrar sesion</Button>
        </Navbar.Brand>
        </Container>
       
      </Navbar>
    </>

  )
}

export default Nav;
