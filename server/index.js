const express = require("express");
let tasks = [
    { id: 1, task: 'study', isCompleted: true }
]
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json())
// get data
app.get("/add", async (req, res) => {
    res.json(await tasks);
});
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
app.post('/add', async function (req, res) {

    const newTasks = await req.body;
    tasks = [...newTasks]
    console.log(tasks, newTasks)
})
module.exports = app;