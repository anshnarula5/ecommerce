import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUserDetails } from "../redux/actions/userActions";
import {
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Table,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listMyOrders } from "../redux/actions/orderActions";
const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const { user, loading} = useSelector((state) => state.userDetails);
  const {
    loading: loadingOrders,
    error: orderError,
    orders,
  } = useSelector((state) => state.myOrders);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) {
      navigate("/auth");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      }
      dispatch(listMyOrders());
    }
  }, [userInfo, navigate, dispatch, user.name]);
  if (loading) {
    return <Loader />;
  }
  if (!user) {
    return "No user"
  }
  return (
    <Row>
      <Col md={4}>
        <h3>User Profile</h3>
        <ListGroup variant="flush">
          <ListGroupItem>Name : {user.name}</ListGroupItem>
          <ListGroupItem>Email : {user.email}</ListGroupItem>
        </ListGroup>
      </Col>
      <Col md={8}>
        <h3>My Orders</h3>
        {loadingOrders ? (
          <Loader />
        ) : orderError ? (
          <Message variant="danger">{orderError}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.length > 0 && orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times"></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times"></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/orders/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
