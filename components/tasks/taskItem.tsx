"use client"

import { useState } from "react"
import { toggleTask, deleteTask } from "@/app/actions"

interface taskItemProps {
  key: string
  id: string
  title: string
  isComplete: boolean
}

export default function TaskItem({
  key,
  id,
  title,
  isComplete,
}: taskItemProps) {
  const [checked, setChecked] = useState(isComplete)
  const [deleted, setDeleted] = useState(false)

  return (
    <li
      key={key}
      className={`flex border border-border rounded-[0.5rem] px-[1rem] py-[0.5rem] transition-all ${deleted ? "h-0 !py-0 border-0 mt-[-1rem] opacity-0 overflow-hidden" : ""}`}
    >
      <button
        onClick={() => {
          setChecked(!checked)
          toggleTask(id, isComplete)
        }}
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
            d={
              checked
                ? "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                : "M9 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            }
          />
        </svg>
      </button>
      <form className='flex-grow'>
        <input type='hidden' name='id' value={id} />
        <input
          type='text'
          name='title'
          defaultValue={title}
          className={`w-full px-[0.5rem] mx-[0.5rem] bg-container outline-none border-b border-transparent focus:border-border transition-[border-color] ${
            checked ? "line-through" : ""
          }`}
        />
      </form>
      <button
        onClick={() => {
          setDeleted(true)
          deleteTask(id)
        }}
        className='ml-[1rem]'
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
            d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
          />
        </svg>
      </button>
    </li>
  )
}
