import React, { useEffect, useState } from "react";

function Form() {
  const [newTask, setnewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/mars", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then(
        (data) =>
          //here is were your code should start after the fetch finishes
          setTasks(data) //this will print on the console the exact object received from the server
      )
      .catch((error) => {
        //error handling
        console.log(error);
      });
  }, []);
  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/mars", {
      method: "PUT",
      body: JSON.stringify(tasks),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      // .then(
      // 	(data) =>
      // 		//here is were your code should start after the fetch finishes
      // 		setTasks(data) //this will print on the console the exact object received from the server
      // )
      .catch((error) => {
        //error handling
        console.log(error);
      });
  }, [tasks]);
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  function addTask() {
    setTasks([...tasks, { label: newTask, done: false }]);
  }
  function deleteTask(index) {
    var delarray = [...tasks];
    delarray.splice(index, 1);
    setTasks(delarray);
  }
  const taskList = tasks.map((object, index) => {
    return (
      <div>
        <h1 className="number">
          {index + 1} {object.label}
        </h1>
        <button
          className="icon"
          onClick={() => {
            deleteTask(index);
          }}
        >
          <i class="bi bi-trash-fill"></i>
        </button>
      </div>
    );
  });
  return (
    <div className="task">
      <h1 className="title"> Simple Do To List</h1>
      <div>
        <input
          type="text"
          placeholder="Add your task"
          value={newTask}
          onChange={(e) => {
            setnewTask(e.target.value);
          }}
        ></input>
        <button onClick={addTask} className="button">
          Click me to add task
        </button>
      </div>
      {taskList}
    </div>
  );
}

export default Form;
