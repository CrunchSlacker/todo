import express from "express";
import mongoose from "mongoose";
import tasks from "./modules/Tasks.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://admin:passwordy@testarea.1aeuq0b.mongodb.net/todo?retryWrites=true&w=majority"
);

app.listen(3001, () => {
  console.log("3001");
});

app.get("/", (req, res) => {
  const id = req.query.id;
  if (id) {
    tasks.findById(id, (err, response) => {
      if (err) {
        res.send(err);
      } else {
        res.send(response);
      }
    });
  } else {
    tasks.find({}, (err, response) => {
      if (err) {
        res.send(err);
      } else {
        res.send(response);
      }
    });
  }
});

app.post("/", (req, res) => {
  const task = req.body.task;
  tasks.create({ task: task }, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
});

app.delete("/", (req, res) => {
  const id = req.body._id;
  tasks.findByIdAndRemove(id, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
});

app.put("/", (req, res) => {
  const task = req.body.task;
  console.log(task);
  const id = req.query.id;
  tasks.updateOne({ _id: id }, { task, task }, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
});
