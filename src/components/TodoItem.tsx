import { useState } from "react";
import { API_URL } from "../App";
import { Action, Todo } from "../context/TodosContext";
import Dots from "../images/dots.svg";
import { EditDeleteOptions } from "./EditDeleteOptions";

const editTodo = async (id: string, data: Partial<Todo>) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export enum TaskOptions {
  EDIT = "Edit",
  DELETE = "Delete",
}

interface TodoProps {
  todo: Todo;
  dispatch: (action: Action) => void;
}

export const TodoItem = ({ todo, dispatch }: TodoProps) => {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleCheckboxClick = async () => {
    const data: Partial<Todo> = {
      completed: !todo.completed,
    };
    const updatedTodo = await editTodo(todo.id, data);
    dispatch({ type: "update", payload: updatedTodo });
  };

  const handleOptionClick = async (optionClicked: string) => {
    if (optionClicked === TaskOptions.EDIT) {
      setEdit(true);
    } else if (optionClicked === TaskOptions.DELETE) {
      const response = await fetch(`${API_URL}/todos/${todo.id}`, {
        method: "DELETE",
      });
      await response.json();
      dispatch({ type: "delete", payload: todo.id });
    }
    setShow(false);
  };

  const handleEditSave = async () => {
    const data: Partial<Todo> = {
      title: editTitle,
    };
    const updatedTodo = await editTodo(todo.id, data);
    dispatch({ type: "update", payload: updatedTodo });
    setEdit(false);
  };

  const textClass = todo.completed ? "strikethrough" : "";

  return (
    <div className="todo-container" data-testid="todo-item">
      {edit ? (
        <>
          <div className="edit-todo-title">
            <input
              autoFocus
              type="text"
              id="todoItem"
              name="todoItem"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </div>
          <button
            disabled={editTitle.length === 0}
            onClick={handleEditSave}
            className="save-button"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <div>
            <label
              htmlFor="todoItem"
              className={`${textClass} checkbox-container`}
            >
              {" "}
              {todo.title}
              <input
                type="checkbox"
                id="todoItem"
                name="todoItem"
                value={todo.title}
                checked={todo.completed}
                onChange={() => {}}
              />
              <span
                data-testid="checkbox-span"
                className="checkmark"
                onClick={handleCheckboxClick}
              ></span>
            </label>
          </div>
          <div className="task-options-container">
            <img src={Dots} alt="Task Options" onClick={() => setShow(!show)} />
            {show && <EditDeleteOptions handleClick={handleOptionClick} />}
          </div>
        </>
      )}
    </div>
  );
};
