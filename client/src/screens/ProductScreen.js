import Button from "@restart/ui/esm/Button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Form,
  FormControl,
  FormSelect,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { addToCart } from "../redux/actions/cartActions";
import {
  clearProductDetails,
  listProductDetails,
} from "../redux/actions/productActions";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  useEffect(() => {
    dispatch(listProductDetails(params.id));
    return () => {
      dispatch(clearProductDetails());
    };
  }, []);
  const handleAddToCart = () => {
    dispatch(addToCart(product._id, qty));
    navigate(`/cart`);
  };
  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger" children={error} />
        ) : (
          <>
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
                <ListGroupItem>
                  Description : {product.description}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price : </Col>
                      <Col>{product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroupItem>
                    <Row>
                      <Col>Status :</Col>
                      <Col>
                        {product.countInStock > 0 ? "In stock" : "Not in stock"}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Quantity :</Col>
                        <Col>
                          <FormSelect
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </FormSelect>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem>
                    <Button
                      className="btn btn-dark btn-block"
                      type="button"
                      onClick={handleAddToCart}
                    >
                      Add to cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default ProductScreen;
