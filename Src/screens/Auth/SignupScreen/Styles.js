import { StyleSheet, Dimensions } from "react-native"

const { height } = Dimensions.get('screen');

export default StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    innerContainer: { padding: 15, justifyContent: 'center', height: height * 0.9, backgroundColor: '#fff' },
    logoStyling: { alignSelf: 'center', height: 80, resizeMode: 'contain' },
    welcomeText: { fontFamily: 'Piazzolla-Bold', fontSize: 32, color: '#0098D9', letterSpacing: 1, alignSelf: 'center', marginTop: 10 },
    labelStyling: { fontFamily: 'Poppins-Regular', fontSize: 14, letterSpacing: 1, color: '#000' },
    iconStyling: { marginHorizontal: 10, width: 20, height: 20, resizeMode: 'contain' },
    inputFieldStyling: { fontFamily: 'Poppins-Regular', padding: 0, paddingTop: 4, flex: 1, color: '#000' },
    inputFieldContainer: { flexDirection: 'row', borderWidth: 1, borderRadius: 10, borderColor: '#B7BFCC', alignItems: 'center', padding: 5, marginVertical: 5 },
    loginBtn: { backgroundColor: '#0098D9', padding: 10, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginVertical: 10 },
    textLoginBtn: { color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 16, letterSpacing: 1 },
    forgetPassword: { fontFamily: 'Poppins-Medium', color: '#1c1c1c', letterSpacing: 1 }
})