"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import loginAction from "../_actions/login-action"
import { useActionState, useEffect } from "react"
import { LoginStateInterface } from "@/types"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"

export const initialLoginState: LoginStateInterface = {
  success: false,
  message: "",
  data: {
    accessToken: "",
    refreshToken: "",
  },
}

export function LoginForm({
  className,
}: React.ComponentProps<"div">) {

  const router = useRouter()
  const [loginFormState, loginFormAction, loginStatusPending] = useActionState(loginAction, initialLoginState)

  console.log("form", loginFormState)

  useEffect(() => {
    if (loginFormState.success) {
      toast.add({
        type: "success",
        title: "Login ",
        description: "User loggedin successfully!😎",
      })
      router.replace("/")

    }
  }, [loginFormState.success])

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <form action={loginFormAction}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" name="password" placeholder="********" required />
          </Field>
          <Field>
            <Button type="submit" disabled={loginStatusPending}>{loginStatusPending ? <Spinner /> : "Login"}</Button>
            <Button variant="outline" type="button">
              Login with Google
            </Button>
            <FieldDescription className="text-center">
              Don&apos;t have an account? <Link href="/auth/register">Sign up</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
