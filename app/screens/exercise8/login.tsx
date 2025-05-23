import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Successfully logged in:', data);
  };

  return (
    <View style={style.container}>
      <View style={style.container1}>
        <Text style={style.title}>Welcome</Text>

        {/* Email Input */}
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
              style={[style.textInput, { marginTop: 35 }]}
              placeholder="Enter email"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && <Text style={style.error}>{errors.email.message}</Text>}

        {/* Password Input */}
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
              style={[style.textInput, { marginTop: 10 }]}
              placeholder="Enter password"
              mode="outlined"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && <Text style={style.error}>{errors.password.message}</Text>}

        {/* Buttons */}
        <View style={style.buttonContainer}>
          <TouchableOpacity style={style.button1} onPress={handleSubmit(onSubmit)}>
            <Text style={style.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.button2}>
            <Text style={style.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
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
    backgroundColor: '#f2f2f2',
  },
  container1: {
    borderRadius: 25,
    backgroundColor: '#839192',
    padding: 20,
    width: 800,
    height: 500,
    alignSelf: "center",
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
    width: 200,
    alignSelf: "center",
  },
  button2: {
    borderColor: '#000000',
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 4,
    padding: 4,
    width: 200,
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
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    alignSelf: "center",
  }
});
