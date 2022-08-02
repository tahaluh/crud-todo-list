import React, { useState } from "react";
import "./userRegister.css";
import Axios from "axios";

export default function userRegister(props) {
  return (
    <div className="register--user--container">
      <h1 className="register--user--tittle">To-do List</h1>
      <input
        type="text"
        name="name"
        placeholder="Nome da tarefa..."
        className="register--user--input"
      ></input>
      <textarea
        form="to-do"
        name="description"
        placeholder="Descrição..."
        className="register--user--input"
      ></textarea>
      <input
        type="date"
        name="date"
        placeholder="Insira a data"
        className="register--user--input"
      ></input>
      <button className="register--card--button">Enviar</button>
    </div>
  );
}
