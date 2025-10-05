import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';

export default function DetailScreen({ route, navigation }) {
  const { photo } = route.params;
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(photo.id);

  const handleToggleFavorite = () => {
    toggleFavorite(photo);
    if (!favorite) {
      Alert.alert('¡Agregado!', `${photo.title} fue agregado a favoritos ❤️`);
    } else {
      Alert.alert('Eliminado', `${photo.title} fue eliminado de favoritos 💔`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: photo.uri }} 
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{photo.title}</Text>
        
        <TouchableOpacity 
          style={[styles.favoriteButton, favorite && styles.favoriteActive]}
          onPress={handleToggleFavorite}
        >
          <Text style={styles.favoriteText}>
            {favorite ? '❤️ En Favoritos' : '🤍 Agregar a Favoritos'}
          </Text>
        </TouchableOpacity>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>📖 Descripción</Text>
          <Text style={styles.infoText}>{photo.description}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>ℹ️ Detalles</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Serie:</Text>
            <Text style={styles.detailValue}>{photo.serie}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Género:</Text>
            <Text style={styles.detailValue}>{photo.genero}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Año:</Text>
            <Text style={styles.detailValue}>{photo.año}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Episodios:</Text>
            <Text style={styles.detailValue}>{photo.episodios}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Estudio:</Text>
            <Text style={styles.detailValue}>{photo.estudio}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Volver a la Galería</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  image: {
    width: '100%',
    height: 450,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  favoriteButton: {
    backgroundColor: '#6B46C1',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  favoriteActive: {
    backgroundColor: '#E91E63',
  },
  favoriteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoSection: {
    marginBottom: 25,
    backgroundColor: '#2d2d44',
    padding: 15,
    borderRadius: 10,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B46C1',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    color: '#ddd',
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 15,
    color: '#6B46C1',
    fontWeight: 'bold',
    width: 100,
  },
  detailValue: {
    fontSize: 15,
    color: '#ddd',
    flex: 1,
  },
  backButton: {
    backgroundColor: '#2d2d44',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});