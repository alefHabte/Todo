import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const prevTasks = [
  { title: "task1", check: true, time: "03:03", date: "1/31/2024", id: "01" },
  { title: "task2", check: false, time: "03:02", date: "1/31/2024", id: "02" },
  { title: "task3", check: true, time: "03:01", date: "1/31/2094", id: "03" },
];
export default function TODO() {
  const [Todo, setTodo] = useState(prevTasks);
  const [showModule, setShowModule] = useState(false);
  function handelAddTodo(newTodo) {
    setTodo((Tasks) => [...Tasks, newTodo]);
  }
  function handelDeleteTodo(id) {
    setTodo(Todo.filter((Tasks) => Tasks.id !== id));
  }
  function handelToggle(id) {
    setTodo(
      Todo.map((task) =>
        task.id === id ? { ...task, check: !task.check } : task
      )
    );
  }
  function handelEdit() {
    // setShowEdit(!showEdit);
    // showEdit && console.log("out");
  }

  return (
    <div className="w-1/2 p-4 mx-auto my-5 text-center border">
      <h1 className="text-gray-600 text-4xl font-bold">TODO LIST</h1>
      <div className="flex justify-between p-5">
        {/* {addToggle && <NewTask onSubmit={handelAddTodo} />} */}
        <Popup
          trigger={
            <button className="bg-violet-500 px-5 py-1 rounded-lg text-white">
              Add Task
            </button>
          }
        >
          <NewTask onSubmit={handelAddTodo} />
        </Popup>

        <select className="bg-gray-200 rounded-lg px-5">
          <option>All</option>
          <option>complete</option>
          <option>incomplete</option>
        </select>
      </div>
      <TaskList
        Todo={Todo}
        onDelete={handelDeleteTodo}
        onToggle={handelToggle}
        onEdit={handelEdit}
      />
    </div>
  );
}
function ModalComp({ open }) {
  return (
    <div
      className={`flex justify-center items-center transition-colors${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      {/* <div
        className={`bg-white rounded-lg shadow p-6 transition-all max-w-md${
          open ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
      ></div> */}
      <NewTask />
    </div>
  );
}
function TaskList({ Todo, onDelete, onToggle, onEdit }) {
  return (
    <div className="bg-violet-100  flex flex-col space-y-4 py-3 rounded-lg">
      {Todo.map((task) => (
        <Task
          task={task}
          key={task.id}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
function Task({ task, onDelete, onToggle, onEdit }) {
  return (
    <div className="w-11/12 mx-auto bg-white flex justify-between center items-center rounded-sm">
      <div className="flex ">
        <div className="flex items-center p-3 ">
          <input
            type="checkbox"
            className={`size-6  rounded border-gray-300  focus:ring-indigo-600 checked:text-indigo-600`}
            checked={Boolean(task.check)}
            onChange={() => onToggle(task.id)}
          />
        </div>
        <div className="my-2">
          <label
            className={`flex text-sm font-medium ${
              task.check ? "line-through" : ""
            }`}
          >
            {task.title}
          </label>
          <p className={`text-sm ${task.check ? "line-through" : ""}`}>
            {task.time},{task.date}
          </p>
        </div>
      </div>
      <div className="flex space-x-4 px-3">
        <button
          className="bg-slate-200 p-2 rounded-lg"
          onClick={() => onDelete(task.id)}
        >
          🗑️
        </button>
        <button className="bg-slate-200 p-2 rounded-lg" onClick={onEdit}>
          ✍️
        </button>
      </div>
    </div>
  );
}
function NewTask({ onSubmit }) {
  const time = new Date();
  const currTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const currDate = time.toLocaleDateString();
  const [newTitle, setNewTitle] = useState("");
  const [check, setCheck] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    if (!newTitle) return;
    const id = crypto.randomUUID();
    const newTodo = {
      id,
      title: newTitle,
      check: check,
      date: currDate,
      time: currTime,
    };
    console.log(newTodo);
    onSubmit(newTodo);
    setNewTitle("");
    setCheck(false);
  }

  return (
    <div className="flex items-center justify-center">
      <form
        className="p-5  mx-auto my-auto rounded-lg overflow-hidden shadow-lg flex flex-col bg-gray-200 relative"
        onSubmit={handleSubmit}
      >
        <button className="absolute top-0 right-0 bg-red-700 text-white w-7 h-7 m-2 rounded-full">
          X
        </button>

        <h1 className="font-bold text-xl mb-2 text-gray-700 pb-3">Add TODO</h1>
        <label className="text-gray-700">
          Title
          <input
            type="text"
            className="rounded-sm h-10"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </label>

        <label className="text-gray-700">
          Status
          <select
            className="rounded-sm h-10"
            value={check}
            onChange={(e) => setCheck(e.target.value)}
          >
            <option value={false}>incomplete</option>
            <option value={true}>Complete</option>
          </select>
        </label>
        <div className="flex justify-around p-4">
          <button
            className="text-white bg-violet-600 w-28 rounded-lg py-2 "
            // onClick={() => handleSubmit(newTodo)}
          >
            Add Task
          </button>
          <button className="text-gray-700 bg-gray-300 w-28 rounded-lg py-2">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
