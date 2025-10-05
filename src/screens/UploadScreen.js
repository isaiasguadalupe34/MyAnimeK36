import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useFavorites } from '../context/FavoritesContext';

export default function UploadScreen({ navigation }) {
  const { addUploadedPhoto } = useFavorites(); // USAR EL CONTEXTO
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [serie, setSerie] = useState('');
  const [genero, setGenero] = useState('');
  const [año, setAño] = useState('');
  const [episodios, setEpisodios] = useState('');
  const [estudio, setEstudio] = useState('');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permisos necesarios', 'Necesitamos acceso a tu galería para subir fotos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log('Imagen seleccionada:', result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permisos necesarios', 'Necesitamos acceso a tu cámara para tomar fotos');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log('Foto tomada:', result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!selectedImage || !title) {
      Alert.alert('Error', 'Por favor selecciona una imagen y agrega un título');
      return;
    }

    // Crear nuevo anime
    const newAnime = {
      id: Date.now().toString(),
      uri: selectedImage,
      title: title,
      description: description || 'Sin descripción disponible',
      serie: serie || title,
      genero: genero || 'Sin especificar',
      año: año || new Date().getFullYear().toString(),
      episodios: episodios || '?',
      estudio: estudio || 'Desconocido'
    };

    console.log('Subiendo anime:', newAnime);

    // AGREGAR AL CONTEXTO
    addUploadedPhoto(newAnime);

    Alert.alert(
      '¡Éxito! 🎉', 
      `${title} se ha agregado a tu galería`,
      [
        {
          text: 'Ver en Galería',
          onPress: () => {
            // Limpiar formulario
            setSelectedImage(null);
            setTitle('');
            setDescription('');
            setSerie('');
            setGenero('');
            setAño('');
            setEpisodios('');
            setEstudio('');
            // Navegar a galería
            navigation.navigate('Gallery');
          }
        },
        {
          text: 'Subir Otra',
          onPress: () => {
            setSelectedImage(null);
            setTitle('');
            setDescription('');
            setSerie('');
            setGenero('');
            setAño('');
            setEpisodios('');
            setEstudio('');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>📸 Subir Nueva Foto de Anime</Text>

        {selectedImage ? (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: selectedImage }} style={styles.imagePreview} resizeMode="cover" />
            <TouchableOpacity 
              style={styles.changeImageButton}
              onPress={pickImage}
            >
              <Text style={styles.changeImageText}>Cambiar Imagen</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.uploadButtons}>
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Text style={styles.uploadButtonIcon}>🖼️</Text>
              <Text style={styles.uploadButtonText}>Elegir de Galería</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.uploadButton, styles.cameraButton]} onPress={takePhoto}>
              <Text style={styles.uploadButtonIcon}>📷</Text>
              <Text style={styles.uploadButtonText}>Tomar Foto</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.form}>
          <Text style={styles.label}>Título *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Naruto"
            placeholderTextColor="#888"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe el anime..."
            placeholderTextColor="#888"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Serie</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Naruto Shippuden"
            placeholderTextColor="#888"
            value={serie}
            onChangeText={setSerie}
          />

          <Text style={styles.label}>Género</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Acción, Aventura"
            placeholderTextColor="#888"
            value={genero}
            onChangeText={setGenero}
          />

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Año</Text>
              <TextInput
                style={styles.input}
                placeholder="2024"
                placeholderTextColor="#888"
                value={año}
                onChangeText={setAño}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.halfInput}>
              <Text style={styles.label}>Episodios</Text>
              <TextInput
                style={styles.input}
                placeholder="12"
                placeholderTextColor="#888"
                value={episodios}
                onChangeText={setEpisodios}
                keyboardType="numeric"
              />
            </View>
          </View>

          <Text style={styles.label}>Estudio</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: MAPPA, Bones"
            placeholderTextColor="#888"
            value={estudio}
            onChangeText={setEstudio}
          />

          <TouchableOpacity 
            style={[styles.submitButton, (!selectedImage || !title) && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={!selectedImage || !title}
          >
            <Text style={styles.submitButtonText}>✨ Subir Anime</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  uploadButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  uploadButton: {
    flex: 1,
    backgroundColor: '#6B46C1',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cameraButton: {
    backgroundColor: '#E91E63',
  },
  uploadButtonIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  imagePreviewContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    marginBottom: 15,
  },
  changeImageButton: {
    backgroundColor: '#6B46C1',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  changeImageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  form: {
    marginTop: 10,
  },
  label: {
    color: '#6B46C1',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#2d2d44',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#444',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  submitButton: {
    backgroundColor: '#6B46C1',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  submitButtonDisabled: {
    backgroundColor: '#555',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});