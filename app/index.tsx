import { View } from "react-native";
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
      
      <CameraButton />
    </View>
  );
}
