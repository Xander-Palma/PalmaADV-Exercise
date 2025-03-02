import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
export default function exerciseHome(){

    const Links = [
        {to: "/screens/usestate" as const,
         name: "UseState screen"},

        {to: "/screens/useeffect" as const,
         name: "UseEffect screen"},
    ]

    return (
        <View style={style.container}>
        {Links.map((link, i) => (
            <Link key={i} href={`${link.to}`} style={style.buttons}>
                <Text>{link.name}</Text>
            </Link>
        ))}
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        backgroundColor: '#1399a3'
    },
    buttons: {
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#00deee",
        backgroundColor:"#00deee",
        padding: 10,
        fontSize: 50,
        borderRadius: 10,
    }
})