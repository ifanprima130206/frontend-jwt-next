"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { fetchWithRefresh } from "@/utils/fetchWithRefresh"

export function useSignout() {
        const router = useRouter()
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState<string | null>(null)

        const signout = async () => {
                setLoading(true)
                setError(null)

                try {
                        const API_URL = process.env.NEXT_PUBLIC_API_URL
                        if (!API_URL) throw new Error("API URL is not defined")

                        const res = await fetchWithRefresh(`${API_URL}/auth/signout`, {
                                method: "POST",
                                credentials: "include", // kirim cookie otomatis
                        })

                        if (!res.ok) {
                                const data = await res.json().catch(() => null)
                                setError(data?.message || "Signout failed")
                                return
                        }

                        router.push("/")
                } catch (err) {
                        console.error(err)
                        setError("Something went wrong during signout")
                } finally {
                        setLoading(false)
                }
        }

        return { signout, loading, error }
}
