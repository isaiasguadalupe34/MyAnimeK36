import React from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useFavorites();

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
        <Text style={styles.imageTitle}>❤️ {item.title}</Text>
        <Text style={styles.imageYear}>{item.año}</Text>
      </View>
    </TouchableOpacity>
  );

  const EmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>💔</Text>
      <Text style={styles.emptyText}>No tienes favoritos todavía</Text>
      <Text style={styles.emptySubtext}>Agrega animes desde la galería</Text>
      <TouchableOpacity 
        style={styles.emptyButton}
        onPress={() => navigation.navigate('Gallery')}
      >
        <Text style={styles.emptyButtonText}>Ir a la Galería</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>❤️ Mis Favoritos ({favorites.length})</Text>
      </View>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={favorites.length === 0 ? styles.emptyList : styles.list}
        ListEmptyComponent={EmptyList}
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
    padding: 15,
    backgroundColor: '#2d2d44',
    borderBottomWidth: 2,
    borderBottomColor: '#E91E63',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  list: {
    padding: 10,
  },
  emptyList: {
    flex: 1,
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
    backgroundColor: 'rgba(233, 30, 99, 0.9)',
    padding: 10,
  },
  imageTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  imageYear: {
    color: '#fff',
    fontSize: 11,
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#bbb',
    marginBottom: 30,
    textAlign: 'center',
  },
  emptyButton: {
    backgroundColor: '#6B46C1',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});