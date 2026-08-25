"use client"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useActionState, useEffect } from "react"
import registerAction from "../_actions/register-action"
import { RegisterStateInterface } from "@/types"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const initialRegisterState: RegisterStateInterface = {
  success: false,
  message: "",
  data: {
    name: "",
    email: "",
    password: ""
  }
}

const ROLES = [
  { value: "TENANT", label: "Tenant" },
  { value: "LANDLORD", label: "Landlord" }
]

export function RegisterForm() {

  const router = useRouter();
  const [registerFormState, registerFormAction, registerLoading] = useActionState(registerAction, initialRegisterState)

  console.log('register form', registerFormState)

  useEffect(() => {
    if (registerFormState.success) {
      toast.add({ type: "success", title: "Registration", description: "User registration is successful." })
      router.push("/auth/login")
    }
  }, [registerFormState.success])

  return (
    <form action={registerFormAction}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" name="name" type="text" placeholder="Mohammad | Ahmad" required />
        </Field>
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
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" name="password" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">
            Confirm Password
          </FieldLabel>
          <Input id="confirm-password" type="password" name="confirm-password" required />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="role">
            Role
          </FieldLabel>
          <RadioGroup name="role" defaultValue={ROLES[0].value} className="w-fit flex">
            {
              ROLES.map((role) => (
                <FieldLabel htmlFor={role.label} key={role.label}>
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldLabel>{role.label}</FieldLabel>
                    </FieldContent>
                    <RadioGroupItem value={role.value} id={role.label} />
                  </Field>
                </FieldLabel>
              ))
            }
          </RadioGroup>
        </Field>
        <FieldGroup>
          <Field>
            <Button type="submit" disabled={registerLoading}>{registerLoading ? <Spinner /> : "Create Account"}</Button>
            <Button variant="outline" type="button">
              Sign up with Google
            </Button>
            <FieldDescription className="px-6 text-center">
              Already have an account? <Link href="/auth/login">Sign in</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  )
}
