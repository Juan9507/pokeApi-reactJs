import { async } from "@firebase/util";
import React, { useState } from "react";
import { Container, Button, Form, Card, Row, Col } from "react-bootstrap";
import fire from "../../config/Fire";

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
    e.preventDefault();
    e.target.reset();
    fire
      .auth()
      .signInWithEmailAndPassword(login.email, login.password)
      .then((u) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  //Registrarse
  async function signup(e){
    e.preventDefault();
    e.target.reset();
    fire
      .auth()
      .createUserWithEmailAndPassword(login.email, login.password)
      .then((u) => {})
      .catch((error) => {
        console.log(error);
      });
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
                        type="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Password"
                        required
                      />
                    </Col>
                  </Form.Group>
                  <Col sm={6}>
                    <Button variant="primary" type="submit" onClick={() => handleSubmit}>
                        Login
                    </Button>
                  </Col>
                  <Col sm={6}>
                    <Button variant="primary" onClick={() => signup}>
                        Sign up
                    </Button>
                  </Col>
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
