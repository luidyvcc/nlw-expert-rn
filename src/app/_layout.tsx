import { Slot } from "expo-router";
import { SafeAreaView } from "react-native";
import {
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    useFonts,
} from "@expo-google-fonts/inter";
import { Loader } from "@/components/loader";

export default function Layout() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
    });

    if (!fontsLoaded) {
        return <Loader />
    }

    return (
        <SafeAreaView className="bg-slate-900 flex-1">
            <Slot />
        </SafeAreaView>
    );
}