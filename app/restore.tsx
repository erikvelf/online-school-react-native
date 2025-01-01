import { View, Text } from "react-native";
import { Link, Stack } from "expo-router";
import { Colors } from "../shared/tokens";

export default function Restore() {

    return (
        <View>
            <Link href={'/'}>
                <Text style={{color: 'white'}}>Restore password</Text>
            </Link>
        </View>
    )
}
