"use client"
import { Errors } from "@/types/auth"
import { useState } from "react"

type SignupPayload = {
        name: FormDataEntryValue | null
        email: FormDataEntryValue | null
        password: FormDataEntryValue | null
        password_confirmation: FormDataEntryValue | null
}

export function useSignup() {
        const [loading, setLoading] = useState(false)
        const [errors, setErrors] = useState<Errors>({})
        const [generalError, setGeneralError] = useState<string | null>(null)
        const [success, setSuccess] = useState<string | null>(null)

        const signup = async (payload: SignupPayload) => {
                setErrors({})
                setGeneralError(null)
                setSuccess(null)
                setLoading(true)

                try {
                        const API_URL = process.env.NEXT_PUBLIC_API_URL
                        if (!API_URL) throw new Error("API URL is not defined")

                        const res = await fetch(`${API_URL}/auth/signup`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                        name: payload.name?.toString().trim() ?? "",
                                        email: payload.email?.toString().trim() ?? "",
                                        password: payload.password?.toString().trim() ?? "",
                                        password_confirmation: payload.password_confirmation?.toString().trim() ?? "",
                                }),
                        })

                        const data = await res.json().catch(() => null)

                        if (!res.ok) {
                                if (data?.errors) setErrors(data.errors as Errors)
                                else if (data?.error) setGeneralError(data.error)
                                else if (data?.message) setGeneralError(data.message)
                                else setGeneralError("Signup failed")
                        } else {
                                setSuccess(data?.message ?? "Account created successfully!")
                        }
                } catch (err) {
                        console.error(err)
                        setGeneralError("Something went wrong during signup")
                } finally {
                        setLoading(false)
                }
        }

        return { loading, errors, generalError, success, signup }
}
