import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { deleteNote } from "@/app/actions"
import { DeleteButton } from "@/components/ui/ui"
import Link from "next/link"

export default async function Note({
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
      <h1 className='font-bold text-[2rem]'>{note[0].title}</h1>
      <p>{note[0].text}</p>
      <div className='flex gap-[1rem]'>
        <button
          type='submit'
          className='w-full flex justify-between border border-border rounded-[0.5rem] px-[1rem] py-[0.5rem]'
        >
          <Link
            href={`/private/notes/edit-note/${slug}`}
            className='w-full flex justify-between'
          >
            Edit note
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
          </Link>
        </button>
        <DeleteButton
          className='w-full flex justify-between border border-border rounded-[0.5rem] px-[1rem] py-[0.5rem]'
          id={slug}
        >
          Delete note
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
              d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
            />
          </svg>
        </DeleteButton>
      </div>
    </>
  )
}
