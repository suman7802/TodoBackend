const Todo = require("../models/todo.model");

async function httpGetAllTodos(req, res) {
  const userId = req.user._id;

  try {
    const todos = await Todo.find({
      user: userId,
    });
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}
async function httpCreateTodo(req, res) {
  const userId = req.user._id;
  const user = req.body;
  try {
    const newTodo = new Todo({
      user: userId,
      ...user,
    });
    const todo = await newTodo.save();
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

async function httpDeleteTodo(req, res) {
  const userId = req.user._id;
  const todoId = req.body._id;

  try {
    const todo = await Todo.findOneAndDelete({
      _id: todoId,
      user: userId,
    });
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}
async function httpUpdateTodo(req, res) {
  const userId = req.user._id;
  const todoId = req.body._id;
  try {
    const newTodo = {
      todo: req.body.todo,
      completed: req.body.completed,
    };
    await Todo.findOneAndUpdate({_id: todoId, user: userId}, newTodo, {
      new: true,
    });

    return res.status(200).json(newTodo);
  } catch (error) {
    return error;
  }
}

module.exports = {
  httpGetAllTodos,
  httpCreateTodo,
  httpDeleteTodo,
  httpUpdateTodo,
};
