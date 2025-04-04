import { ThemeProvider } from "@/components/ui/BackgroundTheme";
import QuizScreenContent from "@/components/ui/QuizScreenContext";

export default function QuizScreen(){
    return (
        <ThemeProvider>
            <QuizScreenContent />
        </ThemeProvider>
    );
}