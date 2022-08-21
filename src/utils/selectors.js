export const selectToken = (state) => {
    const token = state.user.token
    if (token) {
        const decode = JSON.parse(atob(token.split('.')[1]));
        if (decode.exp * 1000 < new Date().getTime()) {
            console.log('Your token has Expired');
            return null
        }
    }
    return token
}
export const selectfirstName = (state) => state.user.data?.firstName
export const selectlastName = (state) => state.user.data?.lastName
export const selectError = (state) => state.user.error




