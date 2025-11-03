import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const UploadScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Subir Anime</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Próximamente</Text>
        <Text style={styles.subtitle}>
          Esta función estará disponible pronto
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 16,
    paddingTop: 50
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8
  }
});

export default UploadScreen;