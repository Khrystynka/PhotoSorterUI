import { AUTHENTICATE } from "../actions/auth"

const initialState={
    id:null,
    token:null,
    refreshToken:null,
}
export default (state = initialState,action) => {
    console.log('auth reducer actiontype',action.type)

    console.log('in auth reducer',action.token,action.userId)
    switch(action.type){
        case AUTHENTICATE:
            return{
                token:action.token,
                id:action.userId,
                refreshToken:action.refreshToken
            }
        default:
            return state}
}
 