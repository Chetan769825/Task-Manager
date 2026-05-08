import React, { useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";

const TodoListInput = ({ todoList = [], setTodoList }) => {
  const [option, setOption] = useState("");

  const handleAddOption = () => {
    if (option.trim()) {
      setTodoList([...(todoList || []), option.trim()]);
      setOption("");
    }
  };

  const handleDeleteOption = (index) => {
    const updatedArr = (todoList || []).filter((_, idx) => idx !== index);
    setTodoList(updatedArr);
  };

  return (
    <div className="space-y-3">

      {/* LIST */}
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">

        {todoList.map((item, index) => (
          <div
            key={item + index}
            className="
              flex items-center justify-between
              px-3 py-2 rounded-xl
              bg-white/5 border border-white/10
              backdrop-blur-xl
              hover:border-indigo-400/20 transition
            "
          >
            <div className="flex items-center gap-2">

              <span className="
                text-[10px] px-2 py-0.5 rounded-full
                bg-indigo-500/10 text-indigo-300 border border-indigo-400/20
              ">
                {index < 9 ? `0${index + 1}` : index + 1}
              </span>

              <p className="text-sm text-gray-200 line-clamp-1">
                {item}
              </p>

            </div>

            <button
              onClick={() => handleDeleteOption(index)}
              className="p-1 rounded-lg hover:bg-red-500/10 transition"
            >
              <HiOutlineTrash className="text-red-400 text-lg" />
            </button>

          </div>
        ))}

      </div>

      {/* INPUT BAR */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddOption();
        }}
        className="
          flex items-center gap-2
          p-2 rounded-xl
          bg-white/5 border border-white/10
          backdrop-blur-xl
        "
      >

        <input
          type="text"
          placeholder="Add new task step..."
          value={option}
          onChange={({ target }) => setOption(target.value)}
          className="
            flex-1 bg-transparent outline-none
            text-sm text-white placeholder-gray-500
            px-2
          "
        />

        <button
          type="submit"
          className="
            flex items-center gap-1 px-3 py-1.5 rounded-lg
            bg-indigo-500/20 border border-indigo-400/20
            text-indigo-200 hover:bg-indigo-500/30 transition
          "
        >
          <HiMiniPlus className="text-lg" />
          Add
        </button>

      </form>

    </div>
  );
};

export default TodoListInput;