import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export default function FormContainers(){

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1399a3"
        }}>
            <Text style={{
            fontSize: 30,
            fontWeight: "bold",
            marginBottom: 20,
            }}>Firebase Auth</Text>
            {[{name: "Navigate to Login Screen", route: "/screens/exercise9/login" as any},
              {name: "Navigate to Register screen", route: "/screens/exercise9/register" as any}].map((n, i) => (
              <TouchableOpacity
               style={{
                borderStyle: "solid",
                borderWidth: 2,
                borderColor: "#00deee",
                backgroundColor:"#00deee",
                marginTop: 15,
                borderRadius: 4,
                padding: 4
                }}
               onPress={() => n.route && router.push(n.route)}
               key={i}><Text style={{
                fontSize: 20,
                fontFamily: "sans-serif",
                color: '#000000',
                fontWeight: "bold",
                textAlign: "center",
                padding: 5,
               }}>{n.name}</Text></TouchableOpacity>
            ))}
        </View>
    );
}