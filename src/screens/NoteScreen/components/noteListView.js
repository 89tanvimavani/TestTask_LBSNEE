import {View, FlatList, Text, TouchableOpacity, Modal} from 'react-native';
import React, {useMemo, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {styles} from '../styles/noteScreen.style';
import {deleteNote} from '../../../redux/slices/notesSlice';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../../assets/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const NoteListView = () => {
  const notes = useSelector(state => state.notes.items);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [preNoteDetModal, setPreNoteDetModal] = useState(false);
  const [selNote, setSelNote] = useState({});

  // IT WILL DELETE THE SELECTED NOTE
  const handleDelete = () => {
    dispatch(deleteNote(selNote?.id));
    setIsModalVisible(false);
  };

  const renderNoteItem = useMemo(() => {
    return ({item}) => {
      return (
        <TouchableOpacity
          onPress={() => {
            setPreNoteDetModal(true), setSelNote(item);
          }}
          style={styles.noteItem}
          key={item.id}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* PRE-FIX ICON */}
            <View style={styles.noteIconView}>
              <SimpleLineIcons name="notebook" color={Colors.white} size={18} />
            </View>

            {/* NOTE DETAILS */}
            <View style={{marginLeft: 15, width: '71%'}}>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text numberOfLines={2} style={styles.noteContent}>
                {item.content}
              </Text>
            </View>
          </View>

          {/* DELETE BUTTON */}
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(true), setSelNote(item);
            }}>
            <MaterialIcons name="delete-outline" color="red" size={25} />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    };
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {/* DELETE NOTE MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
        visible={isModalVisible}>
        <View style={styles.modal}>
          <View style={styles.subModalView}>
            {/* TITLE */}
            <Text style={[styles.addNoteTitle, {color: Colors.black}]}>
              Delete
            </Text>
            <Text style={styles.delButTitle}>
              Are you sure you want to delete note?
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => handleDelete()}
                style={[
                  styles.buttonView,
                  {
                    flex: 1,
                    backgroundColor: Colors.white,
                    borderWidth: 1,
                    borderColor: Colors.primaryColor,
                  },
                ]}>
                <Text style={[styles.buttonText, {color: Colors.primaryColor}]}>
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={[styles.buttonView, {flex: 1, marginLeft: 15}]}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* PREVIEW NOTE DETAILS MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setPreNoteDetModal(false);
        }}
        visible={preNoteDetModal}>
        <View style={styles.modal}>
          <View style={[styles.subModalView, , {height: '25%'}]}>
            {/* CLOSE ICON */}
            <TouchableOpacity
              onPress={() => setPreNoteDetModal(false)}
              style={{alignSelf: 'flex-end'}}>
              <MaterialCommunityIcons
                name="close-circle-outline"
                color={Colors.primaryColor}
                size={24}
              />
            </TouchableOpacity>
            {/* NOTE DETAILS */}
            <Text
              style={[styles.noteTitle, {fontSize: 22, textAlign: 'center'}]}>
              {selNote.title}
            </Text>
            <View style={styles.divider} />
            <Text style={styles.noteContent}>{selNote.content}</Text>
          </View>
        </View>
      </Modal>

      {/* NOTES LIST */}
      {notes?.length > 0 ? (
        <FlatList data={notes} renderItem={renderNoteItem} />
      ) : (
        <Text style={styles.emptyNoteText}>
          Don't have any notes yet!, Please add notes
        </Text>
      )}
    </View>
  );
};
