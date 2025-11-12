import { createFileRoute } from "@tanstack/react-router"
import { useCallback, useState } from "react"
import { useAddTodo } from "~/features/todo/useAddTodo"
import { useDeleteTodo } from "~/features/todo/useDeleteTodo"
import { useTodos } from "~/features/todo/useTodos"

export let Route = createFileRoute("/")({ component: App })

function App() {
  let { data: todos } = useTodos()
  let { mutate: addTodo } = useAddTodo()
  let { mutate: removeTodo } = useDeleteTodo()
  let [todo, setTodo] = useState("")
  let submitTodo = useCallback(() => {
    addTodo({ data: todo })
    setTodo("")
  }, [addTodo, todo])
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-linear-to-br from-red-900 via-red-800 to-black p-4 text-white"
      style={{
        backgroundImage:
          "radial-gradient(50% 50% at 80% 20%, #3B021F 0%, #7B1028 60%, #1A000A 100%)",
      }}
    >
      <div className="w-full max-w-2xl rounded-xl border-8 border-black/10 bg-black/50 p-8 shadow-xl backdrop-blur-md">
        <h1 className="mb-4 text-2xl">Todos</h1>
        <ul className="mb-4 space-y-2">
          {todos.map(({ id, text }) => (
            <li
              className="flex justify-between gap-5 rounded-lg border border-white/20 bg-white/10 p-3 shadow-md backdrop-blur-sm"
              key={id}
            >
              <span className="text-lg text-white">{text}</span>
              <button
                className="text-red-500"
                onClick={() => {
                  removeTodo({ data: id })
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <form
          className="flex flex-col gap-3"
          onSubmit={e => {
            e.preventDefault()
            submitTodo()
          }}
        >
          <input
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 backdrop-blur-sm focus:border-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={e => {
              setTodo(e.target.value)
            }}
            placeholder="Enter a new todo..."
            value={todo}
          />
          <button
            className="rounded-lg bg-blue-500 px-4 py-3 font-bold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-500/50"
            disabled={todo.trim().length == 0}
            type="submit"
          >
            Add todo
          </button>
        </form>
      </div>
    </div>
  )
}
