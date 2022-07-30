const express = require("express");
const app = express();
const mysql = require("mysql2")
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "todolist",
})

const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
    const { name } = req.body;
    const { description } = req.body;
    const { date } = req.body;

    let SQL ="INSERT INTO todoitem ( name, description, date) VALUES ( ?,?,? )"

    db.query(SQL, [name, description, date], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
})

app.post("/search", (req, res) => {
    const { name } = req.body;
    const { description } = req.body;
    const { date } = req.body;
  
    let mysql =
      "SELECT * from todoitem WHERE name = ? AND description = ? AND date = ?";
    db.query(mysql, [name, description, date], (err, result) => {
      if (err) res.send(err);
      res.send(result);
    });
  });

app.get("/getTodoCards", (req, res) => {
    let SQL = "SELECT * from todoitem";

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result);
    })
})

app.put("/edit", (req, res) => {
    const { id } = req.body;
    const { name } = req.body;
    const { description } = req.body;
    const { date } = req.body;
    const { status } = req.body;

    let SQL = "UPDATE todoitem SET name = ?, description = ?, date = ?, status = ? WHERE idtodo = ?"

    db.query(SQL, [name, description, date, status, id], (err, result) => {
        if(err) console.log(err)
        else res.send(result);
    })
})

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    let SQL = "DELETE FROM todoitem WHERE idtodo = ?";
    db.query(SQL, [id], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
})

app.listen(PORT, ()=>{
    console.log("rodando servidor")
})