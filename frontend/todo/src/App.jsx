import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [dbdata, setdbdata] = useState([]);
  const [newTask, setnewTask] = useState("");
  const [editView, seteditView] = useState(false);
  const [eid, seteid] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await axios.get("http://localhost:3001/");
    setdbdata(response.data);
  }

  async function createTask() {
    await axios.post("http://localhost:3001/", { task: newTask });
  }

  async function deleteTask(id) {
    await axios.delete("http://localhost:3001/", { data: { _id: id } });
    setnewTask("");
    getData();
  }

  async function editTask() {
    console.log(eid);
    await axios.put(`http://localhost:3001/?id=${eid}`, { task: newTask });
    setnewTask("");
    getData();
    seteditView(false);
  }

  function switchView(id) {
    console.log(id);
    seteid(id);
    seteditView(true);
  }

  let tasks = dbdata.map((item) => (
    <div>
      {item.task}
      <button onClick={() => switchView(item._id)}>Edit</button>
      <button onClick={() => deleteTask(item._id)} type="submit">
        Delete
      </button>
    </div>
  ));

  let editorView = (
    <div>
      Enter new task:{" "}
      <input
        onChange={() => {
          setnewTask(event.target.value);
        }}
      ></input>
      <button type="submit" onClick={() => editTask()}>
        Save
      </button>
    </div>
  );

  let normalView = (
    <div className="App">
      <form>
        <label>
          Task:{" "}
          <input
            onChange={() => {
              setnewTask(event.target.value);
            }}
          ></input>
        </label>
        <button
          onClick={() => {
            createTask();
            setnewTask("");
          }}
          type="submit"
        >
          Create Task
        </button>
      </form>
      {tasks}
    </div>
  );

  return <div>{editView ? editorView : normalView}</div>;
}

export default App;
