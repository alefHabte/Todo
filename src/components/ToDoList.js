import { useState } from "react";
import Popup from "reactjs-popup";
import AddTask from "./AddTask";
const prevTasks = [
  { title: "task1", status: "complete", time: "03:03", date: "1/31/2024" },
  { title: "task2", status: "incomplete", time: "03:03", date: "1/31/2024" },
  { title: "task3", status: "complete", time: "03:03", date: "1/31/2024" },
];
function taskList() {
  return (
    <div>
      {prevTasks.map((task) => (
        <Task task={task} />
      ))}
    </div>
  );
}
function Task({ task }) {
  return <></>;
}
export default function TODO() {
  const [task, useTask] = useState(prevTasks);
  const time = new Date();
  const currTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const currDate = time.toLocaleDateString();
  return (
    <div className="w-1/2 p-4 mx-auto my-5 text-center border">
      <h1 className="text-gray-600 text-4xl font-bold">TODO LIST</h1>
      <div className="flex justify-between p-5">
        <Popup
          trigger={
            <button className="bg-violet-500 px-5 py-1 rounded-lg text-white">
              Add Task
            </button>
          }
        >
          <AddTask />
        </Popup>
        <select className="bg-gray-200 rounded-lg px-5">
          <option>All</option>
          <option>complete</option>
          <option>incomplete</option>
        </select>
      </div>
      <div className="bg-violet-100  flex flex-col space-y-4 py-3 rounded-lg">
        <div className="w-11/12 mx-auto bg-white flex justify-between center items-center rounded-sm">
          <div className="flex ">
            <div className="flex items-center p-3 ">
              <input
                type="checkbox"
                className="size-6  rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div className="my-2">
              <label className=" flex text-sm font-medium">{task.title}</label>
              <p className="text-sm">
                {currTime},{currDate}
              </p>
            </div>
          </div>
          <div className="flex space-x-4 px-3">
            <button className="bg-slate-200 p-2 rounded-lg">🗑️</button>
            <button className="bg-slate-200 p-2 rounded-lg">✍️</button>
          </div>
        </div>
      </div>
    </div>
  );
}
