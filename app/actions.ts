"use server"

import { encodedRedirect } from "@/utils/utils"
import { createClient } from "@/utils/supabase/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString()
  const password = formData.get("password")?.toString()
  const supabase = await createClient()
  const origin = (await headers()).get("origin")

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required"
    )
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error(error.code + " " + error.message)
    return encodedRedirect("error", "/sign-up", error.message)
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    )
  }
}

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message)
  }

  return redirect("/private")
}

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString()
  const supabase = await createClient()
  const origin = (await headers()).get("origin")
  const callbackUrl = formData.get("callbackUrl")?.toString()

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required")
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/private/reset-password`,
  })

  if (error) {
    console.error(error.message)
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    )
  }

  if (callbackUrl) {
    return redirect(callbackUrl)
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  )
}

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient()

  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/private/reset-password",
      "Password and confirm password are required"
    )
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/private/reset-password",
      "Passwords do not match"
    )
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  })

  if (error) {
    encodedRedirect(
      "error",
      "/private/reset-password",
      "Password update failed"
    )
  }

  encodedRedirect("success", "/private/reset-password", "Password updated")
}

export const signOutAction = async () => {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect("/sign-in")
}

export async function addTask(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    console.error("Error getting user:", userError)
    return // Stop execution if there's an error fetching the user
  }

  if (!user) {
    console.error("User is null.  Ensure user is authenticated.")
    return // Stop execution if user is null
  }

  const title = formData.get("title") as string

  try {
    const { data, error } = await supabase
      .from("todos")
      .insert([{ task: title, user_id: user.id }])
      .select()
  } catch (error) {
    console.error("Add task failed:", error)
  } finally {
    revalidatePath("/")
  }
}

export async function toggleTask(id: string, isComplete: boolean) {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from("todos")
      .update({ is_complete: !isComplete })
      .eq("id", id)
      .select()

    console.log("Todo toggled successfully.")
  } catch (error) {
    console.error("Error toggling todo:", error)
  } finally {
    revalidatePath("/")
  }
}

export async function deleteTask(id: string) {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from("todos")
      .delete()
      .eq("id", Number(id))

    console.log(id + " deleted successfully.")
  } catch (error) {
    console.error("Error deleting todo:", error)
  } finally {
    //revalidatePath("/")
  }
}
