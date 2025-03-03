"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  function toggleMenu() {
    setMenuOpen(!menuOpen)
  }

  return (
    <div
      className={`fixed w-[20rem] h-dvh flex flex-col transition-[right] ${menuOpen ? "right-0" : "right-[-20rem]"}`}
    >
      <div
        onClick={toggleMenu}
        className={`left-0 top-0 w-[calc(100dvw-20rem)] h-dvh ${menuOpen ? "fixed" : "hidden"}`}
      ></div>

      <div className='flex flex-col bg-container border-l border-border grow-1 p-[2rem]'>
        <div
          onClick={toggleMenu}
          className={`flex flex-col justify-between h-[2rem] w-[2rem] mb-[2rem] mt-[-0.5rem] ml-[-0.5rem] p-[0.5rem] group ${menuOpen ? "hamburger-open" : "hamburger-closed"}`}
        >
          <div className={``}></div>
          <div className={``}></div>
          <div className={``}></div>
        </div>

        <ul className='grow-1'>
          <li>
            <Link href='/' className='underline-hover'>
              Home
            </Link>
          </li>
          <li>
            <Link href='/private' className='underline-hover'>
              Todo list
            </Link>
          </li>
        </ul>
        <div className='w-full flex justify-center items-center gap-2'>
          <Button style={{ width: "50%" }}>
            <Link href='/sign-in'>Sign in</Link>
          </Button>
          <Button style={{ width: "50%" }}>
            <Link href='/sign-up'>Sign up</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
