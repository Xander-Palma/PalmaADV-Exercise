import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker'

export default function RegisterScreen(){
    const [image, setImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState([
    {id: 1,Label: "Name",placeHolder: "Enter your name..",value: ""},
    {id: 2,Label: "Email",placeHolder: "Enter your Email..",value: ""},
    {id: 3,Label: "Password",placeHolder: "Enter your Password..",value: "", secure: true},
    ]);

    const handleInputChange = (id: any, text: any) => {
        setFormData((prevFormData) =>
          prevFormData.map((field) =>
            field.id === id ? { ...field, value: text } : field
          )
        );
      };


      const pickImage = async () => {
        setIsLoading(true);
        await new Promise(res => setTimeout(res,1000));

        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }

        setIsLoading(false);
      };

      const handleRegisterButton = () => {
        if(formData.every((field) => field.value.trim() === "")){
            console.error("Fill up all the input fields!");
            return;
        }
        setFormData(formData.map(f => ({...f, value: ""})));
        setImage(null);
      }
    
    
    return (
        <View style={style.container}>
            <Text style={style.title}>Register</Text>
            <Text style={{textAlign: "center", marginVertical: 20}}>
            {image ? (
                <Image source={{ uri: image}} style={style.image} />
                ) : (
                    <View style={style.imagePlacholder} />
                )}
            </Text>
            <TouchableOpacity style={style.button1} onPress={pickImage}>
                <Text style={style.buttonText}>{isLoading ? "Loading..." : "Upload an image"}</Text>
            </TouchableOpacity>
            {formData.map((f, _) => (
                <TextInput style={style.textInput}

                    key={f.id}
                    label={f.Label}
                    mode="outlined"
                    placeholder={f.placeHolder}
                    value={f.value}
                    secureTextEntry={f.secure}
                    onChangeText={(e) => handleInputChange(f.id, e)}
                />
            ))}
            <TouchableOpacity style={style.button1} onPress={handleRegisterButton}>
                <Text style={style.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}


const style = StyleSheet.create({
    container: {
        backgroundColor: '#1092b8',
        flex: 1,
        paddingHorizontal: 35,
        gap: 8,
    },
    textInput: {
        width: 500,  
        alignSelf: "center",  
        fontSize: 18,  
        height: 50,  
        paddingHorizontal: 10,  
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
        textAlign: "center",
        borderRadius: 4,
        padding: 4,
        width:500,
        fontSize:25,
        alignSelf: "center"
    },
    buttonText: {
        fontSize: 20,
        fontFamily: "sans-serif",
        color: '#000000',
        fontWeight: "bold",
        textAlign: "center",
        padding: 5,
        width:400,
        alignSelf: "center"
    },
    image: {
        width: 300,
        height: 250,
        borderRadius: 100,
        borderWidth: 0.5,
        
    },
    imagePlacholder: {
        width: 300,
        height: 250,
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor: "black",

    }
})