import express from "express"
import mysql from "mysql"
import dotenv from "dotenv"
import cors from "cors"

const app = express()

dotenv.config();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: process.env.MYSQL_PASSWORD,
    database:"test"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("hello, this is the backend")
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM test.books;"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// CRUD operations
app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover 
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("books are created successfully")
    })
})

app.listen(8000, () => {
    console.log("Connected to backend!")
})