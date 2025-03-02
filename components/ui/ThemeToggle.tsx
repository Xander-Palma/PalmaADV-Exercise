import { TouchableOpacity, Text } from "react-native";
import { useTheme } from "./BackgroundTheme";

export function ToggleButton(){
    const {theme, setTheme} = useTheme();

    const handleToggle = () => {
        setTheme({bgColor: theme.bgColor ===  "white" ? "black" : "white",
                 fontColor: theme.fontColor === "black" ? "white" : "black",
                 transition: ".5s",
                 text: theme.text === "Dark Mode" ? "Light Mode" : "Dark Mode"});         
    }

    return (
        <TouchableOpacity
         onPress={handleToggle}
         style={{
         borderStyle: "solid",
         borderWidth: 2,
         borderColor: theme.fontColor,
         padding: 10,
         borderRadius: 4,
         transitionDuration: theme.transition,
         maxHeight: 45,
         }}>
        <Text style={{
         color: theme.fontColor,
         transitionDuration: theme.transition,
         fontWeight: "bold"
        }}>{theme.text}</Text>
        </TouchableOpacity>
    );
}
