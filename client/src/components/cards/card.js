import React, { useState } from "react";
import "./card.css";
import Axios from "axios";

export default function Card(props) {
  const [editValues, setEditValues] = useState({
    name: props.name,
    description: props.description,
    date: props.date.slice(0, 10),
    id: props.id,
    status: props.status,
  });
  const [editing, setEditing] = useState(false);

  const handleChangeValues = (value) => {
    setEditValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickEdit = () => {
    setEditing((prevValue) => {
      return !prevValue;
    });
  };

  const handleClickCheck = (value) => {
    setEditValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.checked,
    }));
  };

  const handleClickSave = (value) => {
    handleClickEdit();
    Axios.put("http://localhost:3001/edit", {
      id: editValues.id,
      name: editValues.name,
      description: editValues.description,
      date: editValues.date,
      status: editValues.status,
    }).then(() => {
      props.setListCard(
        props.listCard.map((value) => {
          return value.idtodo === editValues.id
            ? {
                idtodo: editValues.id,
                name: editValues.name,
                description: editValues.description,
                date: editValues.date,
                status: editValues.status,
              }
            : value;
        })
      );
    });
  };

  const handleDeleteTodo = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`).then(() => {
      props.setListCard(
        props.listCard.filter((value) => {
          return value.idtodo !== editValues.id;
        })
      );
    });
  };

  return (
    <div className="card--container" ischecked={editValues.status.toString()}>
      {!editing ? (
        <div>
          <label className="card--div">
            <h1 className="card--name">{props.name}</h1>
            <p className="card--description">{props.description}</p>
            <p className="card--date">
              {props.date.slice(0, 10).split("-").reverse().join("-")}
            </p>
          </label>

          <button className="card--button card--edit" onClick={handleClickEdit}>
            Editar
          </button>
          <button
            className="card--button card--delete"
            onClick={handleDeleteTodo}
          >
            Apagar
          </button>
        </div>
      ) : (
        <div>
          <div className="card--div">
            <input
              type="checkbox"
              className="card--check"
              name="status"
              defaultChecked={props.status}
              onChange={handleClickCheck}
            ></input>
            <input
              type="text"
              className="card--name"
              name="name"
              defaultValue={props.name}
              onChange={handleChangeValues}
            />
            <textarea
              className="card--description"
              name="description"
              defaultValue={props.description}
              onChange={handleChangeValues}
            ></textarea>
            <input
              type="date"
              className="card--date"
              name="date"
              defaultValue={props.date.slice(0, 10)}
              onChange={handleChangeValues}
            />
          </div>
          <button className="card--button card--save" onClick={handleClickSave}>
            Salvar
          </button>
          <button
            className="card--button card--delete"
            onClick={handleDeleteTodo}
          >
            Apagar
          </button>
        </div>
      )}
    </div>
  );
}
