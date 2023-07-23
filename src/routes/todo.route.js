const express = require("express");
const todoRoute = express.Router();

const {
  httpGetAllTodos,
  httpCreateTodo,
  httpDeleteTodo,
  httpUpdateTodo,
} = require("../controllers/todo.controller");

todoRoute.get("/", httpGetAllTodos);
todoRoute.post("/", httpCreateTodo);
todoRoute.delete("/", httpDeleteTodo);
todoRoute.put("/", httpUpdateTodo);

module.exports = todoRoute;
