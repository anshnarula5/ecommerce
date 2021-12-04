import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Paginate from "../components/Paginate";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import TopProducts from "../components/TopProducts";
import { useParams } from "react-router";
import {Link} from "react-router-dom";

const HomeScreen = () => {
  const { loading, products, error, page, pages } = useSelector(
    (state) => state.productList
  );
  const params = useParams();
  const dispatch = useDispatch();
  const { keyword, pageNumber = 1 } = params;
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      {!keyword && <TopProducts />}
      {keyword && <Link to = "/" className = "btn btn-outline-dark">Go back</Link>}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" children={error} />
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page = {page} pages = {pages} keyword ={keyword ? keyword : ""} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
