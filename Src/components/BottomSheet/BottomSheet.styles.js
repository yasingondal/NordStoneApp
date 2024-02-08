import { PixelRatio, StyleSheet } from "react-native";


import { colors } from "../Colors";
import { windowWidth } from "../../utils/constants/Constants";


export const BottomSheetStyle = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#00000077"
    },
    mask: {
        flex: 1,
        backgroundColor: "transparent"
    },
    container: {
        backgroundColor: "#fff",
        height: 0,
        overflow: "hidden",
        marginHorizontal:12,
    },
    draggableContainer: {
        width: "100%",
        alignItems: "center",
        backgroundColor: "transparent"
    },
    draggableIcon: {
        width: 35,
        height: 5,
        borderRadius: 5,
        margin: 10,
        backgroundColor: "#fff"
    },
    StatusContainer: {
        padding: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: colors.borderColor,
        alignItems: 'center',
    },
    StatusText: { fontSize: 18, fontFamily: "Inter-SemiBold", color:"#000"},
    CloseButton: { width: windowWidth / 15, height: windowWidth / 15 }
})