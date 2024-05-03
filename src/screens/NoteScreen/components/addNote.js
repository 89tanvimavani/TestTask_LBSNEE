import React, {useState, useCallback} from 'react';
import {
  View,
  TextInput,
  Modal,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addNote} from '../../../redux/slices/notesSlice';
import {styles} from '../styles/noteScreen.style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../../assets/colors';

export const AddNote = ({visible, setVisible}) => {
  const [noteDetails, setNoteDetails] = useState({
    title: '',
    description: '',
  });
  const dispatch = useDispatch();
  const notes = useSelector(state => state.notes.items);

  // IT WILL ADD THE NOTE
  const handleSave = useCallback(() => {
    if (noteDetails.title && noteDetails.description) {
      const finalNotes = {
        id: notes.length + 1,
        title: noteDetails.title.trim(),
        content: noteDetails.description.trim(),
      };
      dispatch(addNote(finalNotes));
      setNoteDetails({
        title: '',
        description: '',
      });
      setVisible(false);
    } else {
      Alert.alert('Missing data', 'Please fill all fields!!');
    }
  }, [noteDetails, dispatch]);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setNoteDetails({
            title: '',
            description: '',
          });
          setVisible(false);
        }}
        visible={visible}>
        <View style={styles.modal}>
          <View style={styles.subModalView}>
            {/* TITLE */}
            <Text style={styles.addNoteTitle}>Add note</Text>

            {/* CLOSE ICON */}
            <TouchableOpacity
              onPress={() => {
                setNoteDetails({
                  title: '',
                  description: '',
                });
                setVisible(false);
              }}
              style={styles.closeIcon}>
              <MaterialCommunityIcons
                name="close-circle-outline"
                color={Colors.primaryColor}
                size={24}
              />
            </TouchableOpacity>

            {/* ADD NOTE FORM */}
            <TextInput
              style={[styles.input, {marginTop: 20}]}
              placeholder="Title"
              value={noteDetails.title}
              placeholderTextColor="rgba(0,0,0,0.6)"
              onChangeText={val => setNoteDetails({...noteDetails, title: val})}
            />
            <TextInput
              style={[
                styles.input,
                {
                  marginTop: 15,
                  height: 100,
                  textAlignVertical: 'top',
                },
              ]}
              value={noteDetails.description}
              placeholderTextColor="rgba(0,0,0,0.6)"
              multiline={true}
              onChangeText={val =>
                setNoteDetails({...noteDetails, description: val})
              }
              placeholder="Description ..."
            />

            {/* ADD BUTTON */}
            <TouchableOpacity onPress={handleSave} style={styles.buttonView}>
              <Text style={styles.buttonText}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
