
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./componentes/Home/Home";
import AddUser from "./componentes/AddUser/AddUser";
import UpdateUser from "./componentes/UpdateUser/UpdateUser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/user/add" element={<AddUser></AddUser>}></Route>
        <Route path="/update/:id" element={<UpdateUser></UpdateUser>}></Route>
      </Routes>
    </div>
  );
}

export default App;
