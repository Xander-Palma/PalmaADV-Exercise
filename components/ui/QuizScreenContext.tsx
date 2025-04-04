import { View, Text, TouchableOpacity } from "react-native";
import { ToggleButton } from "./ThemeToggle";
import { useTheme } from "./BackgroundTheme";
import { useState, useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from "react-native-paper";
import { router } from "expo-router";
import he from 'he';

export default function QuizScreenContent(){
    const { theme } = useTheme(); 
    // const [reloadScreen, setReloadScreen] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isNext, setIsTonext] = useState(false);
    const [minimumInput, setMinimumInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [quizIndex, setQuizIndex] = useState<number>(0);
    const [quizData, setQuizData] = useState<any[]>([]);
    const [currentQuizData, setCurrentQuizData] = useState<any | null>(null);
    const [shuffleCurrentAnswers ,setShuffleCurrentAnswers] = useState<string[]>([]);
    const [displayAnswer, setDisplayAnswer] = useState<String | null>("");
    const [correctAnswerIncrementor, setCorrectAnswerIncrementor] = useState<number>(0);
    const [inCorrectAnswerIncrementor, setInCorrectAnswerIncrementor] = useState<number>(0);
    const [isUsersAlreadyClicked, setIsUsersAlreadyClicked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    // the data will be stored in this variable after the handleClickGenerate gets click
    // const toDisplayQuizData = quizData?.length > 0 && quizData[quizIndex]; 

    useEffect(() => {
        // since i need to display the quiz with corresponding index
        // i need to store it again to a another state
        if (quizData.length > 0 && quizIndex < quizData.length) {
            console.log("Data: ", quizData[quizIndex]);
    
            const currentQuiz = quizData[quizIndex] ?? {};
            setCurrentQuizData(currentQuiz);
    
            if (currentQuiz.correct_answer) {
                console.log("Correct answer: ", currentQuiz.correct_answer);
                const shuffleAns = [...(currentQuiz.incorrect_answers ?? []), currentQuiz.correct_answer].sort(
                    () => Math.random() - 0.5
                );
                setShuffleCurrentAnswers(shuffleAns);
                console.log("Shuffled Answers:", shuffleAns);
            }
        }
    },[quizIndex, quizData]);

    const handleClickQuizAttempt = async () => {
        // when the users click the "attempt quiz"
        // it will directly go the next part
        setIsLoading(true);
        console.log("clicked: go to the next!");
        await new Promise(res => setTimeout(res,1000));
        setIsLoading(false); 
        setIsTonext(true);
    };


    const handleClickGenerate = async () => {
        try{
            if(minimumInput.trim() === "") return setErrorMessage("Invalid input! please enter a Number!");
            const toInt = parseInt(minimumInput);
            
            if(isNaN(toInt)) {return setErrorMessage("Invalid input! must be a number!")}
            else {
                if(toInt >= 10 && toInt <= 30){
                    // indicates that the user's input generate a proper amount
                    setIsLoading(true);
                    const response = await fetch(`https://opentdb.com/api.php?amount=${toInt}`);
                    await new Promise(res => setTimeout(res,1000));
                    const data = await response.json();
                    setIsLoading(false);
                    setQuizData(data.results);
                    setErrorMessage("");
                    console.log("welcome to quiz!");
                }
                else{
                    setErrorMessage("Invalid input! it must generate between 10 to 30")
                }
            }
        }catch(err) {
            console.log(err);
        }
    }

    const handleNextClickDisplayQuiz = async (usersAnswer: any) => {
        setIsUsersAlreadyClicked(true);

        // checks if the user's answer is correct
        console.log("Users Answer: ", usersAnswer);
        console.log("Correct Answer from QuizData: ", quizData[quizIndex]?.correct_answer);
        console.log("Correct Answer from currentQuiz: ", currentQuizData?.correct_answer);
        if(quizData[quizIndex] && quizData[quizIndex].correct_answer === usersAnswer) {
            setDisplayAnswer("Correct!");
            setCorrectAnswerIncrementor(prev => prev+1);
            setIsCorrect(true);
        }
        else{
            setDisplayAnswer("Wrong!");
            setInCorrectAnswerIncrementor(prev => prev+1);
            setIsCorrect(false);
        }

        // add some delays
        await new Promise(res => setTimeout(res,2000));
        setIsLoading(true);
        await new Promise(res => setTimeout(res,2000));
        if(quizIndex < quizData.length){
            setQuizIndex((prev: any) => prev +1);
            setDisplayAnswer("");
            setIsUsersAlreadyClicked(false);
            setIsLoading(false);
        }
    }



    return (
        <View 
            style={{
            flex: 1,
            backgroundColor: "#7DF9FF",
            padding: 20,
            transitionDuration: theme.transition
        }}>

            {/* nav-lists */}
            <View style={{
                backgroundColor: "#7DF9FF",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                transitionDuration: theme.transition
            }}>
                <Text style={{
                    fontSize: 23,
                    fontFamily: "sans-serif",
                    color: theme.fontColor,
                    transitionDuration: theme.transition,
                    fontWeight: "bold"
                }}>Random Quiz</Text>
                
            </View>
                
                {/* hero contents */}
                <View style={{justifyContent: "center",alignItems: "center",flex: 1, padding: 10}}>
                    {isLoading ? (
                        <Text style={{ fontSize: 23,
                            fontFamily: "sans-serif",
                            color: theme.fontColor,
                            transitionDuration: theme.transition,
                            fontWeight: "bold"
                            }}>Loading...</Text>
                    ) : (
                        <>
                        {!isNext ? (
                                <TouchableOpacity style={{
                                flexDirection: "row",
                                gap: 4,
                                justifyContent: "center",
                                alignItems: "center",
                                borderStyle: "solid",
                                borderWidth: 2,
                                borderColor: theme.fontColor,
                                padding: 10,
                                width: "45%",
                                borderRadius: 10
                            }}
                            onPress={() => handleClickQuizAttempt()}
                            >
                                <Text style={{
                                    fontFamily: "sans-serif",
                                    color: theme.fontColor,
                                    transitionDuration: theme.transition,
                                    fontWeight: "bold",
                                    fontSize:25,
                                    }}>
                                    Start Quiz
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <>
                            {isLoading ? (
                                <Text style={{
                                    fontFamily: "sans-serif",
                                    color: "red",
                                    transitionDuration: theme.transition,
                                    fontWeight: "bold"
                                }}>Loading....</Text>
                                ) : (
                                    <>
                                    {/* if quiz data doesn't have a value */}
                                    { quizData.length <= 0 ? (
                                        <View style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            // padding: 20,
                                            gap: 10
                                        }}>
                                        <Text style={{
                                            fontFamily: "sans-serif",
                                            color: theme.fontColor,
                                            transitionDuration: theme.transition,
                                            fontWeight: "bold",
                                            fontSize: 25
                                        }}>Attention:</Text>
                                        <Text style={{
                                            fontFamily: "sans-serif",
                                            color: theme.fontColor,
                                            transitionDuration: theme.transition,
                                            fontWeight: "bold",
                                            fontSize: 16,
                                         
                                            textAlign: "center"
                                        }}>Select a number between 10 - 30 random questions</Text>
                                        <View style={{marginVertical: 8, flexDirection: "row", gap: 12}}>
                                        <TextInput 
                                            mode="outlined"
                                            value={minimumInput}
                                            placeholder="Number"
                                            onChangeText={value => setMinimumInput(value)}
                                            activeOutlineColor={minimumInput.trim() === "" ? "red" : "green"}
                                            style={{
                                                height: 50,
                                                width: "50%"               
                                            }}/>
                                            <TouchableOpacity 
                                            onPress={() => handleClickGenerate()}
                                            style={{
                                                flexDirection: "row",
                                                gap: 4,
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderStyle: "solid",
                                                borderWidth: 2,
                                                borderColor: theme.fontColor,
                                                padding: 10,
                                                width: "32%",
                                                borderRadius: 6,
                                                height: 50
                                                }}>
                                                <Text style={{
                                                    fontFamily: "sans-serif",
                                                    color: theme.fontColor,
                                                    transitionDuration: theme.transition,
                                                    fontWeight: "bold",
                                                }}>Start</Text>
                                                <AntDesign name="arrowright" color={theme.fontColor} size={25} />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={{
                                            fontFamily: "sans-serif",
                                            color: "red",
                                            transitionDuration: theme.transition,
                                            fontWeight: "bold"
                                        }}> {errorMessage} </Text>
                                        </View>
                                  ) : (
                                //   quiz part
                                //   if quiz data has a value will render this part
                                    <View style={{
                                        
                                        width: "100%",
                                        padding: 25,
                                        borderStyle: "solid",
                                        borderColor: theme.fontColor,
                                        borderWidth: 2,
                                        borderRadius: 8
                                    }}>
                                 
                                    {currentQuizData && quizIndex < quizData.length ?  (
                                        <> 
                                        <View 
                                        style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                        }}>

                                        {/* current question number */}
                                        <Text style={{
                                              textAlign: "center",
                                              fontFamily: "sans-serif",
                                              color: theme.fontColor,
                                              transitionDuration: theme.transition,
                                              fontWeight: "bold",
                                              fontSize: 20
                                        }}>{`${quizIndex+1}/${minimumInput}`}</Text>

                                        {/* current category type  */}
                                        <Text style={{
                                            textAlign: "center",
                                            fontFamily: "sans-serif",
                                            color: theme.fontColor,
                                            transitionDuration: theme.transition,
                                            fontWeight: "bold",
                                            fontSize: 20
                                        }}>{he.decode(currentQuizData?.category)}</Text>
                                        </View>

                                        {/* current question */}
                                        <View style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: 10,
                                            marginTop: 50,
                                        }}>
                                            <Text style={{
                                            textAlign: "center",
                                            fontFamily: "sans-serif",
                                            color: theme.fontColor,
                                            transitionDuration: theme.transition,
                                            fontWeight: "bold",
                                            fontSize: 25
                                            }}>{he.decode(currentQuizData?.question)}</Text>
                                        </View>
                                            
                                        {/* current multiple choices */}
                                        {shuffleCurrentAnswers.map((ans: any, index: any) => (
                                            <TouchableOpacity 
                                                onPress={() => handleNextClickDisplayQuiz(ans)}
                                                disabled={isUsersAlreadyClicked ? true : false}
                                                key={index}
                                                style={{
                                                flexDirection: "column",
                                                borderStyle: "solid",
                                                borderWidth: 2,
                                                borderColor: theme.fontColor,
                                                transitionDuration: theme.transition,
                                                padding: 10,
                                                marginVertical: 6,
                                                marginTop: index === 0 ? 20 : null,
                                                borderRadius: 8,
                                                width:700,
                                                alignSelf:"center",
                                            }}>
                                                <Text style={{
                                                textAlign: "center",
                                                fontFamily: "sans-serif",
                                                color: theme.fontColor,
                                                transitionDuration: theme.transition,
                                                fontWeight: "bold",
                                                fontSize: 20
                                                }}>{he.decode(ans)}</Text>
                                              </TouchableOpacity>
                                            ))}
                                        
                                         {/* current display answer */}
                                          <Text style={{
                                             textAlign: "center",
                                             fontFamily: "sans-serif",
                                             color: isCorrect ? "green" : "red",  
                                             fontWeight: "bold",
                                             marginTop: 10,
                                             fontSize: 18
                                          }}>{displayAnswer}</Text>
                                        </>  
                                      ) : (
                                        <View style={{alignItems: "center",gap: 10 }}>
                                        <Text style={{
                                        textAlign: "center",
                                        fontFamily: "sans-serif",
                                        color: theme.fontColor,
                                        transitionDuration: theme.transition,
                                        fontWeight: "bold",
                                        fontSize: 30,
                                        }}>Quiz ended! you got</Text>

                                        <Text style={{
                                        textAlign: "center",
                                        fontFamily: "sans-serif",
                                        color: theme.fontColor,
                                        transitionDuration: theme.transition,
                                        fontWeight: "bold",
                                        fontSize: 25,
                                        }}>{`${correctAnswerIncrementor}/${quizData.length} Correct answers`}</Text>

                                        <Text style={{
                                        textAlign: "center",
                                        fontFamily: "sans-serif",
                                        color: theme.fontColor,
                                        transitionDuration: theme.transition,
                                        fontWeight: "bold",
                                        fontSize: 25,
                                        }}>{`${inCorrectAnswerIncrementor}/${quizData.length} Incorrect answers`}</Text>

                                        <TouchableOpacity 
                                            onPress={() => router.push("/(tabs)/exercise")}
                                            style={{
                                            borderRadius: 6,
                                            borderStyle: "solid",
                                            borderWidth: 2,
                                            borderColor: theme.fontColor,
                                            transitionDuration: theme.transition,
                                            padding: 10,
                                            width: 400,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            
                                        }}>
                                            <Text style={{
                                            textAlign: "center",
                                            fontFamily: "sans-serif",
                                            color: theme.fontColor,
                                            transitionDuration: theme.transition,
                                            fontWeight: "bold",
                                            fontSize: 25,
                                            }}>Press to Try Again</Text>
                                        </TouchableOpacity>
                                        </View>
                                      )} 
                                </View>
                                )}
                            </>
                         )}
                    </>
                )}
            </>
        )}                
    </View>
</View>
);
}