import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/card";
import CardRegister from "./components/cardRegister/cardRegister";
import UserRegister from "./components/userRegister/userRegister";

function App() {
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState();

  useEffect(() => {
    Axios.get("http://localhost:3001/getTodoCards").then((response) => {
      setListCard(response.data);
    });
  }, []);

  return (
    <div className="App">
      <CardRegister
        values={values}
        setValues={setValues}
        listCard={listCard}
        setListCard={setListCard}
      />
      <div className="cards--container">
        {typeof listCard !== "undefined" &&
          listCard.map((value) => {
            return (
              <Card
                key={value.idtodo}
                listCard={listCard}
                setListCard={setListCard}
                id={value.idtodo}
                name={value.name}
                description={value.description}
                date={value.date}
                status={value.status}
              ></Card>
            );
          })}
      </div>
    </div>
  );
}

export default App;
