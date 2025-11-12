import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createServerFn } from "@tanstack/react-start"
import { isValidObjectId } from "mongoose"
import z from "zod"
import { db } from "~/server/mongoose"
import { useTodos } from "./useTodos"

export function useDeleteTodo() {
  let queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess(id) {
      queryClient.setQueryData(
        ["todos"],
        (oldTodos: ReturnType<typeof useTodos>["data"]) => {
          return oldTodos.filter(t => t.id != id)
        },
      )
    },
  })
}

let deleteTodo = createServerFn({ method: "POST" })
  .inputValidator(z.string().refine(id => isValidObjectId(id)))
  .handler(async ({ data: id }) => {
    let doc = await db.Todo.findByIdAndDelete(id)
    if (!doc) throw "Not found"
    return doc._id.toString()
  })
