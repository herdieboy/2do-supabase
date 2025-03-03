"use server"

import { createClient } from "@/utils/supabase/server"
import TaskItem from "@/components/tasks/taskItem"

export default async function TaskList() {
  const supabase = await createClient()

  const { data: todos, error: todosError } = await supabase
    .from("todos")
    .select("*")
    .order("id", { ascending: true })

  if (todosError) {
    console.error("Error fetching todos:", todosError)
    return <div>Error loading tasks.</div>
  }

  if (!todos || todos.length === 0) {
    return <div>No tasks yet!</div>
  }

  return (
    <ul className='flex flex-col gap-[1rem] w-full'>
      {todos.map((todo) => (
        <TaskItem
          key={todo.id}
          id={todo.id}
          title={todo.task}
          isComplete={todo.is_complete}
        />
      ))}
    </ul>
  )
}
