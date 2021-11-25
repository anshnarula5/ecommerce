import Button from "@restart/ui/esm/Button";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import products from "../products";

const ProductScreen = () => {
  const params = useParams();
  const [product, setProduct] = useState([])
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`/api/products/${params.id}`)
      console.log(res)
      setProduct(res.data)
    }
    fetchProduct()
  }, [])
  
  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={` ${product.numReviews} reviews`}
              />
            </ListGroupItem>
            <ListGroupItem>Price : {product.price}</ListGroupItem>
            <ListGroupItem>Description : {product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Price : </Col>
                  <Col>{product.price}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status :</Col>
                  <Col>
                    {product.countInStock > 0 ? "In stock" : "Not in stock"}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button className="btn btn-dark btn-block" type = "button">Add to cart</Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
