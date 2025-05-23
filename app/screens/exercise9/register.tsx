import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/app/firebase/config';
import { router } from "expo-router";

type FormData = {
  email: string;
  password: string;
};

export default function RegisterPageExercise8() {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pickImage = async () => {
    setIsLoading(true);
    await new Promise(res => setTimeout(res, 1000));

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setTempImage(result.assets[0].uri);
    }
    setIsLoading(false);
  };

  const onSubmit = async (userData: FormData) => {
    if (!tempImage) {
      alert("Please select an image!");
      return;
    }

    try {
      const user = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      console.log("User created: ", user);

      setValue("email", "");
      setValue("password", "");
      setTempImage(null);
      router.push("screens/exercise9/login" as any);
    } catch (err) {
      console.log("FirebaseError: ", err);
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>Register</Text>

      <Text style={{ textAlign: "center", marginVertical: 20 }}>
        {tempImage ? (
          <Image source={{ uri: tempImage }} style={style.image} />
        ) : (
          <View style={style.imagePlacholder} />
        )}
      </Text>

      <TouchableOpacity style={style.button1} onPress={pickImage}>
        <Text style={style.buttonText}>{isLoading ? "Loading..." : "Upload an image"}</Text>
      </TouchableOpacity>

      {/* Email Field */}
      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Invalid email format"
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={style.textInput}
            label="Email"
            mode="outlined"
            placeholder="Enter your email..."
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && <Text style={style.error}>{errors.email.message}</Text>}

      {/* Password Field */}
      <Controller
        name="password"
        control={control}
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters"
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={style.textInput}
            label="Password"
            mode="outlined"
            placeholder="Enter your password..."
            secureTextEntry
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && <Text style={style.error}>{errors.password.message}</Text>}

      <TouchableOpacity style={style.button1} onPress={handleSubmit(onSubmit)}>
        <Text style={style.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#1092b8",
    flex: 1,
    paddingHorizontal: 35,
    paddingTop: 50,
    gap: 8,
  },
  textInput: {
    width: 500,
    alignSelf: "center",
    fontSize: 18,
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  title: {
    fontSize: 35,
    fontFamily: "sans-serif",
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
  },
  button1: {
    borderColor: "#000000",
    borderStyle: "solid",
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 4,
    padding: 4,
    width: 500,
    fontSize: 25,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "sans-serif",
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    width: 400,
    alignSelf: "center",
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
  },
  error: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
  },
});
