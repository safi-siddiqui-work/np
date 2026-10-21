import { CreateTodo } from "./_private/create-todo";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-medium">TODO APP</h2>

        <CreateTodo />
      </div>
    </div>
  );
}
