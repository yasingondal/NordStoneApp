import DocumentPicker from 'react-native-document-picker'
import { Toaster } from '../../../components/Toaster';

export const handleChooseDocument = async (setFile, onSelectFile) => {
    try {
        let types = [
            DocumentPicker.types.pdf,
        ]
        const res = await DocumentPicker.pickSingle({
            type: types,
        });
        const { size } = res;
        if (size <= 5 * 1024 * 1024) {
            setFile(res);
            onSelectFile();
        } else {
            Toaster({
                Title:"Error",
                description:"Size Cannot Exceed 5 mb",
                type:"danger"
            })
            onSelectFile();
        }
    } catch (error) {
        console.error('Error picking files:', error);
    }
};