"use server"

import { createClient } from "@/utils/supabase/server"
import Link from "next/link"

export default async function NoteList() {
  const supabase = await createClient()

  const { data: notes, error: notesError } = await supabase
    .from("notes")
    .select("*")
    .order("id", { ascending: true })

  if (notesError) {
    console.error("Error fetching todos:", notesError)
    return <div>Error loading notes.</div>
  }

  if (!notes || notes.length === 0) {
    return <div>No notes yet!</div>
  }

  return (
    <ul className='flex flex-col gap-[1rem] w-full'>
      {notes.map((note) => (
        <div
          key={note.id}
          id={note.id}
          className='flex justify-between border border-border rounded-[0.5rem] px-[1rem] py-[0.5rem]'
        >
          <Link
            href={`/private/notes/${note.id}`}
            className='flex justify-between w-full'
          >
            <h2>{note.title}</h2>
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
                d='m8.25 4.5 7.5 7.5-7.5 7.5'
              />
            </svg>
          </Link>
        </div>
      ))}
    </ul>
  )
}
