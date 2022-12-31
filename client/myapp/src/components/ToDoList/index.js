import React, { useState, useEffect } from 'react'
import './style.css'
import Footer from '../Footer/index';
import TaskForm from '../TaskForm/index';
import TaskSearch from '../TaskSearch/index';
import TasksList from '../TasksList/index';
const ToDoList = () => {
    var [tasks, setTasks] = useState([])
    const [searchList, setSearchList] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    useEffect(() => {
        fetch("/add")
            .then((res) => res.json())
            .then((data) => setTasks(data));



    }, []);
    const fetchData = () => {
        fetch("/add")
            .then((res) => res.json())
            .then((data) => setTasks(data));
    }
    function handleSave(data) {
        fetch('/add',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)

            }
        ).then(() => fetchData())
    }
    const handleAddingTask = (task) => {
        const newTasks = [...tasks, { task, id: crypto.randomUUID(), isCompleted: false }];
        setTasks(newTasks);
        handleSave(newTasks)
    }

    const handleDeletingTask = (id) => {
        const newTasks = tasks.filter((task) => task.id !== id);
        const newSearchTask = searchList.filter(task => task.id !== id)
        setTasks([...newTasks])
        setSearchList([...newSearchTask])
        handleSave([...newTasks])
    }
    const handleCompletion = (id) => {
        const newTasks = tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)
        setTasks([...newTasks])
        handleSave([...newTasks])
    }
    const handleSearch = (searchKey) => {
        const newTask = tasks.filter(task => String(task.task).includes(searchKey))
        setSearchList([...newTask]);
    }
    return (
        <div className="App">
            <TaskForm handleAddingTask={handleAddingTask} />
            <TaskSearch handleSearch={handleSearch} setIsSearching={setIsSearching} />
            <TasksList tasks={isSearching ? searchList : tasks} isSearching={isSearching} handleDeletingTask={handleDeletingTask} handleCompletion={handleCompletion} />
            <Footer countTasks={tasks.length} tasks={tasks} />
        </div>
    );
}
export default ToDoList;