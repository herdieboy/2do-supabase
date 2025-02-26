import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import ThemeSwitch from "@/components/themeSwitch"
import { addTask } from "@/app/actions"
import TaskList from "@/components/taskList"

export default async function PrivatePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/sign-in")
  }

  return (
    <>
      <h1 className='font-bold text-[2rem] select-none'>My to do list!</h1>
      <form action={addTask} className='flex'>
        <input
          type='text'
          name='title'
          placeholder='Add new task'
          className='border border-border border-r-0 rounded-l-[0.5rem] px-[1rem] w-full bg-container outline-none'
          required
        />
        <button
          type='submit'
          className='border border-border rounded-r-[0.5rem] px-[1rem] py-[0.5rem]'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4.5v15m7.5-7.5h-15'
            />
          </svg>
        </button>
      </form>
      <TaskList />
    </>
  )
}
