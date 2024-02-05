import { useState } from "react";

export default function AddTask() {
  const [newTitle, setNewTitle] = useState("");
  const [check, setCheck] = useState(false);
  console.log(newTitle);
  console.log(check);
  function handleNewTodo() {
    return <></>;
  }
  const time = new Date();
  const currTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const currDate = time.toLocaleDateString();
  return (
    <div className="flex items-center justify-center">
      <form
        className=" p-5  mx-auto my-auto rounded-lg overflow-hidden shadow-lg flex flex-col bg-gray-200 relative"
        onSubmit={handleNewTodo}
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
            <option value="false">incomplete</option>
            <option value="true">Complete</option>
          </select>
        </label>
        <div className="flex justify-around p-4">
          <button
            className="text-white bg-violet-600 w-28 rounded-lg py-2 "
            onClick={handleNewTodo}
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
