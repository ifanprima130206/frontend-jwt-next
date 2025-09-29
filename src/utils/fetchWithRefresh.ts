const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchWithRefresh(url: string, options: RequestInit = {}) {
        let res = await fetch(url, { ...options, credentials: "include" });

        if (res.status === 401) {
                const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
                        method: "POST",
                        credentials: "include",
                });

                if (!refreshRes.ok) throw new Error("Session expired");

                res = await fetch(url, { ...options, credentials: "include" });
        }

        return res;
}
