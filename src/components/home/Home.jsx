import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Nav from "../navbar/Nav";
import Search from "../search/Search";

const Home = () => {
  /** Estado para almacenar los pokemones de la api rest */
  const [listPokeApi, setListPokeApi] = useState([]);
  const [listPokeApiBackup, setListApiBackup] = useState([]);
  const [textBuscar, setTextBuscar] = useState("");

  useEffect(() => {
    limitPokemones();
  }, []);

  async function listPokemonesId(id) {
    try {
      await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then(
          (result) => {
            setListPokeApi((listPokeApi) => [...listPokeApi, result]);
            setListApiBackup((listPokeApi) => [...listPokeApi, result]);
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.log(error);
    }
  }

  function limitPokemones() {
    Array.from({ length: 51 }).forEach((value, index, array) => {
      listPokemonesId(index);
    });
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

  return (
    <>
      <Nav></Nav>
      <Container>
        <Search handleSearch={handleSearch} textBuscar={textBuscar} />
        <Row>
          {listPokeApi.length > 0
            ? listPokeApi.map((pokemones, index) => {
                return (
                  <Col sm={3} className="mt-5" key={pokemones.id}>
                    <Card className="shadow p-3 mb-5 bg-white" >
                      <Link to={`/profile/${pokemones.id}`}>
                        <Card.Img
                          variant="top"
                          src={pokemones.sprites.front_default}
                        />
                        <Card.Body>
                          <Card.Title style={{ textAlign: "center" }}>
                            {pokemones.name}
                          </Card.Title>
                          <Row className="justify-content-center">
                            <hr></hr>
                            {pokemones.types.map((type) => {
                              return (
                                <>
                                  <Col
                                    key={type.slot}
                                    md="auto"
                                    sm={pokemones.types.length > 1 ? 6 : 12}
                                  >
                                    <Button variant="primary">
                                      {type.type.name}
                                    </Button>
                                  </Col>
                                </>
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
