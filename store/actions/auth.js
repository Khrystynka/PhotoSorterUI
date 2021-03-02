import {AsyncStorage} from 'react-native'
export const AUTHENTICATE= "AUTHENTICATE"
export const authenticate = (userId, token,refreshToken)=>{
    return {
        type:AUTHENTICATE,
        userId : userId,
        token:token,
        refreshToken:refreshToken
        

    }
}
export const signup = (email,password) =>{
    return async dispatch =>{
        const response = await fetch('http://127.0.0.1:5000/register',
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email: email,
                password:password,

            })
        }
        );
        console.log('passed to func from form ',email,password)
        const resData=await response.json();

        if (!response.ok){
            console.log(resData)
            throw new Error('Email already exist! Please try again')
        }
        console.log('RESPONSE FROM FLASK',resData,response.headers)
        dispatch(authenticate(resData.user_id,resData.access_token,resData.refresh_token))
    
        //    calculate date and time untill token will expire
        //    multiply by 60000 to convert minutes to ms
        const tokenExpDate = new Date(new Date().getTime()+parseInt(resData.token_expires*60000)).toISOString()

        console.log(tokenExpDate)
        saveDataToStorage(resData.access_token,resData.user_id,resData.refresh_token,tokenExpDate)

    }
}
export const login = (email,password) =>{
    return async dispatch =>{
        const response = await fetch('http://127.0.0.1:5000/login',
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email: email,
                password:password,

            })
        }
        );
        console.log('passed to func from form ',email,password)
        const resData=await response.json();

        if (!response.ok){
            console.log(resData)
            throw new Error('login email or password are not valid! Please try again with another credentials!')
        }
        console.log('RESPONSE FROM FLASK login',resData)
        
        dispatch(authenticate(resData.user_id,resData.access_token,resData.refresh_token))
    //    calculate date and time untill token will expire
    //    multiply by 60000 to convert minutes to ms
        const tokenExpDate = new Date(new Date().getTime()+parseInt(resData.token_expires*60000)).toISOString()
        // const currtime = new Date(new Date().getTime()).toISOString()
        saveDataToStorage(resData.access_token,resData.user_id,resData.refresh_token,tokenExpDate)
        
    }
}

export const PROTECTED = 'PROTECTED'
export const protectedRes = () =>{
    console.log('im in protected res')
    const token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYxNDE0NDA1NCwianRpIjoiZGZiMjIwOTAtNTJkMC00Mzk0LWE5YzUtYmEzMDMxNjg5YzkwIiwibmJmIjoxNjE0MTQ0MDU0LCJ0eXBlIjoiYWNjZXNzIiwic3ViIjo4LCJleHAiOjE2MTQxNDQ5NTR9.QmvreoKa2wQlw4eOHd1fOn_4iK9-FKCmGqU33PVq7Nc"
    return async dispatch =>{
        const response = await fetch('http://127.0.0.1:5000/who_am_i',
        {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`

            },
        }
        );
        const resData=await response.json();

        if (!response.ok){
            console.log(resData)

            throw new Error('oops2')
        }
        console.log('PROTECTED RESPONSE FROM FLASK',resData,response.headers)
        dispatch({type:PROTECTED})
    }
}
// const LOGOUT= "LOGOUT"
// export const logout = () =>{
//     return {
//         type:LOGOUT
//     }
// }

const saveDataToStorage=(token,userId,refreshToken,expiryDate) => {
    AsyncStorage.setItem(
        'userData',JSON.stringify({
            token:token,
            userId:userId,
            refreshToken:refreshToken,
            expiryDate:expiryDate


        })
    )
}