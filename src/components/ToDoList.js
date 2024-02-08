import { useState } from "react";

const prevTasks = [
  { title: "task1", check: true, time: "03:03", date: "1/31/2024", id: "01" },
  { title: "task2", check: false, time: "03:02", date: "1/31/2024", id: "02" },
  { title: "task3", check: true, time: "03:01", date: "1/31/2094", id: "03" },
];
export default function TODO() {
  const [Todo, setTodo] = useState(prevTasks);
  const [showModule, setShowModule] = useState(false);
  const [updateTask, setUpdateTask] = useState(null);
  const [showFilter, setShowFilter] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState(Todo);
  function handelAddTodo(newTodo) {
    if (updateTask) {
      setTodo(
        Todo.map((task) =>
          task.id === newTodo.id ? { ...task, ...newTodo } : task
        )
      );
      setUpdateTask(null); // Reset updateTask after updating
    } else {
      setTodo((prevTodo) => [...prevTodo, newTodo]);
    }
    setShowModule(false);
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
  function handelModule() {
    setShowModule(!showModule);
  }
  function handelEdit(id) {
    const taskToUpdate = Todo.find((task) => task.id === id);
    setShowModule(!showModule);
    setUpdateTask(taskToUpdate);
  }
  function handelFilter(e) {
    const filterValue = e.target.value;
    setShowFilter(filterValue);
    let filteredTasks = [];

    if (filterValue === "complete") {
      filteredTasks = Todo.filter((task) => task.check === true);
    } else if (filterValue === "incomplete") {
      filteredTasks = Todo.filter((task) => task.check === false);
    } else {
      filteredTasks = Todo; // Show all tasks if "all" is selected
    }

    setFilteredTasks(filteredTasks);
  }

  return (
    <div className="w-1/2 p-4 mx-auto my-5 text-center border">
      <h1 className="text-gray-600 text-4xl font-bold">TODO LIST</h1>
      <div className="flex justify-between p-5">
        <button
          className="bg-violet-500 px-5 py-1 rounded-lg text-white"
          onClick={() => setShowModule(true)}
        >
          Add Task
        </button>

        <select
          className="bg-gray-200 rounded-lg px-5"
          value={showFilter}
          onChange={handelFilter}
        >
          <option value="all">All</option>
          <option value="complete">complete</option>
          <option value="incomplete">incomplete</option>
        </select>
      </div>
      <TaskList
        filteredTasks={filteredTasks}
        Todo={Todo}
        onDelete={handelDeleteTodo}
        onToggle={handelToggle}
        onEdit={handelEdit}
      />
      {showModule && (
        <ModalComp
          onSubmit={handelAddTodo}
          onCancel={handelModule}
          onUpdate={updateTask}
        />
      )}
    </div>
  );
}
function ModalComp({ onSubmit, onCancel, onUpdate }) {
  return (
    <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center bg-black">
      <div>
        <NewTask onSubmit={onSubmit} onCancel={onCancel} onUpdate={onUpdate} />
      </div>
    </div>
  );
}
function TaskList({ Todo, onDelete, onToggle, onEdit, filteredTasks }) {
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
            checked={task.check}
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
          <p className={`flex text-sm ${task.check ? "line-through" : ""}`}>
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
        <button
          className="bg-slate-200 p-2 rounded-lg"
          onClick={() => onEdit(task.id)}
        >
          ✍️
        </button>
      </div>
    </div>
  );
}

function NewTask({ onSubmit, onCancel, onUpdate }) {
  const time = new Date();
  const currTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const currDate = time.toLocaleDateString();
  const [newTitle, setNewTitle] = useState(onUpdate ? onUpdate.title : "");
  const [check, setCheck] = useState(onUpdate ? onUpdate.check : false);
  function handleSubmit(e) {
    e.preventDefault();
    if (!newTitle) return;
    const id = onUpdate ? onUpdate.id : crypto.randomUUID();
    const updatedTodo = {
      id,
      title: newTitle,
      check: check === "true",
      date: currDate,
      time: currTime,
    };
    setNewTitle("");
    setCheck("false");
    onSubmit(updatedTodo);
    console.log(onUpdate);
  }
  return (
    <div>
      <form
        className="p-10 rounded-lg shadow-lg flex flex-col bg-gray-200 relative"
        onSubmit={handleSubmit}
      >
        <button
          className="absolute top-0 right-0 bg-red-700 text-white w-7 h-7 m-2 rounded-full"
          onClick={onCancel}
        >
          X
        </button>

        <h1 className="font-bold text-xl mb-2 text-gray-700 pb-3">
          {" "}
          {onUpdate ? "Update TODO" : "Add TODO"}
        </h1>
        <label className="text-gray-700">
          Title{"  "}
          <input
            type="text"
            className="rounded-sm h-10 indent-3"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </label>

        <label className="text-gray-700 p-4">
          Status{"  "}
          <select
            className="rounded-sm h-10 w-48 indent-2"
            value={check}
            onChange={(e) => setCheck(e.target.value)}
          >
            <option value="false">No done Yet</option>
            <option value="true">Finished</option>
          </select>
        </label>
        <div className="flex space-x-5 p-4">
          <button className="text-white bg-violet-600 w-28 rounded-lg py-2 ">
            {onUpdate ? "Update Task" : "Add Task"}
          </button>
          <button
            className="text-gray-700 bg-gray-300 w-28 rounded-lg "
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
