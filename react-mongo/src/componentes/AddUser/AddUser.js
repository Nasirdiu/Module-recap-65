import React from "react";

const AddUser = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;

    const user = { name, email };
    //post of adding data
    fetch("http://localhost:5000/user", {
      method: "POST",
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
      <h1>Please a add new user</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" required /> <br />
        <input type="email" name="email" placeholder="Email" required /> <br />
        <input type="submit" value="New User Add" />
      </form>
    </div>
  );
};

export default AddUser;
