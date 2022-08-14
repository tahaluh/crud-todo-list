const express = require("express");
const app = express();
const mysql = require("mysql2")
const cors = require("cors");

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})

const PORT = 3001;

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://tahaluh-crud-todo-list.netlify.app");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
app.use(express.json());

app.post("/api/register", (req, res) => {
    const { name } = req.body;
    const { description } = req.body;
    const { date } = req.body;

    let SQL ="INSERT INTO todoitem ( name, description, date) VALUES ( ?,?,? )"

    db.query(SQL, [name, description, date], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
})

app.post("/api/search", (req, res) => {
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

app.get("/api/getTodoCards", (req, res) => {
    let SQL = "SELECT * from todoitem";

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result);
    })
})

app.put("/api/edit", (req, res) => {
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

app.delete("/api/delete/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    let SQL = "DELETE FROM todoitem WHERE idtodo = ?";
    db.query(SQL, [id], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log("rodando servidor")
})