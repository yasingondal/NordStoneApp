import { Image } from 'react-native';
import { showMessage } from 'react-native-flash-message';

export const Toaster = ({ Title, description, type, image }) => {
    showMessage({
        message: Title,
        description: description,
        type: type,
        textStyle: { fontSize: 12, fontFamily: "Inter-Light" },
        titleStyle: { fontSize: 15, fontFamily: "Inter-Bold" },
    })
};