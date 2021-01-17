export const useLoading = (loading) => {
    return loading ? { opacity: 0.2, transition: "opacity .5s", cursor: "default", } : {}
}