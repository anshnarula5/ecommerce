import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions";

const HomeScreen = () => {
  const {loading, products} = useSelector(state => state.productListReducer)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, []);
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
