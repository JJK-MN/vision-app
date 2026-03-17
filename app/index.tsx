import { Text, View } from "react-native";
import CameraButton from "../components/CameraButton";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Vision App</Text>
      <CameraButton />
    </View>
  );
}
