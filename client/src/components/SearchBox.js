import React, { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const SearchBox = () => {
  const [keyWord, setKeyWord] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setKeyWord("")
    if (keyWord.trim()) {
      navigate(`/search/${keyWord}`);
    } else {
      navigate("/");
    }
  };
  return (
    <Form onSubmit={handleSubmit} className='d-flex' >
      <FormControl
        name="q"
        style = {{borderRadius : 0}}
        type="text"
        onChange={(e) => setKeyWord(e.target.value)}
        placeholder="Search products"
        className="mr-sm-2 ml-sm-5"
      ></FormControl>
      <Button type="submit" variant="outline-primary"  style = {{borderRadius : 0}}>
      <i class="fas fa-search"></i>
      </Button>
    </Form>
  );
};

export default SearchBox;
