import * as React from 'react';
import { TouchableOpacity, Text, View, Image, ImageBackground } from 'react-native';
import { colors } from '../Colors';
import { CustomButton } from '../CustomButton';
import Icon from 'react-native-vector-icons/FontAwesome6'
import { handleChooseDocument } from '../../services/GlobalFunctions/HandleChooseDocument';
import { handleChoosePhoto } from '../../services/GlobalFunctions/HandleChoosePhotos';
import { handleTakePhoto } from '../../services/GlobalFunctions/HandleTakePhotos';

export const PickImage = ({ setFile, onSelectFile, isDocument, isOnlyDocument, isResumeOnly }) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {
                isOnlyDocument ? (
                    null
                ) : (
                    <View>
                        <CustomButton title={"Take Photo"} source={isDocument ? require("../../assets/images/Camera.png") : require("../../assets/images/Camera.png")} padding={13.875} backgroundColor={isDocument ? "white" : colors.PrimaryColor} textColor={isDocument ? colors.titleDataColor : "white"} border={isDocument ? 1 : 0} borderColor={colors.borderColor} onPress={() => handleTakePhoto(setFile, onSelectFile)} />
                        <CustomButton title={"Choose from gallery"} source={require("../../assets/images/Gallery.png")} padding={13.875} backgroundColor={"white"} textColor={colors.titleDataColor} border={1} borderColor={colors.borderColor} onPress={() => handleChoosePhoto(setFile, onSelectFile)} />
                    </View>

                )
            }

            {
                isDocument && (
                    <CustomButton title={"Upload a Document"} source={require("../../assets/images/Attachment.png")} padding={13.875} backgroundColor={"white"} textColor={colors.titleDataColor} border={1} borderColor={colors.borderColor} onPress={() => handleChooseDocument(setFile, onSelectFile, isResumeOnly)} />
                )
            }
        </View>
    );
};