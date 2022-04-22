import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const url = `http://localhost:5000/user/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;

    const user = { name, email };
    //post of adding data
    const url = `http://localhost:5000/user/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("User adding success");
        e.target.reset();
      });
  };
  return (
    <div>
      <h1>Update User:{users.name}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" required /> <br />
        <input type="email" name="email" placeholder="Email" required /> <br />
        <input type="submit" value="New User Add" />
      </form>
      
    </div>
  );
};

export default UpdateUser;
