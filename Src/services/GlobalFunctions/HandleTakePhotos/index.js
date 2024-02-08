import { launchCamera } from "react-native-image-picker";
import { Toaster } from "../../../components/Toaster";


export const handleTakePhoto = (setFile, onSelectFile) => {
    launchCamera(
        {
            mediaType: 'photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            quality:0.7,
            maxWidth:800,
            maxHeight:800
            // includeBase64: true
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
                    
                    const maxSize = 3 * 1024 * 1024; // 5 MB in bytes

                    const allowedFileTypes = [
                      'image/jpeg',
                      'image/jpg',
                      'image/png',
                      'image/HEIC',
                    ];
                    if (fileSize <= maxSize && allowedFileTypes.includes(selectedImage.type)) {
                        setFile(selectedImage);
                        onSelectFile();
                    } else {
                        if (fileSize > maxSize) {
                            // ShowToast("error", "Size cannot exceed 5 mb");
                            Toaster({
                                Title: "Error",
                                description: "Size Cannot Exceed 3 mb",
                                type: "danger"
                            })
                        } else {
                            Toaster({
                                Title: "File type",
                                description: "Only jpg, jpeg and png are allowed",
                                type: "danger"
                            })
                        }
                        // Handle the case when the image size exceeds the limit
                    }
                }
                // setFile(response.assets[0]);
                // onSelectFile()
            }
        },
    );
};