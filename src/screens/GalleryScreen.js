import React, { useState } from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';

export default function GalleryScreen({ navigation }) {
  const { uploadedPhotos } = useFavorites(); // OBTENER FOTOS SUBIDAS

  const [photos] = useState([
    { 
      id: '1', 
      uri: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-C6FPmWm59CyP.jpg',
      title: 'Attack on Titan',
      description: 'Hace varios siglos, la humanidad fue casi exterminada por los titanes.',
      serie: 'Shingeki no Kyojin',
      genero: 'Acción, Drama, Fantasía',
      año: '2013',
      episodios: '25',
      estudio: 'Wit Studio'
    },
    // ... resto de tus fotos predeterminadas
    { 
      id: '2', 
      uri: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21459-RoPwgrZ32gM3.jpg',
      title: 'My Hero Academia',
      description: 'La historia está ambientada en un mundo donde el 80% de la población tiene algún tipo de superpoder llamado "Quirk".',
      serie: 'Boku no Hero Academia',
      genero: 'Acción, Comedia, Superhéroes',
      año: '2016',
      episodios: '13',
      estudio: 'Bones'
    },
    { 
      id: '3', 
      uri: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWj4pEFseh.jpg',
      title: 'Jujutsu Kaisen',
      description: 'Yuji Itadori es un estudiante de secundaria con habilidades físicas excepcionales.',
      serie: 'Jujutsu Kaisen',
      genero: 'Acción, Sobrenatural, Shonen',
      año: '2020',
      episodios: '24',
      estudio: 'MAPPA'
    },
    { 
      id: '4', 
      uri: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-gHSraOSa0nBG.jpg',
      title: 'Frieren: Beyond Journey\'s End',
      description: 'Después de una aventura de 10 años, la elfa maga Frieren y sus compañeros derrotaron al Rey Demonio.',
      serie: 'Sousou no Frieren',
      genero: 'Aventura, Drama, Fantasía',
      año: '2023',
      episodios: '28',
      estudio: 'Madhouse'
    },
    { 
      id: '5', 
      uri: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-PEn1CTc93blC.jpg',
      title: 'Kimetsu no Yaiba',
      description: 'Tanjiro Kamado vive en las montañas con su familia.',
      serie: 'Demon Slayer',
      genero: 'Acción, Sobrenatural',
      año: '2019',
      episodios: '26',
      estudio: 'ufotable'
    },
    { 
      id: '6', 
      uri: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1535-4r88a1tsBEIz.jpg',
      title: 'Death Note',
      description: 'Light Yagami es un estudiante brillante que encuentra un cuaderno sobrenatural.',
      serie: 'Death Note',
      genero: 'Thriller, Misterio, Sobrenatural',
      año: '2006',
      episodios: '37',
      estudio: 'Madhouse'
    },
    { 
      id: '7', 
      uri: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21459-RoPwgrZ32gM3.jpg',
      title: 'My Hero Academia Season 2',
      description: 'Continuando su camino para convertirse en el héroe número uno.',
      serie: 'Boku no Hero Academia Season 2',
      genero: 'Acción, Comedia, Superhéroes',
      año: '2017',
      episodios: '25',
      estudio: 'Bones'
    },
    { 
      id: '8', 
      uri: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-FlochcFsyoF4.png',
      title: 'Chainsaw Man',
      description: 'Denji es un adolescente que vive en la pobreza extrema.',
      serie: 'Chainsaw Man',
      genero: 'Acción, Sobrenatural, Gore',
      año: '2022',
      episodios: '12',
      estudio: 'MAPPA'
    },
  ]);

  // COMBINAR FOTOS SUBIDAS CON FOTOS PREDETERMINADAS
  const allPhotos = [...uploadedPhotos, ...photos];

  console.log('Total de fotos en galería:', allPhotos.length);
  console.log('Fotos subidas:', uploadedPhotos.length);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.imageContainer}
      onPress={() => navigation.navigate('Detail', { photo: item })}
    >
      <Image 
        source={{ uri: item.uri }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.imageTitle}>{item.title}</Text>
        <Text style={styles.imageYear}>{item.año}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {uploadedPhotos.length > 0 && (
        <View style={styles.header}>
          <Text style={styles.headerText}>📤 {uploadedPhotos.length} foto(s) subida(s)</Text>
        </View>
      )}
      <FlatList
        data={allPhotos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    padding: 12,
    backgroundColor: '#FF6B35',
    borderBottomWidth: 2,
    borderBottomColor: '#E91E63',
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  list: {
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#2d2d44',
    minHeight: 250,
  },
  image: {
    width: '100%',
    height: 250,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
  },
  imageTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  imageYear: {
    color: '#bbb',
    fontSize: 11,
    marginTop: 2,
  },
});