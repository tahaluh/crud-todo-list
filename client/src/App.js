import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/card";

function App() {
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState();

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      description: values.description,
      date: values.date,
    }).then(() => {
      Axios.post("http://localhost:3001/search", {
        name: values.name,
        description: values.description,
        date: values.date,
      }).then((response) => {
        console.log(response.data);
        setListCard([
          ...listCard,
          {
            idtodo: response.data[response.data.length - 1].idtodo,
            name: values.name,
            description: values.description,
            date: values.date,
            status: false,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getTodoCards").then((response) => {
      setListCard(response.data);
    });
  }, []);

  return (
    <div className="App">
      <div className="register--container">
        <h1 className="register--tittle">To-do List</h1>
        <input
          type="text"
          name="name"
          placeholder="Nome da tarefa..."
          className="register--input"
          onChange={handleChangeValues}
        ></input>
        <textarea
          form="to-do"
          name="description"
          placeholder="Descrição..."
          className="register--input"
          onChange={handleChangeValues}
        ></textarea>
        <input
          type="date"
          name="date"
          placeholder="Insira a data"
          className="register--input"
          onChange={handleChangeValues}
        ></input>
        <button className="register-button" onClick={() => handleClickButton()}>
          Enviar
        </button>
      </div>
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
