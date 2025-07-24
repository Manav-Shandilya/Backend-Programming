import express from 'express';
import db from '../db.js'

const router = express.Router();

//get all todos
router.get('/', (req, res) => {
    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?');
    const todos = getTodos.all(req.userId);
    res.json({ todos });
});

//create a todo
router.post('/', (req, res) => {
    const { task } = req.body;
    const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`);
    const result = insertTodo.run(req.userId, task);

    res.json({ id: result.lastInsertRowid, task, completed: 0 })
 });

//update the todos
router.put('/:id', (req, res) => { 
    const { completed } = req.body;
    const { id } = req.params;

    const updateTodo = db.prepare(`UPDATE todos SET completed = ? WHERE id = ?`);
    const result = updateTodo.run(completed, id);

    res.json({message: "Todo completed"});
 });

//delete user
router.delete('/remove', (req, res) => {
    const userId = req.userId;
    const deleteUserTodos = db.prepare(`DELETE FROM todos WHERE user_id = ?`);
    const todosResult = deleteUserTodos.run(userId);
    console.log(`Deleted ${todosResult.changes} todos for user ${userId}`);

    const deleteUser = db.prepare(`DELETE FROM users WHERE id = ?`);
    deleteUser.run(userId);

    res.json({ "message": "User deleted" })
})

//delete the todo
router.delete('/:id', (req, res) => { 
    const { id } = req.params;
    const userId = req.userId
    const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`);
    deleteTodo.run(id, userId);

    res.json({message: "Todo deleted"})
 });

export default router;