import { View } from "react-native";
import CameraButton from "../components/CameraButton";

function onPressLearnMore() {
  console.log("Learn more button pressed");
}

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
