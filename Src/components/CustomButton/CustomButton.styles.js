import { PixelRatio, StyleSheet } from "react-native";
import { windowWidth } from "../../utils/constants/Constants";


export const CustomButtonStyle = StyleSheet.create({
    Button:{
        justifyContent: 'center', alignItems: 'center', shadowOffset: {
          width: 0, height: 0.2
        }, shadowOpacity: 9, marginTop: 10, shadowRadius: 3,
      },
      ButtonContainer: { justifyContent: "center", flexDirection: "row", alignItems: "center", },
      ButtonTitle:{ fontFamily: "Inter-Medium", fontSize: 16, marginHorizontal: 10 },
      ButtonImage:{
        width: windowWidth / 24,
        height: windowWidth / 24,
        resizeMode: "contain",
      }
})