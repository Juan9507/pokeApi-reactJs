import React from "react";
import { Form, Button } from "react-bootstrap";

function Search(props) {

  const { handleSearch, textBuscar } = props;

  return (
    <>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2 mr-3"
          aria-label="Search"
          defaultValue={textBuscar}
          onChange={handleSearch}
        />
        <Button variant="outline-success" >Search</Button>
      </Form>
    </>
  );
}

export default Search;
