export const toCapitalize = str => str[0].toUpperCase() + str.slice(1)

export const _ = () => console.log("Use _")

export const thinRequest = async (request, endPoint, token = "", method = "GET", payload = null) => {
    let _response = await request(`/api/${endPoint}`, method, payload,  {
        Authorization: `Bearer ${token}`,
    } )

    return _response
}