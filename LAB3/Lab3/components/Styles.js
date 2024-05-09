import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // example background color
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  discount: {
    fontSize: 14,
    color: 'green',
  },
  header: {
    fontSize: 25,
    color: '#666',
    fontWeight: 'bold',
    paddingLeft: 2,
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Adjust this according to your layout needs
    marginTop: 10, // Add some spacing between the buttons and other content
  },
  label: {
    paddingLeft: 2,
    fontSize: 20,
    color: '#666',
    fontWeight: 'bold',
  },
  detailButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Adjust this according to your layout needs
    marginTop: 10, // Add some spacing between the buttons and other content
  },
});
