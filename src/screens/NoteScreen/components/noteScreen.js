import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../styles/noteScreen.style';
import {NoteListView} from './noteListView';
import {AddNote} from './addNote';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../../../assets/colors';

const NoteScreen = () => {
  const [addNoteEnable, setAddNoteEnable] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* STATUS BAR */}
      <StatusBar
        backgroundColor={Colors.primaryColor}
        barStyle={'light-content'}
      />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Notes</Text>
      </View>

      {/* NOTE LISTS */}
      <NoteListView />

      {/* ADD NOTE COMPONENT */}
      <AddNote visible={addNoteEnable} setVisible={setAddNoteEnable} />

      {/* ADD NOTE FLOATING BUTTON */}
      <TouchableOpacity
        onPress={() => setAddNoteEnable(true)}
        style={styles.floatingButton}>
        <FontAwesome5 name="plus" color="white" size={20} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NoteScreen;
