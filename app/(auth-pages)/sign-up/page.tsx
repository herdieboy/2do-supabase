import { signUpAction } from "@/app/actions"
import { FormMessage, Message } from "@/components/form-message"
import { SubmitButton, Input } from "@/components/ui/ui"
import Link from "next/link"

export default async function Signup(props: {
  searchParams: Promise<Message>
}) {
  const searchParams = await props.searchParams
  if ("message" in searchParams) {
    return (
      <div className='w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4'>
        <FormMessage message={searchParams} />
      </div>
    )
  }

  return (
    <>
      <form className='flex flex-col'>
        <h1>Sign up</h1>
        <p>
          Already have an account?{" "}
          <Link className='underline' href='/sign-in'>
            Sign in
          </Link>
        </p>
        <div className='flex flex-col gap-[0.5rem] [&>input]:mb-[0.5rem] mt-[2rem]'>
          <label htmlFor='email'>Email</label>
          <Input name='email' placeholder='you@example.com' required />
          <label htmlFor='password'>Password</label>
          <Input
            type='password'
            name='password'
            placeholder='Your password'
            minLength={6}
            required
          />
          <SubmitButton formAction={signUpAction} pendingText='Signing up...'>
            Sign up
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  )
}
