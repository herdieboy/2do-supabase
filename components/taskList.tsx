"use server"

import { createClient } from "@/utils/supabase/server"
import TaskItem from "@/components/taskItem"

export default async function TaskList() {
  const supabase = await createClient()

  const { data: todos, error: todosError } = await supabase
    .from("todos")
    .select("*")
    .order("id", { ascending: false })

  if (todosError) {
    console.error("Error fetching todos:", todosError)
    return <div>Error loading tasks.</div>
  }

  if (!todos || todos.length === 0) {
    return <div>No tasks yet!</div>
  }

  return (
    <ul className='flex flex-col gap-[1rem]'>
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
