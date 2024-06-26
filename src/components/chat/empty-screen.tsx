
export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">
          Welcome to Connect Bot!
        </h1>
        <p className="leading-normal text-muted-foreground">
          A powerful chatbot that can help you with your daily tasks.
        </p>
        <p className="leading-normal text-muted-foreground">
          If you have any questions about the application feel free to ask.
        </p>
      </div>
    </div>
  )
}
