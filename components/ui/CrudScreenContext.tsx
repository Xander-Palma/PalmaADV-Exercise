import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import React, { useReducer, useState } from "react";
import { taskBtns } from "@/app/utils/hooksButtons";
import { AntDesign } from "@expo/vector-icons";

function reducer(state: any, action: any) {
    switch (action.type) {
        case "add":
            return [...state, action.payload];
        case "edit":
            return state.map((task: string, index: number) => 
                index === action.payload.index ? action.payload.newTask : task
            );
        case "remove":
            return state.filter((_, index: number) => index !== action.payload.toRemoveIndex);
        default:
            return state;
    }
}

export function CrudScreenContent() {
    const [task, setTask] = useState("");
    const [tasks, dispatch] = useReducer(reducer, []);
    const [newTask, setNewTask] = useState("");
    const [editIsClicked, setIsEditClicked] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleAddTask = (addNewTask: string) => {
        if (task.trim() !== "") {
            dispatch({ type: "add", payload: addNewTask });
            setTask("");
        }
    };

    const handleSaveNewTask = (NewTask: string, Index: number) => {
        setIsEditClicked(true);
        setEditingIndex(Index);
        if (NewTask.trim() !== "") {
            dispatch({ type: "edit", payload: { index: Index, newTask: NewTask } });
            setIsEditClicked(false);
            setEditingIndex(null);
            setNewTask("");
        }
    };

    const handleRemoveTask = (Task: string, Index: number) => {
        dispatch({ type: "remove", payload: { toRemoveIndex: Index } });
        setEditingIndex(null);
        setIsEditClicked(false);
    };

    return (
        <View style={{ backgroundColor: "#1092b8", padding: 20, flex: 1 }}>
            {/* Header */}
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 50, fontFamily: "sans-serif", color: "#000", fontWeight: "bold", alignSelf: "center" }}>
                    To Do List
                </Text>
            </View>
    
            {/* Main Content */}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ padding: 20, borderRadius: 10, marginTop: 50, gap: 30, borderColor: "#000", borderWidth: 2, backgroundColor: "#ADD8E6" }}>
                    {/* Input and Add Button */}
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 20 }}>
                        <TextInput
                            style={{ flex: 1, backgroundColor: "#fff" }} // Keeps input white for contrast
                            value={task}
                            placeholder="Enter task"
                            mode="outlined"
                            onChangeText={(value) => setTask(value)}
                            activeOutlineColor={task.trim() === "" ? "red" : "green"}
                        />
                        <TouchableOpacity
                            onPress={() => handleAddTask(task)}
                            style={{ borderWidth: 2, borderColor: "#000", padding: 16.5, borderRadius: 4, backgroundColor: "#ADD8E6" }}
                            disabled={task.trim() === ""}
                        >
                            <Text style={{ color: "#000", fontWeight: "bold" }}>Add Task</Text>
                        </TouchableOpacity>
                    </View>
    
                    {/* Task List */}
                    {tasks.map((task: string, index: number) => (
                        <View key={index} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 2, borderColor: "#000", padding: 12, paddingHorizontal: 30, borderRadius: 4, backgroundColor: "#ADD8E6" }}>
                            {editIsClicked && editingIndex === index ? (
                                <TextInput
                                    style={{ height: 45, width: "60%", padding: 2, backgroundColor: "#fff" }}
                                    placeholder="Enter a new task"
                                    mode="outlined"
                                    value={newTask}
                                    onChangeText={(value) => setNewTask(value)}
                                    activeOutlineColor={newTask.trim() === "" ? "red" : "green"}
                                />
                            ) : (
                                <Text style={{ color: "#000", fontSize: 24, fontWeight: "500" }}>{task}</Text>
                            )}
    
                            <View style={{ flexDirection: "row", gap: 5 }}>
                                {taskBtns("#000").map((btn) => (
                                    <TouchableOpacity
                                        onPress={() => (btn.name === "Edit" ? handleSaveNewTask(newTask, index) : handleRemoveTask(task, index))}
                                        key={btn.id}
                                        disabled={editIsClicked && editingIndex === index && btn.name === "Edit" && newTask.trim() === ""}
                                        style={{ alignItems: "center", justifyContent: "center", height: 45 }}
                                    >
                                        <Text style={{ color: "#000" }}>
                                            {editIsClicked && editingIndex === index && btn.name === "Edit" ? (
                                                <AntDesign name="save" color="#000" size={35} />
                                            ) : (
                                                btn.icon
                                            )}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
    
}
