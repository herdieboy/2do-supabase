import { signInAction } from "@/app/actions"
import { FormMessage, Message } from "@/components/form-message"
import { SubmitButton, Input } from "@/components/ui/ui"
import Link from "next/link"

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams
  return (
    <form className='flex flex-col'>
      <h1>Sign in</h1>
      <p>
        Don't have an account?{" "}
        <Link className='underline' href='/sign-up'>
          Sign up
        </Link>
      </p>
      <div className='flex flex-col gap-[0.5rem] [&>input]:mb-[0.5rem] mt-[2rem]'>
        <label htmlFor='email'>Email</label>
        <Input name='email' placeholder='you@example.com' required />
        <div className='flex justify-between items-center'>
          <label htmlFor='password'>Password</label>
        </div>
        <Input
          type='password'
          name='password'
          placeholder='Your password'
          required
        />
        <SubmitButton pendingText='Signing In...' formAction={signInAction}>
          Sign in
        </SubmitButton>
        <FormMessage message={searchParams} />
        <Link className='underline' href='/forgot-password'>
          Forgot Password?
        </Link>
      </div>
    </form>
  )
}
