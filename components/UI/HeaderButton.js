import Colors from '../../constants/Colors'
import {Platform} from 'react-native'
import React from 'react'
import {HeaderButton} from 'react-navigation-header-buttons'
import {Ionicons} from '@expo/vector-icons'

const CustomHeaderButton = props => {
    return <HeaderButton 
        {...props}
        IconComponent={Ionicons}
        iconSize={23}
        color={Platform.OS === "android" ? "white" : Colors.accent}
        />
    
}
export default CustomHeaderButton