import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
//router
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//componentes
import Nav from "../../components/navbar/Nav";
import Star from "../../components/star/Star";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  let location = useLocation();

  const [profile, setProfile] = useState([]);
  const [colorsPokemones, setColorsPokemones] = useState({
    fire: "red",
    grass: "#35682d",
    bug: "#B9935A",
    water: "#B0E2FF",
    poison: "#ADFF2F",
    flying: "#BAAAFF",
    normal: "#DDCCAA",
    electric: "#FFD700",
    ground: "#B0C4DE",
    fairy: "#FFB0FF",
  });

  useEffect(() => {
    listPokemonId(id);
    console.log(location.state);
  }, []);

  async function listPokemonId(id) {
    try {
      await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then(
          (result) => {
            setProfile(result);
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
                <Card.Header style={{ backgroundColor: "white" }}>
                  <Star
                    id={profile.id}
                    outstandingStartUseState={
                      location.state.outstandingStartUseState
                    }
                    outstanding={location.state.outstanding}
                  />
                </Card.Header>
                <Card.Img
                  variant="top"
                  src={profile.sprites.other.home.front_default}
                />
                <Card.Body>
                  <Card.Title style={{ textAlign: "center" }}>
                    {profile.name}
                  </Card.Title>
                  <Row className="justify-content-center">
                    <hr></hr>
                    {profile.types.map((type, index) => {
                      return (
                        <Col
                          md="auto"
                          xs={profile.types.length > 1 ? 6 : 12}
                          key={index}
                          className="d-flex justify-content-center"
                        >
                          <Button
                            size="lg"
                            variant="primary"
                            style={{
                              width: "100%",
                              backgroundColor: colorsPokemones[type.type.name],
                              borderColor: colorsPokemones[type.type.name],
                            }}
                          >
                            {type.type.name}
                          </Button>
                        </Col>
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
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/home")}
            >
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
