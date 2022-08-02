import React from "react";
import "./cardRegister.css";
import Axios from "axios";

export default function userRegister(props) {
    const handleChangeValues = (value) => {
        props.setValues((prevValue) => ({
          ...prevValue,
          [value.target.name]: value.target.value,
        }));
      };
    
      const handleClickButton = () => {
        Axios.post("http://localhost:3001/register", {
          name: props.values.name,
          description: props.values.description,
          date: props.values.date,
        }).then(() => {
          Axios.post("http://localhost:3001/search", {
            name: props.values.name,
            description: props.values.description,
            date: props.values.date,
          }).then((response) => {
            console.log(response.data);
            props.setListCard([
              ...props.listCard,
              {
                idtodo: response.data[response.data.length - 1].idtodo,
                name: props.values.name,
                description: props.values.description,
                date: props.values.date,
                status: false,
              },
            ]);
          });
        });
      };

  return (
    <div className="register--card--container">
      <h1 className="register--card--tittle">To-do List</h1>
      <input
        type="text"
        name="name"
        placeholder="Nome da tarefa..."
        className="register--card--input"
        onChange={handleChangeValues}
      ></input>
      <textarea
        form="to-do"
        name="description"
        placeholder="Descrição..."
        className="register--card--input"
        onChange={handleChangeValues}
      ></textarea>
      <input
        type="date"
        name="date"
        placeholder="Insira a data"
        className="register--card--input"
        onChange={handleChangeValues}
      ></input>
      <button
        className="register--card--button"
        onClick={() => handleClickButton()}
      >
        Enviar
      </button>
    </div>
  );
}
