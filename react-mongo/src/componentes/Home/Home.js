import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddUser from "../AddUser/AddUser";

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/user`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure want to delete");
    if (proceed) {
      console.log("delete  btn", id);

      const url = `http://localhost:5000/user/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            const remaining = users.filter((user) => user._id !== id);
            setUsers(remaining);
          }
        });
    }
  };
  return (
    <div>
      <h1>Home :{users.length}</h1>
      {users.map((user) => (
        <li key={user._id}>
          {user.name}::{user.email}
          {
            <Link to={`/update/${user._id}`}>
              <button>User Update</button>
            </Link>
          }
          <button onClick={() => handleDelete(user._id)}>User Delete</button>
        </li>
      ))}
      <h1>Add User</h1>
      <button>
        <Link to="/user/add">Add user</Link>
      </button>
    </div>
  );
};

export default Home;
