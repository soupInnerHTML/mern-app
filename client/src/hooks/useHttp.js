// import { response } from "express"
import { useCallback, useState } from "react"

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [ready, setReady] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers["Content-Type"] = "application/json"
            }

            const response = await fetch(url, {
                method,
                body,
                headers,
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Что-то пошло не так")
            }

            setLoading(false)
            setReady(true)

            return data
        }
        catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    return { loading, setLoading, request, error, setError, ready, }
}