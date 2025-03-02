import { ThemeProvider } from "@/components/ui/BackgroundTheme";
import { CrudScreenContent } from "@/components/ui/CrudScreenContext";

export default function CrudScreen(){

    return (
        <ThemeProvider>
            <CrudScreenContent />
        </ThemeProvider>
    );
}