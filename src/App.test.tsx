import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { TodosProvider } from "./context/TodosContext";

const setup = async () => {
  render(
    <TodosProvider>
      <App />
    </TodosProvider>
  );
  return waitFor(() => {
    expect(screen.getAllByTestId("todo-item")).toHaveLength(3);
  });
};

test("should create a todo", async () => {
  await setup();
  const addTodoTextbox = screen.getByPlaceholderText(/Add your todo/i);
  addTodoTextbox.focus();
  fireEvent.change(addTodoTextbox, {
    target: { value: "New todo" },
  });
  fireEvent.keyDown(addTodoTextbox, {
    key: "Enter",
  });
  await waitFor(() => {
    expect(screen.getAllByTestId("todo-item")).toHaveLength(4);
  });
});

test("should complete a todo", async () => {
  await setup();
  expect(screen.getByText(/0 completed/i)).toBeInTheDocument();
  fireEvent.click(screen.getAllByTestId("checkbox-span")[0]);
  await waitFor(() =>
    expect(screen.getByText(/1 completed/i)).toBeInTheDocument()
  );
});

test("should edit a todo's title", async () => {
  await setup();
  fireEvent.click(screen.getAllByAltText(/Task Options/i)[0]);
  fireEvent.click(screen.getByText(/edit/i));
  fireEvent.change(screen.getByDisplayValue(/buy food for dinner/i), {
    target: { value: "Buy food for lunch" },
  });
  fireEvent.click(screen.getByRole("button", { name: /save/i }));
  await waitFor(() =>
    expect(screen.getByText(/buy food for lunch/i)).toBeInTheDocument()
  );
});

test("should delete a todo", async () => {
  await setup();
  fireEvent.click(screen.getAllByAltText(/Task Options/i)[0]);
  fireEvent.click(screen.getByText(/delete/i));
  await waitFor(() => {
    expect(screen.getAllByTestId("todo-item")).toHaveLength(2);
  });
});
