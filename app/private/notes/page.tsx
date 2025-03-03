import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import NoteList from "@/components/notes/noteList"
import Link from "next/link"

export default async function Notes() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/sign-in")
  }

  return (
    <>
      <h1 className='font-bold text-[2rem] select-none text-center'>
        My notes!
      </h1>
      <div className='flex justify-between border border-border bg-text text-background rounded-[0.5rem] px-[1rem] py-[0.5rem]'>
        <Link
          href={`/private/notes/add-note`}
          className='flex justify-between w-full'
        >
          <h2>Add note</h2>
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
        </Link>
      </div>
      <NoteList />
    </>
  )
}
