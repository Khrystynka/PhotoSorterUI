// import { StatusBar } from 'expo-status-bar';
import React ,{useCallback, useReducer,useState,useEffect} from 'react';
import { StyleSheet, ActivityIndicator, ScrollView,KeyboardAvoidingView,View,Text,TextInput,Button, Alert, ProgressViewIOSComponent } from 'react-native';
import Input from '../../components/UI/Input'
import {LinearGradient} from 'expo-linear-gradient'
import {useDispatch} from 'react-redux'
import * as authActions from '../../store/actions/auth'

// const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'
// const formReducer = (state,action) =>{
//   if (action.type === FORM_INPUT_UPDATE){
//     const updatedValues = {
//       ...state.inputValues,
//       [action.input]:action.value
//     };
//     const updatedValidities={
//       ...state.inputValidities,
//       [action.input]: action.isValid
//     };
//   let updatedFormIsValid = true;
//   for (const key in updatedValidities){
//     updatedFormIsValid = updatedFormIsValid &&updatedValidities[key]
//   }
//   return{
//     formIsValid: updatedFormIsValid,
//     inputValidities: updatedValidities,
//     inputValues:updatedValues
//   };
//   }
//   return state;
// }

const AuthScreen = (props) => {
  const[error,setError]=useState(null)
  const[isAuth,setIsAuth] = useState(false)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [signupMode,setSignupMode] = useState(false)
  const [isLoading,setIsLoading] = useState(false)

  const dispatch=useDispatch()
  useEffect(()=>{
    if (error){
      Alert.alert("An custom error has occured!",error,[{text:'OK'}])
    } 
  },[error])
  useEffect(()=>{
    
    if (isAuth){
      props.navigation.navigate('Uploads')
    }
  },[isAuth])

  const authHandler = async ()=>{
    let action = null;
    if (signupMode){
      action = (authActions.signup(email, password))
    }
    else{
      action = (authActions.login(email, password))
    }
    setIsLoading(true)
    try{
     await dispatch(action)
     setIsAuth(true)
     console.log('============================================================================')
    }
    catch(err ){
      console.log('Custom error messagie',err.message)
      setError(err.message)
    console.log('here is error from catch', error)
  }
    
    setIsLoading(false)
  }
  // const protectedHandler =()=>{
  //   console.log('protected')
  //   dispatch(authActions.protectedRes())
  // }

  // const inputChangeHandler = useCallback(
  //   (inputIdentifier, inputValue, inputValidity)=>{
  //   dispatchFormState({
  //     type: FORM_INPUT_UPDATE,
  //     value: inputValue,
  //     isValid: inputValidity,
  //     input:inputIdentifier

  //   })
  // },
  // [dispatchFormState]
  // );
  return (
    <KeyboardAvoidingView behaviour="padding" keyboardVerticalOffset={50} style={styles.screen}>
      <LinearGradient colors={['#ffedff','#ffe3ff']} style={styles.gradient}>
      <View style={styles.form}>
        <Input
        id='email'
        label='E-Mail'
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false}
        onInputChange={(value)=>setEmail(value)}/>
        
        <Input
        id='password'
        label='Password'
        keyboardType='default'
        // required
        // minLength={5}
        secureTextEntry
        autoCorrect={false}
        onInputChange={(value)=>setPassword(value)}

        />
      {isLoading ?  <ActivityIndicator/> : <Button title={signupMode ? "Sign Up" : "Login"} color='green' onPress={authHandler}></Button>}
      <Button 
        title={signupMode ? 'Switch to Login' : "Switch to Sign Up"} 
        color='green' 
        onPress={()=>setSignupMode(prevState=>!prevState)}>

        </Button>

      </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
AuthScreen.navigationOptions={
  headerTitle:"Please authenticate"
}

const styles = StyleSheet.create({
  form:{
    width:'80%',
    maxWidth:400,
    maxHeight:400,
    padding:20
  },
  gradient:{height:'100%', width:'100%',    alignItems: 'center',
  justifyContent: 'center'
},
  screen:{
    flex:1,

  }
});
export default AuthScreen;