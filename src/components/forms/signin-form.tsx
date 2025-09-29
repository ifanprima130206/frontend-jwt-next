"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSignin } from "@/hooks/feature/auth/useSignin"

export function SigninForm() {
  const { loading, generalError, success, signin } = useSignin()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await signin({
      email: formData.get("email"),
      password: formData.get("password"),
    })
  }

  return (
    <form className={cn("flex flex-col gap-6")} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" placeholder="m@example.com" required />
        </div>

        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" name="password" required />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </div>

      {generalError && (
        <p className="text-red-500 text-sm text-center mt-2">
          Sign in failed, please try again.
        </p>
      )}

      {success && (
        <p className="text-green-500 text-sm text-center mt-2">
          {success}
        </p>
      )}

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/auth/signup" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}
