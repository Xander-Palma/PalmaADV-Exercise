import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Checkbox, TextInput } from 'react-native-paper';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const inputs = [
        {
            placeholder: "Enter email",
            value: email,
            onChange: setEmail,
        },

        {
            placeholder: "Enter password",
            value: password,
            onChange: setPassword,
            secure: true
        }
    ]

 return (
    <View style={style.container}>
        <View style={style.container1}>
        <Text style={style.title}>Welcome</Text>
        {inputs.map((input, i) =>(
            <TextInput 
                key={i}
                style={[style.textInput, { marginTop: i === 0 ? 35 : 10 }]} 
                placeholder={input.placeholder}
                mode="outlined"
                value={input.value}
                onChangeText={input.onChange}
                secureTextEntry={input.secure}
            />
        ))}
        <View
         style={{
            marginTop: 8,
            flexDirection: "row",
            alignItems: "center",   
            justifyContent: "space-between"
         }}
        >
        <View
         style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: -7
         }}
        >

        </View>

        
        </View>

        <View style={style.buttonContainer}>
        <TouchableOpacity style={style.button1}>
        <Text style={style.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.button2}>
        <Text style={style.buttonText}>Register</Text>
        </TouchableOpacity>
        </View>

        </View>
    </View>
  )
}

const style = StyleSheet.create({
    textInput: {
        width: 500,  
        alignSelf: "center",  
        fontSize: 18,  
        height: 50,  
        paddingHorizontal: 10,  
    },
    container: {
        flex: 1,
        paddingTop: 100,
        paddingRight: 500,
        paddingLeft: 500,
        color: 'White',
        paddingHorizontal: 35,
        backgroundColor: '#f2f2f2'
    },
    container1: {
        borderRadius: 25,
        backgroundColor: '#839192',
        padding: 20,
        width: 800,
        height: 500,
        alignSelf:"center",
        
    },
    title: {
        fontSize: 35,
        fontFamily: "sans-serif",
        color: '#000000',
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 20,
    },
    button1: {
        borderColor: '#000000',
        borderStyle: "solid",
        borderWidth: 1,
        marginTop: 15,
        borderRadius: 4,
        padding: 4,
        width:200,
        alignSelf: "center",
    },
    button2: {
        borderColor: '#000000',
        borderStyle: "solid",
        borderWidth: 1,
        marginTop: 15,
        borderRadius: 4,
        padding: 4,
        width:200,
        alignSelf: "center",
    },
    buttonText: {
        fontSize: 20,
        fontFamily: "sans-serif",
        color: '#000000',
        fontWeight: "bold",
        textAlign: "center",
        padding: 5,
    },
    buttonContainer: {
        flexDirection: "row", 
        justifyContent: "center", 
        marginTop: 30, 
        gap: 10, 
    },
})