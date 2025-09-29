"use client"
import { useState } from "react"
import { Errors } from "@/types/auth"
import { useRouter } from "next/navigation"

type SigninPayload = {
        email: FormDataEntryValue | null
        password: FormDataEntryValue | null
}

export function useSignin() {
        const router = useRouter()
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
                        if (!API_URL) throw new Error("API URL is not defined")

                        const res = await fetch(`${API_URL}/auth/signin`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                        email: payload.email?.toString().trim() ?? "",
                                        password: payload.password?.toString().trim() ?? "",
                                }),
                                credentials: "include",
                        })

                        const data = await res.json()

                        if (!res.ok) {
                                if (data?.errors) setErrors(data.errors as Errors)
                                else if (data?.error) setGeneralError(data.error)
                                else if (data?.message) setGeneralError(data.message)
                                else setGeneralError("Signin failed")
                        } else {
                                setSuccess(data?.message ?? "Login successful!")
                                router.push("/dashboard")
                        }
                } catch (err) {
                        console.error(err)
                        setGeneralError("Something went wrong")
                } finally {
                        setLoading(false)
                }
        }

        return { loading, errors, generalError, success, signin }
}
