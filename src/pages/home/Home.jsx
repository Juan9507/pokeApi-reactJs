import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
//Componentes
import Nav from "../../components/navbar/Nav";
import Search from "../../components/search/Search";
import Star from "../../components/star/Star";

const Home = () => {
  /** Estado para almacenar los pokemones de la api rest */
  const [listPokeApi, setListPokeApi] = useState([]);
  const [listPokeApiBackup, setListApiBackup] = useState([]);
  const [outstandingStartUseState, setOutstandingStartUseState] = useState([
    {
      id: 0,
      value: false,
    },
  ]);
  const [textBuscar, setTextBuscar] = useState("");
  const [colorsPokemones, setColorsPokemones] = useState({
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  });

  //array para la copia a guardar
  let copyFavority = [];
  //guardar el primer dato por default al localstorage
  if (JSON.parse(localStorage.getItem("copyFavority")) != null) {
    copyFavority = JSON.parse(localStorage.getItem("copyFavority"));
  }

  useEffect(() => {
    listPokemones();
  }, []);

  async function listPokemones() {
    try {
      await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50`)
        .then((res) => res.json())
        .then(
          (result) => {
            result.results.forEach(async (element) => {
              await fetch(element.url)
                .then((res) => res.json())
                .then((result) => {
                  setListPokeApi((listPokeApi) => [...listPokeApi, result]);
                  setListApiBackup((listPokeApi) => [...listPokeApi, result]);
                });
            });
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = (e) => {
    let text = e.target.value;
    const data = listPokeApiBackup;
    const newData = data.filter((item) => {
      const itemData = item.name;
      const textData = text;
      return itemData.indexOf(textData) > -1;
    });
    setListPokeApi(newData);
    setTextBuscar(text);
  };

  //validaciones para saber si se agrega el pokemon a favorito o se quita de favorito
  const outstanding = (id) => {
    var existe = outstandingStartUseState.find((value) => value.id == id);
    if (existe === undefined) {
      setOutstandingStartUseState([
        ...outstandingStartUseState,
        {
          id: id,
          value: true,
        },
      ]);

      outstandingCopy(id);
    } else {
      const newStar = outstandingStartUseState.filter((star) => star.id != id);
      setOutstandingStartUseState(newStar);
      outstandingCopyDelete(id);
    }
  };

  //Guardar en localStorage el pokemon favorito
  const outstandingCopy = (id) => {
    let object = {
      id: id,
      value: true,
    };
    copyFavority.push(object);
    localStorage.setItem("copyFavority", JSON.stringify(copyFavority));
    copyFavority = JSON.parse(localStorage.getItem("copyFavority"));
  };

  //elimminar del localStorage el pokemon favorito
  const outstandingCopyDelete = (id) => {
    let data = JSON.parse(localStorage.getItem("copyFavority"));
    const newCopyStar = data.filter((star) => star.id != id);
    localStorage.setItem("copyFavority", JSON.stringify(newCopyStar));
  };

  return (
    <>
      <Nav></Nav>
      <Container>
        <Search handleSearch={handleSearch} textBuscar={textBuscar} />
        <Row>
          {listPokeApi.length > 0
            ? listPokeApi.map((pokemones, index) => {
                return (
                  <Col lg={3} className="mt-5" key={pokemones.id}>
                    <Card className="shadow p-3 mb-5 bg-white">
                      <Card.Header style={{ backgroundColor: "white" }}>
                        <Star
                          id={pokemones.id}
                          outstandingStartUseState={outstandingStartUseState}
                          outstanding={outstanding} //funcion
                        />
                      </Card.Header>
                      <Link
                        to={`/profile/${pokemones.id}`}
                        state={{
                          outstandingStartUseState: outstandingStartUseState,
                        }}
                      >
                        <Card.Img
                          variant="top"
                          src={pokemones.sprites.other.home.front_default}
                        />
                        <Card.Body>
                          <Card.Title style={{ textAlign: "center" }}>
                            {pokemones.name}
                          </Card.Title>
                          <Row className="d-flex align-items-center">
                            <hr></hr>
                            {pokemones.types.map((type, index) => {
                              return (
                                <Col
                                  className="d-flex justify-content-center"
                                  key={index}
                                  xs={pokemones.types.length > 1 ? 6 : 12}
                                >
                                  <Button
                                    size="sm"
                                    style={{
                                      width: "100%",
                                      backgroundColor:
                                        colorsPokemones[type.type.name],
                                      borderColor:
                                        colorsPokemones[type.type.name],
                                    }}
                                  >
                                    {type.type.name}
                                  </Button>
                                </Col>
                              );
                            })}
                          </Row>
                        </Card.Body>
                      </Link>
                    </Card>
                  </Col>
                );
              })
            : null}
        </Row>
      </Container>
    </>
  );
};
export default Home;
