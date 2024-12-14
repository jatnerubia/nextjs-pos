"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { login } from "@/lib/api"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { useRouter } from "next/navigation"
import { LuLoader } from "react-icons/lu"
import { z } from "zod"

export const AuthForm = () => {
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: login,
    onError: () => {
      toast({
        title: "Unable to login",
      })
    },
    onSuccess: () => {
      router.push("/")
    },
  })

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      form.reset()
      mutation.mutate({
        email: value.email,
        password: value.password,
      })
    },
    validatorAdapter: zodValidator(),
  })

  return (
    <form
      className='flex flex-col gap-4'
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.Field
        name='email'
        validators={{
          onChange: z.string().email(),
        }}
      >
        {(field) => (
          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='name'>Email</Label>
            <Input
              id={field.name}
              type='email'
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors ? (
              <em role='alert' className='text-sm'>
                {field.state.meta.errors.join(", ")}
              </em>
            ) : null}
          </div>
        )}
      </form.Field>
      <form.Field
        name='password'
        validators={{
          onChange: z.string().min(8, { message: "Must be at least 8 characters" }),
        }}
      >
        {(field) => (
          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='name'>Password</Label>
            <Input
              id={field.name}
              type='password'
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors ? (
              <em role='alert' className='text-sm'>
                {field.state.meta.errors.join(", ")}
              </em>
            ) : null}
          </div>
        )}
      </form.Field>
      <form.Subscribe selector={(state) => [state.canSubmit, state.isDirty, state.isSubmitting]}>
        {([canSubmit, isDirty, isSubmitting]) => (
          <Button
            type='submit'
            disabled={!canSubmit || !isDirty || mutation.isPending}
            aria-label='submit button'
          >
            {(isSubmitting || mutation.isPending) && <LuLoader />}
            Login
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
