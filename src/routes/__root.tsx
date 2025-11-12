import type { QueryClient } from "@tanstack/react-query"
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router"
import stylesheet from "../styles.css?url"

export let Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head() {
    return {
      links: [{ href: stylesheet, rel: "stylesheet" }],
      meta: [
        { charSet: "utf-8" },
        { content: "initial-scale=1, width=device-width", name: "viewport" },
        { title: "Todo App" },
      ],
    }
  },
  shellComponent({ children }) {
    return (
      <html lang="en">
        <head>
          <HeadContent />
        </head>
        <body>
          {children}
          <Scripts />
        </body>
      </html>
    )
  },
})
