import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Nav from '../../components/navbar/Nav'

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState([]);

  useEffect(() => {
    listPokemonId(id);
  }, []);

  async function listPokemonId(id) {
    try {
      await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then(
          (result) => {
            setProfile(result);
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Nav></Nav>
      <Container>
        {profile != "" ? (
          <Row className="justify-content-center mt-5">
            <Col md="auto" style={{ width: "400px" }}>
              <Card className="shadow p-3 mb-5 bg-white">
                <Card.Img variant="top" src={profile.sprites.front_default} />
                <Card.Body>
                  <Card.Title style={{ textAlign: "center" }}>
                    {profile.name}
                  </Card.Title>
                  <Row className="justify-content-center">
                    <hr></hr>
                    {profile.types.map((type) => {
                      return (
                        <>
                          <Col md="auto" sm={profile.types.length > 1 ? 6 : 12}>
                            <Button variant="primary">{type.type.name}</Button>
                          </Col>
                        </>
                      );
                    })}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : null}
        <Row className="justify-content-center mb-4">
          <Col sm={4} className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={() => navigate("/home")}>
              {" "}
              Regresar a la lista
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
