export function ErrorComponent({
  error,
  reset,
}: {
  error: unknown
  reset: () => void
}) {
  let message =
    error instanceof Error
      ? error.message
      : typeof error == "string"
        ? error
        : "Something went wrong"

  return (
    <div>
      <h1 className="mb-3 text-2xl">Error</h1>
      <p>{message}</p>
      <button className="mt-3 rounded-lg border px-3 py-1" onClick={reset}>
        Try Again
      </button>
    </div>
  )
}
