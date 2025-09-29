"use client"

import { Errors } from "@/types/auth"
import { useState } from "react"

export function useSignup() {
        const [loading, setLoading] = useState(false)
        const [errors, setErrors] = useState<Errors>({})
        const [generalError, setGeneralError] = useState<string | null>(null)
        const [success, setSuccess] = useState<string | null>(null)

        const signup = async (payload: {
                name: FormDataEntryValue | null
                email: FormDataEntryValue | null
                password: FormDataEntryValue | null
                password_confirmation: FormDataEntryValue | null
        }) => {
                setErrors({})
                setGeneralError(null)
                setSuccess(null)
                setLoading(true)

                try {
                        const API_URL = process.env.NEXT_PUBLIC_API_URL
                        const res = await fetch(`${API_URL}/auth/signup`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(payload),
                        })

                        const data = await res.json()

                        if (!res.ok) {
                                if (data?.errors) {
                                        setErrors(data.errors as Errors)
                                } else if (data?.error) {
                                        setGeneralError(data.error)
                                } else if (data?.message) {
                                        setGeneralError(data.message)
                                } else {
                                        setGeneralError("Signup failed")
                                }
                        } else {
                                setSuccess("Account created successfully!")
                        }
                } catch (err) {
                        setGeneralError("Something went wrong")
                } finally {
                        setLoading(false)
                }
        }

        return { loading, errors, generalError, success, signup }
}
