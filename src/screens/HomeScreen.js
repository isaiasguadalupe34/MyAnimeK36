import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-C6FPmWm59CyP.jpg' }}
        style={styles.logo}
        resizeMode="cover"
      />
      
      <Text style={styles.title}>Bienvenido a Anime Gallery</Text>
      <Text style={styles.subtitle}>Tu colección de fotos de anime</Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Gallery')}
      >
        <Text style={styles.buttonText}>🖼️ Ver Galería</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.uploadButton]}
        onPress={() => navigation.navigate('Upload')}
      >
        <Text style={styles.buttonText}>📤 Subir Foto</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('Favorites')}
      >
        <Text style={styles.buttonText}>❤️ Mis Favoritos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  logo: {
    width: 180,
    height: 250,
    borderRadius: 20,
    marginBottom: 30,
    borderWidth: 3,
    borderColor: '#6B46C1',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#bbb',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6B46C1',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: '#FF6B35',
  },
  secondaryButton: {
    backgroundColor: '#E91E63',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});