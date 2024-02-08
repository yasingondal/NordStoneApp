import {launchImageLibrary} from 'react-native-image-picker';
import { Toaster } from '../../../components/Toaster';


export const handleChoosePhoto = (setFile, onSelectFile) => {
    launchImageLibrary(
        {
            mediaType: 'photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            quality: 0.7,
            maxWidth: 800,
            maxHeight: 800,
            // includeBase64: true
            mimeTypes: ['image/png', 'image/jpg', 'image/jpeg','image/HEIC']
        },
        (response) => {
            
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const { assets } = response;
                if (assets && assets.length > 0) {
                    const selectedImage = assets[0];
                    const { fileSize } = selectedImage;
                    const maxSize = 3 * 1024 * 1024; // 3 MB in bytes
                    const allowedFileTypes = [
                      'image/png',
                      'image/jpeg',
                      'image/jpg',
                      'image/HEIC',
                    ];
                    if (fileSize <= maxSize && allowedFileTypes.includes(selectedImage.type)) {
                        setFile(selectedImage);
                        onSelectFile();
                    } else {
                        if (fileSize > maxSize){
                            Toaster({
                                Title: "Error",
                                description: "Size Cannot Exceed 3 mb",
                                type: "danger"
                            })
                        }else{
                            Toaster({
                                Title: "File type",
                                description: "Only jpg, jpeg and png are allowed",
                                type: "danger"
                            })
                        }
                        onSelectFile();
                        // Handle the case when the image size exceeds the limit
                    }
                }
                // setFile(response.assets[0])
                // onSelectFile()
            }
        },
    );
};
