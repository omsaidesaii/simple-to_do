import tick from "./assets/tick.png";
import not_tick from "./assets/not_tick.png";
import cross from "./assets/cross.png";

const TodoItems = ({ no, display, text, setTodos, todos }) => {
  const toggle = (no) => {
    try {
      setTodos(todos.map(todo => {
        if (todo.no === no) {
          return {
            ...todo,
            display: todo.display === "" ? "line-through" : ""
          };
        }
        return todo;
      }));
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const deleteTodo = (no) => {
    try {
      setTodos(todos.filter(item => item.no !== no));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div>
      <div className="todoitems flex justify-between py-[20px] items-center">
        <div
          className="todoitems-container flex"
          onClick={() => {
            toggle(no);
          }}
        >
          {display === "" ? (
            <img src={not_tick} alt="" />
          ) : (
            <img src={tick} alt="" />
          )}

          <div className={`todoitems-text pl-[10px] text-gray-600 text-xl ${display}`}>
            {text}
          </div>
        </div>
        <img src={cross} className="cursor-pointer pr-[25px]" alt="" onClick={() => deleteTodo(no)} />
      </div>
    </div>
  );
};

export default TodoItems;
