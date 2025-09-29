"use client"
import { fetchWithRefresh } from "@/utils/fetchWithRefresh";
import { useState, useEffect } from "react";

export function useUser() {
        const [user, setUser] = useState<{ id: number; name: string; email: string } | null>(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);

        useEffect(() => {
                const getUser = async () => {
                        setLoading(true);
                        setError(null);

                        try {
                                const res = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`);
                                if (!res.ok) {
                                        const data = await res.json().catch(() => null);
                                        setError(data?.message || "Failed to fetch user");
                                        return;
                                }

                                const data = await res.json();
                                setUser(data);
                        } catch (err) {
                                console.error(err);
                                setError("Something went wrong");
                        } finally {
                                setLoading(false);
                        }
                };

                getUser();
        }, []);

        return { user, loading, error };
}
