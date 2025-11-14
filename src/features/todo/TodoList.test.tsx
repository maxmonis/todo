import { fireEvent, render, screen, within } from "@testing-library/react"
import { expect, it, vi } from "vitest"
import { TodoList } from "./TodoList"

let mocks = vi.hoisted(() => {
  return { deleteTodo: vi.fn(), toggleTodo: vi.fn() }
})

vi.mock("./useDeleteTodo", () => {
  return {
    useDeleteTodo: vi.fn().mockReturnValue({ mutate: mocks.deleteTodo }),
  }
})
vi.mock("./useTodos", () => {
  return {
    useTodos: vi.fn().mockReturnValue({
      data: [
        { checked: false, id: "washcarid", text: "Wash car" },
        { checked: true, id: "buygroceriesid", text: "Buy groceries" },
      ],
    }),
  }
})
vi.mock("./useToggleTodo", () => {
  return {
    useToggleTodo: vi.fn().mockReturnValue({ mutate: mocks.toggleTodo }),
  }
})

it("displays todo checked state", async () => {
  render(<TodoList />)
  let todos = screen.getAllByRole("listitem")
  expect(todos).toHaveLength(2)
  expect(
    within(todos[0]!).getByLabelText("Wash car").getAttribute("aria-checked"),
  ).toBe("false")
  expect(
    within(todos[1]!)
      .getByLabelText("Buy groceries")
      .getAttribute("aria-checked"),
  ).toBe("true")
})

it("allows todo deletion", async () => {
  render(<TodoList />)
  let [one, two] = screen.getAllByRole("listitem")
  fireEvent.click(within(one!).getByRole("button", { name: "Delete" }))
  expect(mocks.deleteTodo).toHaveBeenCalledExactlyOnceWith({
    data: "washcarid",
  })
  mocks.deleteTodo.mockClear()
  fireEvent.click(within(two!).getByRole("button", { name: "Delete" }))
  expect(mocks.deleteTodo).toHaveBeenCalledExactlyOnceWith({
    data: "buygroceriesid",
  })
})

it("allows todo toggling", async () => {
  render(<TodoList />)
  let [one, two] = screen.getAllByRole("listitem")
  fireEvent.click(within(one!).getByLabelText("Wash car"))
  expect(mocks.toggleTodo).toHaveBeenCalledExactlyOnceWith({
    data: "washcarid",
  })
  mocks.toggleTodo.mockClear()
  fireEvent.click(within(two!).getByLabelText("Buy groceries"))
  expect(mocks.toggleTodo).toHaveBeenCalledExactlyOnceWith({
    data: "buygroceriesid",
  })
})
