import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import axios from 'axios'; // Import axios for making HTTP requests
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

const Delete = ({onDelete, serviceId}) => {
  // Accept serviceId as prop
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    // Make confirmDelete asynchronous
    try {
      await axios.delete(
        `https://kami-backend-5rs0.onrender.com/services/${serviceId}`,
      );
      setModalVisible(false); // Close the modal after successful deletion
      onDelete(); // Notify the parent component that the service is deleted
    } catch (error) {
      console.error('Failed to delete service:', error);
      Alert.alert('Error', 'Failed to delete the service.');
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to delete this service?
            </Text>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={{...styles.button, backgroundColor: '#2196F3'}}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{...styles.button, backgroundColor: '#FF6347'}}
                onPress={confirmDelete}>
                <Text style={styles.textStyle}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Menu>
        <MenuTrigger>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>DELETE</Text>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={handleDelete} text="Delete" />
        </MenuOptions>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Delete;
