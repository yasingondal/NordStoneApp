import React, { useCallback, useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert, ActivityIndicator } from 'react-native';
import { windowHeight, windowWidth } from '../../utils/constants/Constants';
import { BottomSheet } from '../../components/BottomSheet';
import { CustomButton } from '../../components/CustomButton';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import { Toaster, colors } from '../../components';

export const TextScreen = ({ name, description, priority }) => {
  const addPhotosRef = useRef();
  // const titleRef = useRef(null);
  // const descriptionRef = useRef(null);

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [loading, setLoading] = useState(false)
  const [notes, setNotes] = useState([]);



  useEffect(() => {
    fetchNotes();
  }, []);

  const addPhotosHandler = useCallback(() => {
    addPhotosRef.current.open();
  }, []);

  const saveNote = () => {
    // const title = titleRef.current?.value;
    // const description = descriptionRef.current?.value;

    if (title && desc) {
      addPhotosRef.current.close();
      setLoading(true)
      firestore()
        .collection('Notes')
        .add({
          title: title,
          description: desc,
        })
        .then(() => {
          console.log('Note added!');
          setLoading(false)
          fetchNotes();
          Toaster({
            Title: "Success",
            description: "Note Added Successfully.",
            type: "success",
          })
          
        })
        .catch((error) => {
          Toaster({
            Title: "Error",
            description: "Failed to save note. Please try again later.",
            type: "danger",
          })
          console.error('Error adding note: ', error);

        });
    } else {
      Toaster({
        Title: "Error",
        description: "Please enter both title and description.",
        type: "danger",
      })

    }
  };

  const fetchNotes = () => {
    setLoading(true)
    firestore()
      .collection('Notes')
      .get()
      .then((querySnapshot) => {
        setLoading(false)
        const notesData = [];
        querySnapshot.forEach((documentSnapshot) => {
          notesData.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        setNotes(notesData);
      })
      .catch((error) => {
        setLoading(false)
        Toaster({
          Title: "Error",
          description: "Failed to fetch notes. Please try again later.",
          type: "danger",
        })
        console.error('Error fetching notes: ', error);

      });
  };

  const renderNoteItem = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={[styles.priorityIndicator, { backgroundColor: getRandomColor() }]} />
    </View>
  );

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <View style={{ width: windowWidth, height: windowHeight }}>
      {loading && (
        <View style={{ width: windowWidth, height: windowHeight, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text>Please Wait...</Text>
        </View>
      )}

      <View style={{height:windowHeight,width:windowWidth}}>
      <FlatList
        data={notes}
        renderItem={renderNoteItem}
        keyExtractor={(item) => item.id}
      />

      <View>
        <TouchableOpacity
          style={{ position: 'absolute', right: windowWidth / 20, bottom: windowHeight / 12, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.PrimaryColor }}
          onPress={addPhotosHandler}
        >
          <Text style={{ fontSize: 30, color: '#fff', paddingHorizontal: 25, paddingVertical: 12 }}>+</Text>
        </TouchableOpacity>
      </View>
      </View>

      <BottomSheet
        ref={addPhotosRef}
        height={windowHeight / 1.9}
        openDuration={300}
        notFullHeight={true}
        title={'Add Note'}
      >
        <View style={{ flex: 1, padding: 10 }}>
          <View>
            <Text style={styles.labelStyling}>Title</Text>
            <TextInput
              // ref={titleRef}
              placeholder='Enter title here.'
              placeholderTextColor={'#B7BFCC'}
              style={styles.inputField}
              autoCapitalize='none'
              onChangeText={setTitle}
            />

            <Text style={styles.labelStyling}>Description</Text>
            <TextInput
              // ref={descriptionRef}
              placeholder='Enter description here.'
              placeholderTextColor={'#B7BFCC'}
              style={[styles.inputField, { height: 150, textAlignVertical: 'top', textAlign: 'left' }]}
              autoCapitalize='none'
              multiline={true}
              onChangeText={setDesc}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <CustomButton
                shadowColor={colors.White}
                fontSize={14}
                borderRadius={8}
                backgroundColor={colors.White}
                border={1}
                borderColor={colors.BorderColor}
                textColor={colors.GrayTextColor}
                size={windowWidth / 2.3}
                title={'Cancel'}
                onPress={() => addPhotosRef.current.close()}
              />
              <CustomButton
                shadowColor={colors.White}
                fontSize={14}
                borderRadius={8}
                backgroundColor={colors.PrimaryColor}
                size={windowWidth / 2.3}
                title={'Save'}
                onPress={saveNote}
              />
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.graphBorderColor,
    padding:10,
    
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
  priorityIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkGray,
    width: 50,
    height: 50,
  },
  labelStyling: {
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginBottom: 5,
  },
  inputField: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#B7BFCC',
    padding: 5,
    marginVertical: 5,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
});


