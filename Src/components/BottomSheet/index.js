import React, { Component } from "react";
import PropTypes from "prop-types";


import Icon from 'react-native-vector-icons/FontAwesome6'
import {
    View,
    KeyboardAvoidingView,
    Modal,
    TouchableOpacity,
    Animated,
    PanResponder,
    Platform,
    Text,
    Image
} from "react-native";
// import styles from "./style";
import { BottomSheetStyle } from "./BottomSheet.styles";
import { DefaultTheme, PaperProvider, Provider } from 'react-native-paper';
import { colors } from "../Colors";
import { windowWidth } from "../../utils/constants/Constants";

const SUPPORTED_ORIENTATIONS = [
    "portrait",
    "portrait-upside-down",
    "landscape",
    "landscape-left",
    "landscape-right"
];

export class BottomSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            animatedHeight: new Animated.Value(0),
            pan: new Animated.ValueXY()
        };

        this.createPanResponder(props);
    }

    setModalVisible(visible, props) {
        const { height, minClosingHeight, openDuration, closeDuration, onClose, onOpen } = this.props;
        const { animatedHeight, pan } = this.state;
        if (visible) {
            this.setState({ modalVisible: visible });
            if (typeof onOpen === "function") onOpen(props);
            Animated.timing(animatedHeight, {
                useNativeDriver: false,
                toValue: height,
                duration: openDuration
            }).start();
        } else {
            Animated.timing(animatedHeight, {
                useNativeDriver: false,
                toValue: minClosingHeight,
                duration: closeDuration
            }).start(() => {
                pan.setValue({ x: 0, y: 0 });
                this.setState({
                    modalVisible: visible,
                    animatedHeight: new Animated.Value(0)
                });

                if (typeof onClose === "function") onClose(props);
            });
        }
    }

    createPanResponder(props) {
        const { closeOnDragDown, height } = props;
        const { pan } = this.state;
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => closeOnDragDown,
            onPanResponderMove: (e, gestureState) => {
                if (gestureState.dy > 0) {
                    Animated.event([null, { dy: pan.y }], { useNativeDriver: false })(e, gestureState);
                }
            },
            onPanResponderRelease: (e, gestureState) => {
                if (height / 4 - gestureState.dy < 0) {
                    this.setModalVisible(false);
                } else {
                    Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
                }
            }
        });
    }

    open(props) {
        this.setModalVisible(true, props);
    }

    close(props) {
        this.setModalVisible(false, props);
    }

    render() {
        const {
            animationType,
            closeOnDragDown,
            dragFromTopOnly,
            closeOnPressMask,
            maskPress,
            closeOnPressBack,
            children,
            customStyles,
            keyboardAvoidingViewEnabled,
            title,
            notFullHeight,
            imageUri,
            isImage,
            isIcon
        } = this.props;
        const { animatedHeight, pan, modalVisible } = this.state;
        const panStyle = {
            transform: pan.getTranslateTransform()
        };

        const theme = {
            ...DefaultTheme,
            // roundness: 10,
            colors: {
                ...DefaultTheme.colors,
                primary: '#3498db',
                accent: '#f1c40f',
            },
        };
        return (
            <PaperProvider theme={theme} >
                <Modal
                    propagateSwipe={true}
                    transparent
                    animationType={animationType}
                    visible={modalVisible}
                    supportedOrientations={SUPPORTED_ORIENTATIONS}
                    onRequestClose={() => {
                        if (closeOnPressBack) this.setModalVisible(false);
                    }}
                >
                    <KeyboardAvoidingView
                        enabled={keyboardAvoidingViewEnabled}
                        behavior="padding"
                        style={[BottomSheetStyle.wrapper, customStyles.wrapper]}
                    >
                        <TouchableOpacity
                            style={BottomSheetStyle.mask}
                            activeOpacity={1}
                            // onPress={() => (closeOnPressMask ? this.close() : null)}
                            onPress={()=>{
                                if(closeOnPressMask){
                                    this.close()
                                    if (maskPress) {
                                        maskPress()
                                    }
                                }else{
                                    null
                                }
                            }}
                        />
                        <Animated.View
                            {...(!dragFromTopOnly && this.panResponder.panHandlers)}
                            style={[panStyle, BottomSheetStyle.container, { height: animatedHeight, borderTopRightRadius: notFullHeight ? 20 : 0, borderTopLeftRadius: notFullHeight ? 20 : 0 }, customStyles.container]}
                        >
                            {closeOnDragDown && (
                                <View
                                    {...(dragFromTopOnly && this.panResponder.panHandlers)}
                                    style={BottomSheetStyle.draggableContainer}
                                >
                                    <View style={[BottomSheetStyle.draggableIcon, customStyles.draggableIcon]} />
                                </View>
                            )}
                            {
                                closeOnDragDown || isImage ? (
                                    null
                                ) : (
                                    <View style={BottomSheetStyle.StatusContainer}>
                                        <View>
                                            <Text style={BottomSheetStyle.StatusText}>
                                                {title}
                                            </Text>
                                        </View>

                                        {isIcon == false ? (
                                            null
                                        ):
                                        (
                                            <TouchableOpacity onPress={() => this.close()} >
                                             <Icon
                                                name="circle-xmark"
                                                size={30}
                                                color={colors.graphTitleColor}
                                            />

                                        </TouchableOpacity>
                                        )}
                                        
                                    </View>
                                )
                            }
                            {
                                isImage && (
                                    
                                    <>
                                    <View style={{backgroundColor: 'rgba(52, 52, 52, 0.6)',padding:16}}>
                                        <Text></Text>
                                    </View>
                                    <View style={{justifyContent:"center", alignItems:"center", top:-50, }}>
                                        <Image
                                            source={imageUri ? {uri:imageUri} : require("../../assets/images/ProfileIcon.png")}
                                            style={{ width: windowWidth / 4, height: windowWidth / 4, borderRadius: windowWidth / 4 }}
                                            resizeMode='contain'
                                        />
                                    </View>
                                    </>

                                )

                            }

                            {children}
                        </Animated.View>
                    </KeyboardAvoidingView>
                </Modal>
            </PaperProvider>

        );
    }
}

BottomSheet.propTypes = {
    animationType: PropTypes.oneOf(["none", "slide", "fade"]),
    height: PropTypes.number,
    minClosingHeight: PropTypes.number,
    openDuration: PropTypes.number,
    closeDuration: PropTypes.number,
    closeOnDragDown: PropTypes.bool,
    isIcon:PropTypes.bool,
    closeOnPressMask: PropTypes.bool,
    maskPress: PropTypes.func,
    dragFromTopOnly: PropTypes.bool,
    closeOnPressBack: PropTypes.bool,
    keyboardAvoidingViewEnabled: PropTypes.bool,
    customStyles: PropTypes.objectOf(PropTypes.object),
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    children: PropTypes.node
};

BottomSheet.defaultProps = {
    animationType: "none",
    height: 260,
    minClosingHeight: 0,
    openDuration: 300,
    closeDuration: 200,
    closeOnDragDown: false,
    isIcon:true,
    dragFromTopOnly: false,
    closeOnPressMask: true,
    closeOnPressBack: true,
    keyboardAvoidingViewEnabled: Platform.OS === "ios" ? false : false,
    customStyles: {},
    onClose: null,
    onOpen: null,
    children: <View />
};

// export default RBSheet;