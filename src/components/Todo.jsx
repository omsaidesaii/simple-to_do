import { useRef, useState, useEffect } from "react";
import TodoItems from "./TodoItems";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
    }
  }, [key, value]);

  return [value, setValue];
};

const Todo = () => {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [count, setCount] = useLocalStorage("todos_count", 0);
  const inputRef = useRef(null);

  const add = () => {
    try {
      const value = inputRef.current.value.trim();
      if (!value) return;
      
      const newTodo = { no: count, text: value, display: "" };
      setTodos([...todos, newTodo]);
      setCount(count + 1);
      inputRef.current.value = "";
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      add();
    }
  };


  return (
    <div className="todo w-[500px] min-h-[500px] rounded-2xl bg-white m-auto mt-[100px] flex flex-col px-[44px] pb-[30px] mb-[100px]">
      <div className="todo-header mt-[30px] text-blue-950 text-[35px]/[34px] font-bold ">
        To-Do List
      </div>
      <div className="todo-add flex justify-center items-center mt-[15px]">
        <input
          type="text"
          className="todo-input  rounded-full bg-[#edeef0] border-0 w-[420px] outline-0 h-[50px] pl-[30px] text-xl"
          ref={inputRef}
          placeholder="Add Your Task"
          onKeyPress={handleKeyPress}
        />
        <div
          className="todo-add-btn rounded-full bg-orange-400 w-[100px] font-bold cursor-pointer transition-all h-[50px] flex justify-center items-center ml-[-100px] text-white text-xl"
          onClick={() => {
            add();
          }}
        >
          ADD
        </div>
      </div>
      <div className="todo-list">
        {todos.map((item, index) => {
          return (
            <TodoItems
              key={index}
              setTodos={setTodos}
              todos={todos}
              no={item.no}
              display={item.display}
              text={item.text}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
