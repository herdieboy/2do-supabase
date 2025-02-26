"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import Image from "next/image"

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  const placeholderIcon = (
    <Image
      src='data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=='
      width={36}
      height={36}
      sizes='36x36'
      alt='Loading Light/Dark Toggle'
      priority={false}
      title='Loading Light/Dark Toggle'
    />
  )

  const icon = (
    <svg
      width='22'
      height='22'
      viewBox='0 0 22 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d={
          resolvedTheme === "light"
            ? "M11 15C13.2091 15 15 13.2091 15 11C15 8.79086 13.2091 7 11 7C8.79086 7 7 8.79086 7 11C7 13.2091 8.79086 15 11 15Z"
            : "M11 1C9.74605 2.34049 9.06216 4.11585 9.09276 5.95117C9.12336 7.78648 9.86605 9.53806 11.164 10.836C12.4619 12.1339 14.2135 12.8766 16.0488 12.9072C17.8841 12.9378 19.6595 12.254 21 11C21 12.9778 20.4135 14.9112 19.3147 16.5557C18.2159 18.2002 16.6541 19.4819 14.8268 20.2388C12.9996 20.9957 10.9889 21.1937 9.0491 20.8078C7.10929 20.422 5.32746 19.4696 3.92894 18.0711C2.53041 16.6725 1.578 14.8907 1.19215 12.9509C0.8063 11.0111 1.00433 9.00042 1.76121 7.17316C2.51809 5.3459 3.79981 3.78412 5.4443 2.6853C7.08879 1.58649 9.02219 1 11 1Z"
        }
        stroke='currentColor'
        className=''
      />
      <g
        stroke='currentColor'
        className={` ${
          resolvedTheme === "light" ? "opacity-100" : "opacity-0"
        }`}
      >
        <path d='M11 1V3' />
        <path d='M11 19V21' />
        <path d='M3.93 3.93L5.34 5.34' />
        <path d='M16.66 16.66L18.07 18.07' />
        <path d='M1 11H3' />
        <path d='M19 11H21' />
        <path d='M5.34 16.66L3.93 18.07' />
        <path d='M18.07 3.93L16.66 5.34' />
      </g>
    </svg>
  )

  useEffect(() => setMounted(true), [])

  return (
    <div
      className='border border-border p-[0.5rem] rounded-full w-[5rem] cursor-pointer'
      onClick={
        resolvedTheme === "light"
          ? () => setTheme("dark")
          : () => setTheme("light")
      }
    >
      <div
        className={`transition-[margin] ${
          !mounted ? "" : resolvedTheme === "light" ? "ml-[2.5rem]" : "ml-0"
        }`}
      >
        {!mounted ? placeholderIcon : icon}
      </div>
    </div>
  )

  /*if (!mounted)
    return (
      <Image
        src='data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=='
        width={36}
        height={36}
        sizes='36x36'
        alt='Loading Light/Dark Toggle'
        priority={false}
        title='Loading Light/Dark Toggle'
      />
    )

  if (resolvedTheme === "dark") {
    return sunIcon
  }

  if (resolvedTheme === "light") {
    return moonIcon
  }*/
}
