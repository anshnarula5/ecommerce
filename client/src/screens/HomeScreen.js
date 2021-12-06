import React, { useEffect, useState } from "react";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import Product from "../components/Product";
import Paginate from "../components/Paginate";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import TopProducts from "../components/TopProducts";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import AOS from "aos";
import "aos/dist/aos.css";

function valuetext(value) {
  return `${value}°C`;
}

const HomeScreen = () => {
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [range, setRange] = useState([0, 1000]);
  console.log(range);
  const { loading, products, error, page, pages } = useSelector(
    (state) => state.productList
  );
  const params = useParams();
  const dispatch = useDispatch();
  const { keyword, pageNumber = 1 } = params;
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, category, sort, range));
    AOS.init({
      duration: 100,
    });
  }, [dispatch, keyword, pageNumber, category, sort]);
  const handleClear = () => {
    setCategory("");
    setSort("");
    setRange([0, 1000])
  };

  const handleChange = (event, newValue) => {
    setRange(newValue);
  };
  const handleFilter = () => {
    dispatch(listProducts(keyword, pageNumber, category, sort, range));
  }
  return (
    <>
      {!keyword && <TopProducts />}
      {keyword && (
        <Link to="/" className="btn btn-outline-dark">
          Go back
        </Link>
      )}
      <h1>{keyword ? `Search results for ${keyword}` : "All products"}</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" children={error} />
      ) : (
        <>
          <Row>
            {!keyword && (
              <Col md={3}>
                <Card className="sticky-top" style={{ top: "2rem" }}>
                  <div style={{ paddingInline: 20, paddingBlock: 20 }}>
                    <Form>
                      <Row>
                        <Col md={9}>
                          <Slider
                            max = {1000}
                            getAriaLabel={() => "Temperature range"}
                            value={range}
                            onChange={handleChange}
                            valueLabelDisplay="on"
                            getAriaValueText={valuetext}
                          />
                        </Col>
                        <Col md={3}>
                          <Button className="btn-sm btn-inline" onClick = {handleFilter}>Filter</Button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                  <Form style={{ paddingInline: 50, paddingBlock: 10 }}>
                    <p>Sort </p>
                    <Form.Select
                      aria-label="Default select example"
                      className="mb-2"
                      as="select"
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <option>Sort by ...</option>
                      <option value="plh" name="plh" checked={sort === "plh"}>
                        Price Low to high
                      </option>
                      <option value="phl" name="phl" checked={sort === "phl"}>
                        Price high to low
                      </option>
                      <option value="rhl" name="rhl" checked={sort === "rhl"}>
                        Rating high to low
                      </option>
                      <option value="rlh" name="rlh" checked={sort === "rlh"}>
                        Rating low to high
                      </option>
                    </Form.Select>
                    <p>Search by category </p>
                    <Form.Check
                      className="my-1"
                      label="All"
                      name="group1"
                      type="radio"
                      checked={category === ""}
                      onClick={() => setCategory("")}
                      id={`inline-radio-1`}
                    />
                    <Form.Check
                      className="my-1"
                      label="Electronics"
                      name="group1"
                      type="radio"
                      checked={category === "Electronics"}
                      onClick={() => setCategory("Electronics")}
                      id={`inline-radio-1`}
                    />
                    <Form.Check
                      className="my-1"
                      label="Gaming"
                      name="group1"
                      type="radio"
                      checked={category === "Gaming"}
                      id={`inline-radio-2`}
                      onClick={() => setCategory("Gaming")}
                    />
                    <Form.Check
                      className="my-1"
                      label="Home Appliances"
                      name="group1"
                      type="radio"
                      checked={category === "Home Appliances"}
                      id={`inline-radio-3`}
                      onClick={() => setCategory("Home Appliances")}
                    />
                    <Button className="btn-sm my-2" onClick={handleClear}>
                      Clear filters
                    </Button>
                  </Form>
                </Card>
              </Col>
            )}
            <Col md={keyword ? 12 : 9}>
              <Row>
                {products.map((product) => (
                  <Col
                    key={product._id}
                    sm={12}
                    md={6}
                    lg={keyword ? 3 : 4}
                    // data-aos={"fade-up"}
                  >
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
          <Paginate
            page={page}
            pages={pages}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;

// const handle = (props) => {
//   const { value, dragging, index, ...restProps } = props;
//   return (
//     <SliderTooltip
//       prefixCls="rc-slider-tooltip"
//       overlay={`${value} %`}
//       visible={dragging}
//       placement="top"
//       key={index}
//     >
//       <Handle value={value} {...restProps} />
//     </SliderTooltip>
//   );
// };
