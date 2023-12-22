import React from "react";
import { Outlet } from "react-router-dom";
import NaveBar from "../components/NavBar/NaveBar";
import SidBar from "../components/SidBar/SidBar";
import Svg from "../components/Svg";
import "../App.css";
function ProtectedRoutes() {
  return (
    <>
      <Svg />
      <NaveBar />
      <div className="container-fluid">
        <div className="row">
          <SidBar />
          <Outlet/>
        </div>
      </div>
    </>
  );
}

export default ProtectedRoutes;
