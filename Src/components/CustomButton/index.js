import * as React from 'react';
import { TouchableOpacity, Text, View, Image, PixelRatio } from 'react-native';

import { colors } from '../Colors';
import { CustomButtonStyle } from './CustomButton.styles';
import Icon from 'react-native-vector-icons/FontAwesome6'
import { windowWidth } from '../../utils/constants/Constants';
export const CustomButton = ({ onPress, title, source, size, backgroundColor, border, borderColor, textColor, borderRadius, shadowColor, padding, height, iconName, fontSize, ...props }) => {

  return (
    <TouchableOpacity {...props} onPress={onPress ? onPress : null} style={[CustomButtonStyle.Button, {
      backgroundColor: backgroundColor ? backgroundColor : colors.PrimaryColor, padding: padding ? padding : 12, width: size ? size : windowWidth / 1.1, borderRadius: borderRadius ? borderRadius : 6, height: height ? height : 60, shadowColor: shadowColor ? shadowColor : "#fff", borderWidth: border ? border : null, borderColor: borderColor ? borderColor : null
    }]}>
      <View style={CustomButtonStyle.ButtonContainer}>
        {
          source ? (
            <Image
              style={CustomButtonStyle.ButtonImage}
              source={source}
            />
          ) : null
        }

        {
          iconName ? (
            <Icon
              name={iconName}
              size={windowWidth / 22}
              color={colors.White}
            />
          ) : null
        }


        <Text style={[CustomButtonStyle.ButtonTitle, { color: textColor ? textColor : "#fff", fontSize: fontSize ? fontSize : 14 }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};