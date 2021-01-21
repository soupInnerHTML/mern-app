export const thinRequest = async (state, endPoint, method = "GET", payload = null) => {
    const { jwtToken, } = state.auth
    const { request, } = state.routes

    let _response = await request(`/api/${endPoint}`, method, payload,  {
        Authorization: `Bearer ${jwtToken}`,
    } )

    return _response
}

export const clearStroage = () => {
    localStorage.removeItem("storageName")
}