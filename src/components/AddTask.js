export default function AddTask() {
  return (
    <div className="flex items-center justify-center">
      <div className=" p-5  mx-auto my-auto rounded-lg overflow-hidden shadow-lg flex flex-col bg-gray-200 relative">
        <button className="absolute top-0 right-0 bg-red-700 text-white w-7 h-7 m-2 rounded-full">
          X
        </button>

        <h1 className="font-bold text-xl mb-2 text-gray-700 pb-3">Add TODO</h1>
        <label className="text-gray-700">Title</label>
        <input type="text" className="rounded-sm h-10"></input>
        <label className="text-gray-700">Status</label>
        <select className="rounded-sm h-10">
          <option>incomplete</option>
          <option>Complete</option>
        </select>
        <div className="flex justify-around p-4">
          <button className="text-white bg-violet-600 w-28 rounded-lg py-2 ">
            Add Task
          </button>
          <button className="text-gray-700 bg-gray-300 w-28 rounded-lg py-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
