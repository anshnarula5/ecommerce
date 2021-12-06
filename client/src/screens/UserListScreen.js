import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router";
import { listUsers } from "../redux/actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate=  useNavigate()
  const { users, error, loading } = useSelector((state) => state.userList);
  const {userInfo} = useSelector(state => state.userLogin)
  useEffect(() => {
      if (userInfo && userInfo.isAdmin) {
        dispatch(listUsers());
      } else {
          navigate("/auth")
    }
  }, [dispatch, userInfo, navigate]);
  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
                <tr key = {user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "Admin" : "Not admin"}</td>
                    <td><Link to = {`/user/${user._id}`}>User</Link></td>
                </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
