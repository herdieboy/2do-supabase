"use client"

import { useFormStatus } from "react-dom"

export function Button({
  type = "button",
  variant = "btn",
  children,
  ...props
}: Readonly<{
  type?: "button" | "submit" | "reset"
  variant?: "btn" | "submit"
  children: React.ReactNode
  [key: string]: any
}>) {
  return (
    <button
      type={type}
      className={`border border-border rounded-[0.5rem] px-[1rem] py-[0.5rem] cursor-pointer ${variant == "submit" ? "bg-text text-container" : "bg-container"}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function SubmitButton({
  children,
  pendingText = "Submitting...",
  ...props
}: Readonly<{
  children: React.ReactNode
  pendingText: string
  [key: string]: any
}>) {
  const { pending } = useFormStatus()

  return (
    <Button variant='submit' type='submit' aria-disabled={pending} {...props}>
      {pending ? pendingText : children}
    </Button>
  )
}

export function Input({
  type = "text",
  name,
  placeholder,
  required,
  children,
  minLength = 1,
}: Readonly<{
  type?: "password" | "text"
  name: string
  placeholder: string
  required: boolean
  children?: React.ReactNode
  minLength?: number
}>) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      minLength={minLength}
      className='border border-border rounded-[0.5rem] w-full bg-container outline-none px-[1rem] py-[0.5rem]'
    />
  )
}
