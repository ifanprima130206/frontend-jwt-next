"use client"
import { useState } from "react"

export function useRefreshToken() {
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState<string | null>(null)

        const refresh = async () => {
                setLoading(true)
                setError(null)
                try {
                        const API_URL = process.env.NEXT_PUBLIC_API_URL
                        const res = await fetch(`${API_URL}/auth/refresh`, {
                                method: "POST",
                                credentials: "include",
                        })
                        if (!res.ok) {
                                const data = await res.json().catch(() => null)
                                setError(data?.message || "Refresh failed")
                                return null
                        }
                        const data = await res.json()
                        document.cookie = `access_token=${data.token}; path=/; max-age=${data.expires_in}`
                        return data.token
                } catch (err) {
                        console.error(err)
                        setError("Something went wrong during refresh")
                        return null
                } finally {
                        setLoading(false)
                }
        }

        return { refresh, loading, error }
}
