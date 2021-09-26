import * as React from "react";

export interface Todo {
	id: string;
	title: string;
	completed: boolean;
}

export type Action =
	| { type: "add"; payload: Todo }
	| { type: "addAll"; payload: Todo[] }
	| { type: "update"; payload: Todo }
	| { type: "delete"; payload: string };
type Dispatch = (action: Action) => void;
type State = { todos: Todo[] };
type TodosProviderProps = { children: React.ReactNode };

const TodosContext = React.createContext<
	{ state: State; dispatch: Dispatch } | undefined
>(undefined);
TodosContext.displayName = "TodosContext";

function todosReducer(state: State, action: Action) {
	const { type, payload } = action;
	switch (type) {
		case "addAll": {
			return { ...state, todos: payload as Todo[] };
		}
		case "add": {
			const copyOfTodos = [...state.todos];
			copyOfTodos.push(payload as Todo);
			return { ...state, todos: copyOfTodos };
		}
		case "update": {
			const updatedTodo = payload as Todo;
			const copyOfTodos = [...state.todos];
			const updatedTodos = copyOfTodos.map((todo) =>
				todo.id === updatedTodo.id ? updatedTodo : todo
			);
			return { ...state, todos: updatedTodos };
		}
		case "delete": {
			const copyOfTodos = [...state.todos];
			const updatedTodos = copyOfTodos.filter((todo) => todo.id !== payload);
			return { ...state, todos: updatedTodos };
		}
	}
}

function TodosProvider({ children }: TodosProviderProps) {
	const [state, dispatch] = React.useReducer(todosReducer, { todos: [] });

	const value = { state, dispatch };
	return (
		<TodosContext.Provider value={value}>{children}</TodosContext.Provider>
	);
}

function useTodos() {
	const context = React.useContext(TodosContext);
	if (context === undefined) {
		throw new Error("useTodos must be used within a TodosProvider");
	}
	return context;
}
export { TodosProvider, useTodos };
