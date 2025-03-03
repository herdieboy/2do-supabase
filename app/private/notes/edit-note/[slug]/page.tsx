import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { editNote } from "@/app/actions"

export default async function EditNote({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/sign-in")
  }

  const { data: note, error: noteError } = await supabase
    .from("notes")
    .select()
    .eq("id", Number(slug))

  if (noteError) {
    return redirect("/not-found")
  }
  if (!note[0]) {
    return redirect("/not-found")
  }

  return (
    <>
      <h1 className='font-bold text-[2rem] text-center'>Edit note!</h1>
      <form id={slug} action={editNote} className='flex flex-col gap-[1rem]'>
        <input type='hidden' name='id' value={slug} />
        <input
          type='text'
          name='title'
          placeholder='Add new task'
          defaultValue={note[0].title}
          className='border border-border rounded-[0.5rem] px-[1rem] py-[0.5rem] w-full bg-container outline-none'
          required
        />
        <textarea
          rows={10}
          name='text'
          placeholder=''
          defaultValue={note[0].text}
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
            viewBox='0 0 23 23'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
            />
          </svg>
        </button>
      </form>
    </>
  )
}
