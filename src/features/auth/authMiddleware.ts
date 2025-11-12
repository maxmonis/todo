import { createMiddleware } from "@tanstack/react-start"
import { isValidObjectId } from "mongoose"
import { decrypt } from "~/server/jose"

export let authMiddleware = createMiddleware({ type: "function" })
  .client(({ next }) => {
    let token = localStorage.getItem("token")
    if (!token) throw "Not authorized"
    return next({ sendContext: { token } })
  })
  .server(async ({ context: { token }, next }) => {
    try {
      let { userId } = await decrypt(token)
      if (typeof userId != "string" || !isValidObjectId(userId))
        throw "Not authorized"
      return next({ sendContext: { userId } })
    } catch (error) {
      throw "Not authorized"
    }
  })
