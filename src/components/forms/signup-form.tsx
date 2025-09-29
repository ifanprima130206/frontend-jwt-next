"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSignup } from "@/hooks/feature/auth/useSignup"
import Link from "next/link"

export function SignupForm() {
        const { loading, errors, generalError, success, signup } = useSignup()

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                signup({
                        name: formData.get("name"),
                        email: formData.get("email"),
                        password: formData.get("password"),
                        password_confirmation: formData.get("retype_password"),
                })
        }

        return (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                        <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Create an account</h1>
                                <p className="text-muted-foreground text-sm text-balance">
                                        Fill in your details below to register a new account
                                </p>
                        </div>

                        <div className="grid gap-1">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" name="name" />
                                {errors.name && <p className="text-red-500 text-xs">{errors.name[0]}</p>}
                        </div>

                        <div className="grid gap-1">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                                {errors.email && <p className="text-red-500 text-xs">{errors.email[0]}</p>}
                        </div>

                        <div className="grid gap-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password" required />
                                {errors.password && <p className="text-red-500 text-xs">{errors.password[0]}</p>}
                        </div>

                        <div className="grid gap-1">
                                <Label htmlFor="retype_password">Confirm Password</Label>
                                <Input id="retype_password" name="retype_password" type="password" required />
                                {errors.password_confirmation && (
                                        <p className="text-red-500 text-xs">{errors.password_confirmation[0]}</p>
                                )}
                        </div>

                        <Button type="submit" disabled={loading}>
                                {loading ? "Signing Up..." : "Sign Up"}
                        </Button>


                        <div className="text-center text-sm">
                                {generalError && <p className="text-red-500">{generalError}</p>}
                                {success && <p className="text-green-500">{success}</p>}
                                Already have an account?{" "}
                                <Link href="/" className="underline underline-offset-4">
                                        Sign in
                                </Link>
                        </div>
                </form>
        )
}
