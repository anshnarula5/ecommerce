import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUserDetails } from "../redux/actions/userActions";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import Loader from "../components/Loader";
const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const { user, loading, error } = useSelector((state) => state.userDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) {
      navigate("/auth");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      }
    }
  }, [userInfo, navigate, dispatch, getUserDetails]);
    if (loading) {
        return <Loader />
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
      </Col>
    </Row>
  );
};

export default ProfileScreen;
