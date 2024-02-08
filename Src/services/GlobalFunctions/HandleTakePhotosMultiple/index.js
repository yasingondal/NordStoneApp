import { launchCamera } from "react-native-image-picker";
import { Toaster } from "../../../components/Toaster";


export const handleTakePhotoMultiple = (setFile, onSelectFile) => {
    launchCamera(
        {
            mediaType: 'photo',
            selectionLimit: 2,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            quality: 0.7,
            maxWidth: 800,
            maxHeight: 800
            // includeBase64: true
            // mimeTypes: ['image/png', 'image/jpg', 'image/jpeg', 'image/HEIC']
        },
        (response) => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const { assets } = response;
                let attachment = []
                if (assets && assets.length > 0) {
                    for (let i = 0; i < assets.length; i++) {
                        // const fileSize = assets[i].size > 4194304;
                        const selectedImage = assets[i]
                        const { fileSize } = selectedImage
                        const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
                        const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
                        if (fileSize <= maxSize && allowedFileTypes.includes(selectedImage.type)) {
                            attachment.push(selectedImage)
                        } else {
                            if (fileSize > maxSize) {
                                Toaster({
                                    Title: "Error",
                                    description: "Size Cannot Exceed 5 mb",
                                    type: "danger"
                                })
                            } else {
                                Toaster({
                                    Title: "File type",
                                    description: "Only jpg, jpeg and png are allowed",
                                    type: "danger"
                                })
                            }
                        }
                        setFile(attachment)
                        onSelectFile()
                    }
                    // const selectedImage = assets[0];
                    // const { fileSize } = selectedImage;
                    // const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
                    // const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
                    // if (fileSize <= maxSize && allowedFileTypes.includes(selectedImage.type)) {
                    //     console.log("SELECTED FILE", selectedImage)
                    //     setFile(selectedImage);
                    //     onSelectFile();
                    // } else {
                    //     console.log('Image size exceeds the limit');
                    //     if (fileSize > maxSize) {
                    //         console.log('Size cannot exceed 5 mb')
                    //         Toaster({
                    //             Title: "Error",
                    //             description: "Size Cannot Exceed 5 mb",
                    //             type: "Error"
                    //         })
                    //     } else {
                    //         console.log('Only jpg, jpeg and png are allowed')
                    //     }
                    //     onSelectFile();
                    //     // Handle the case when the image size exceeds the limit
                    // }
                }
                // setFile(response.assets[0])
                // onSelectFile()
            }
        },
    );
};