import { useState } from "react"

export const useValidNull = (inputValue) => {
    let [error, setError] = useState([false, ""])
    !inputValue && setError([true, "This field is required"])

    return error
}
