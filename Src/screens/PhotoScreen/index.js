import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import { windowHeight, windowWidth } from '../../utils/constants/Constants';
import { BottomSheet } from '../../components/BottomSheet';
import { colors } from '../../components/Colors';
import { CustomButton } from '../../components/CustomButton';
import { PickImage } from '../../components/PickImage';
import storage from '@react-native-firebase/storage';
import { Toaster } from '../../components';

export const PhotoScreen = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [isloading, setIsloadings] = useState(false);

  const addPhotosRef = useRef();

  const addPhotosHandler = useCallback(() => {
    addPhotosRef.current.open();
  }, []);

  const handleuploadImage = async () => {
    addPhotosRef.current.close();
    setIsloadings(true)
    // if (file) {
     


      try {

        const reference = storage().ref(`images/${file.fileName}`);
        let filePath = file.uri;
        if (Platform.OS === 'android' && !filePath.startsWith('file://')) {
          filePath = `file://${file.uri}`;
        }

        reference.putFile(filePath)
          .then(() => {
            setIsloadings(false)
            setFile(null)
            console.log('Image uploaded successfully!');
            Toaster({
              Title: "Success",
              description: "Image uploaded Successfully",
              type: "success",
            })

            fetchImages();
          })
      } catch (error) {
        console.log("error:",error)
        // Toaster({
        //   Title: "Error",
        //   description: "Failed to upload image. Please try again",
        //   type: "danger",
        // })
      }



      // .catch((error) => {
      //   setIsloadings(false)
      //   Toaster({
      //     Title: "Error",
      //     description: "Failed to upload image. Please try again",
      //     type: "danger",
      //   })
      //   console.error('Error uploading image: ', error);

      // });
    // } else {
    //   setIsloadings(false)
    //   Toaster({
    //     Title: "Error",
    //     description: "Failed to upload image. Please try again",
    //     type: "danger",
    //   })
    // }
  };



  const fetchImages = async () => {
    setIsloadings(true);
    try {
      const result = await storage().ref('images').listAll();
      const imageUrls = [];
      await Promise.all(result.items.map(async (itemRef) => {
        const url = await itemRef.getDownloadURL();
        imageUrls.push(url);
      }));
      setImages(imageUrls);
    } catch (error) {
      setIsloadings(false)
      console.error('Error fetching images: ', error);
      Toaster({
        Title: "Error",
        description: "Failed to fetch images. Please try again later",
        type: "danger",
      })

    } finally {
      setIsloadings(false);
    }
  };


  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    handleuploadImage()
  }, [file]);



  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.image} />
  );

  return (
    <>
      <View style={styles.container}>
        {isloading ? (
          <View style={{ width: windowWidth, height: windowHeight, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text>Please Wait...</Text>
          </View>

        ) : (
          <FlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>

      <View>
        <TouchableOpacity
          style={{ position: 'absolute', right: windowWidth / 20, bottom: windowHeight / 12, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.PrimaryColor }}
          onPress={addPhotosHandler}
        >
          <Text style={{ fontSize: 30, color: '#fff', paddingHorizontal: 25, paddingVertical: 12 }}>+</Text>
        </TouchableOpacity>
      </View>


      <BottomSheet
        ref={addPhotosRef}
        height={windowHeight / 3.5}
        openDuration={300}
        notFullHeight={true}
        title={'Add Photos'}
      >
        <PickImage
          setFile={setFile}
          onSelectFile={async () => {
            // handleuploadImage();
            console.log("clciked")
          }}
        />
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  image: {
    width: Dimensions.get('window').width / 2 - 16,
    height: 150,
    margin: 8,
    borderRadius: 8,
  },
});


