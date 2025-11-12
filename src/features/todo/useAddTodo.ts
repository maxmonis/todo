import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createServerFn } from "@tanstack/react-start"
import z from "zod"
import { db } from "~/server/mongoose"
import { useTodos } from "./useTodos"

export function useAddTodo() {
  let queryClient = useQueryClient()
  return useMutation({
    mutationFn: addTodo,
    onSuccess(newTodo) {
      queryClient.setQueryData(
        ["todos"],
        (oldTodos: ReturnType<typeof useTodos>["data"]) => {
          return [...oldTodos, newTodo]
        },
      )
    },
  })
}

let addTodo = createServerFn({ method: "POST" })
  .inputValidator(z.string().min(1))
  .handler(async ({ data: text }) => {
    let doc = await db.Todo.create({ text })
    return { id: doc._id.toString(), text: doc.text }
  })
