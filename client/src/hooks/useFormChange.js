import { useState } from "react"

export const useFormChange = initialState => {
    const [formData, setFormData] = useState(initialState)

    const fieldsParse = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value, })
    }

    return [formData, fieldsParse, setFormData]
}