import React, { useState } from "react";
import { Container, Button, Form, Card, Row, Col } from "react-bootstrap";
import { auth } from "../../config/fire";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login(props) {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  //Iniciar sesion
  async function handleSubmit(e) {
    console.log("login");
    e.preventDefault();
    if (login.email != "" && login.password != "") {
      signInWithEmailAndPassword(auth, login.email, login.password)
        .then((user) => {
          localStorage.setItem("email", user.user.email);
          alert("login exitoso");
        })
        .catch((error) => {
          console.error(error);
        });
    }else{
      alert("Los campos tienen que ser llenados")
    }
  }

  //Registrarse
  async function signup(e) {
    console.log("entra");
    e.preventDefault();
    if (login.email != "" && login.password != "") {
      createUserWithEmailAndPassword(auth, login.email, login.password)
      .then((user) => {
        localStorage.setItem("email", user.user.email);
        alert("Su registro fue exitoso");
      })
      .catch((error) => {
        console.error(error);
      });
    }else{
      alert("Los campos tienen que ser llenados")
    }
    
  }

  return (
    <>
      <Container>
        <Row className="mt-5 justify-content-center">
          <Col sm={12} md="auto" className="mb-5">
            <h2>Logueate para ver la lista de pokemones</h2>
          </Col>
          <Col sm={12} md="auto">
            <Card className="shadow p-3 mb-5 bg-white">
              <Card.Body>
                <Form md="auto">
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formBasicEmail"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Col sm="12">
                      <Form.Control
                        value={login.email}
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                      />
                    </Col>
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Col sm="12">
                      <Form.Control
                        value={login.password}
                        type="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Password"
                        required
                      />
                    </Col>
                  </Form.Group>
                  <Row className="mt-3 justify-content-center">
                    <Col sm={2}>
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Login
                      </Button>
                    </Col>
                    <Col sm={2}>
                      <Button variant="primary" onClick={signup}>
                        Sign up
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
