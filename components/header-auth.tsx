import { signOutAction } from "@/app/actions"
//import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { createClient } from "@/utils/supabase/server"

export default async function AuthButton() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user ? (
    <div className='w-full flex justify-center items-center gap-4 pt-[1rem]'>
      Hey, {user.email}!
      <form action={signOutAction}>
        <Button type='submit' variant={"outline"}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className='flex gap-2'>
      <Button asChild size='sm' variant={"outline"}>
        <Link href='/sign-in'>Sign in</Link>
      </Button>
      <Button asChild size='sm' variant={"default"}>
        <Link href='/sign-up'>Sign up</Link>
      </Button>
    </div>
  )
}
