"use client"

import { useState } from "react"
import { Errors } from "@/types/auth"

type SigninPayload = {
        email: FormDataEntryValue | null
        password: FormDataEntryValue | null
}

export function useSignin() {
        const [loading, setLoading] = useState(false)
        const [errors, setErrors] = useState<Errors>({})
        const [generalError, setGeneralError] = useState<string | null>(null)
        const [success, setSuccess] = useState<string | null>(null)

        const signin = async (payload: SigninPayload) => {
                setErrors({})
                setGeneralError(null)
                setSuccess(null)
                setLoading(true)

                try {
                        const API_URL = process.env.NEXT_PUBLIC_API_URL
                        console.log("API_URL:", process.env.NEXT_PUBLIC_API_URL)
                        const res = await fetch(`${API_URL}/auth/signin`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                        email: String(payload.email ?? ""),
                                        password: String(payload.password ?? ""),
                                }),
                                credentials: "include",
                        })

                        const data = await res.json()
                        console.log("API response:", res, data) // <-- tampilkan di console

                        if (!res.ok) {
                                console.log("API returned error:", data) // <-- tampilkan error detail
                                if (data?.errors) {
                                        setErrors(data.errors as Errors)
                                } else if (data?.error) {
                                        setGeneralError(data.error)
                                } else if (data?.message) {
                                        setGeneralError(data.message)
                                } else {
                                        setGeneralError("Signin failed")
                                }
                        } else {
                                setSuccess("Login successful!")
                        }
                } catch (err) {
                        console.error("Fetch error:", err) // <-- tampilkan error network
                        setGeneralError("Something went wrong")
                } finally {
                        setLoading(false)
                }
        }


        return { loading, errors, generalError, success, signin }
}
