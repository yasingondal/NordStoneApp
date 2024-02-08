import DocumentPicker from 'react-native-document-picker'
import { Toaster } from '../../../components/Toaster';




export const handleChooseDocumentMultiple = async (setFile, onSelectFile, length) => {
    try {
        let types = [
            DocumentPicker.types.pdf,
        ]
        const res = await DocumentPicker.pick({
            allowMultiSelection: true,
            type: types,
        });
        if (res.length <= 2 - length ) {
            for (let i = 0; i < res.length; i++) {
                const fileSize = res[i].size > 4194304;
                if (fileSize) {
                    Toaster({
                        Title: "Error",
                        description: "Size Cannot Exceed 5 mb",
                        type: "danger"
                    })
                } else {
                    setFile(res)
                    onSelectFile();
                }
            }
        } else {
            Toaster({
                Title: "Error",
                description: "Maximum 2 files are allowed",
                type: "danger"
            })
            onSelectFile();
        }
    
    } catch (error) {
        console.error('Error picking files:', error);
    }
};