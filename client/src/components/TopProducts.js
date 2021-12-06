import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTopProducts } from "../redux/actions/productActions";
import Loader from "./Loader";
import Message from "./Message";
import Rating from "./Rating";
import { Carousel, Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const TopProducts = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(
    (state) => state.topProducts
  );
  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Row>
              <Col md={6}>
                <Image
                  src={product.image}
                  alt={product.name}
                  style={{ width: "40rem", height: "30rem" }}
                />
              </Col>
              <Col md={6}>
                <div className="text-center mt-5 hide">
                  <h3>{product.name} </h3>
                  <Rating value={product.rating} />
                  {product.price}
                </div>
              </Col>
            </Row>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default TopProducts;
