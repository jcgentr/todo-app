import { useEffect, useState } from "react";
import { Progress } from "./components/Progress";
import { TodoItem } from "./components/TodoItem";
import { ViewOptions } from "./components/ViewOptions";
import { Todo, useTodos } from "./context/TodosContext";

export const API_URL = `http://localhost:3001`;

export enum ViewOptionsEnum {
  ALL = "All",
  DONE = "Done",
  UNDONE = "Undone",
}

function App() {
  const { state, dispatch } = useTodos();
  const [view, setView] = useState<ViewOptionsEnum>(ViewOptionsEnum.ALL);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_URL}/todos`);
      const todos: Todo[] = await response.json();
      dispatch({ type: "addAll", payload: todos });
    };

    fetchData();
  }, [dispatch]);

  const handleKeyDown = async (event: any) => {
    if (event.key === "Enter") {
      if (!event.target.value) return;
      const data: Partial<Todo> = {
        title: event.target.value,
        completed: false,
      };
      event.target.value = "";
      const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const todo = await response.json();
      dispatch({ type: "add", payload: todo });
    }
  };

  const completedTodos = state.todos.filter((todo) => todo.completed === true);
  const filteredTodos =
    view === ViewOptionsEnum.DONE
      ? completedTodos
      : view === ViewOptionsEnum.UNDONE
      ? state.todos.filter((todo) => todo.completed === false)
      : state.todos;

  return (
    <div className="root-container">
      <Progress completed={completedTodos.length} total={state.todos.length} />
      <div className="task-header">
        <h2>Tasks</h2>
        <ViewOptions view={view} setView={setView} />
      </div>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
      ))}
      <div className="todo-container">
        <input
          type="text"
          placeholder="Add your todo..."
          id="txtbox"
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default App;
