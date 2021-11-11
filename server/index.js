const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "dashboarddb",
});


app.post("/create", (req, res) => {
    const website = req.body.website;
    const xpath = req.body.xpath;
    const element = req.body.element;
    const label = req.body.label;


    db.query(
        "INSERT INTO entities(`website`, `xpath`, `element`, `label`) VALUES (?,?,?,?)",
        [website, xpath, element, label],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});


app.get("/entities", (req, res) => {
    db.query("SELECT * FROM `entities`", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put("/update", (req, res) => {
    const website = req.body.website;
    const xpath = req.body.xpath;
    const element = req.body.element;
    const label = req.body.label;
    const id = req.body.id;
    db.query(
        "UPDATE `entities` SET `website` = ?, `xpath` = ?, `element` = ?, `label` = ? WHERE `id` = ?",
        [website, xpath, element, label, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});
  
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM `entities` WHERE `id` = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


app.listen(3001, () => {
    console.log("running on port 3001");
});