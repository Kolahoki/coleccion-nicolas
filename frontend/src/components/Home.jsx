import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function Home() {
  const userData = useSelector((state) => state.login);
  const isLoggedin = userData.isAutenticated;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedin) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

  console.log(userData);
  return (
    <>
      <h1>Página home de Nicolás Borysov Ravelo</h1>
      <h2>
        Hola {userData.userName} como rol: {userData.userRol}{" "}
      </h2>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/");
        }}
      >
        Salir
      </Button>
    </>
  );
}

export default Home;
