import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { addNote } from "@/app/actions"

export default async function AddNote() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/sign-in")
  }

  return (
    <>
      <h1 className='font-bold text-[2rem] text-center'>Add note!</h1>
      <form action={addNote} className='flex flex-col gap-[1rem]'>
        <input
          type='text'
          name='title'
          placeholder='Add new task'
          className='border border-border rounded-[0.5rem] px-[1rem] py-[0.5rem] w-full bg-container outline-none'
          required
        />
        <textarea
          rows={10}
          name='text'
          placeholder=''
          className='border border-border rounded-[0.5rem] px-[1rem] py-[0.5rem] w-full bg-container outline-none'
          required
        ></textarea>
        <button
          type='submit'
          className='w-full flex justify-between border border-border rounded-[0.5rem] px-[1rem] py-[0.5rem] bg-text text-background'
        >
          Save note
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
    </>
  )
}
