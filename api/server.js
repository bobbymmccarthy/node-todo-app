const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/todo');
const { findByIdAndDelete } = require('./models/todo');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://readWriteUser:468qGC2mDTNNyAyd@todo-app.rfqkagj.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Connected to DB'))
    .catch(console.error)

// routing and async await
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos)
})

// routing
app.post('/todos', (req,res) => {

    const todo = new Todo({
        text: req.body.text
    });

    todo.save();
    res.json(todo);
})

// routing and async await
app.delete('/todos/:id', async (req,res) => {
    // database query and request object
    const result = await Todo.findByIdAndDelete(req.params.id);
    // response object
    res.json(result)
})

// routing and async await
app.put('/todos/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.completed = !todo.completed;

    todo.save()
    // response object
    res.json(todo)

})

app.listen(3001, () => {
    console.log('Server listening on port 3001...')
})