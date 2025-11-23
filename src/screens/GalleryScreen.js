import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Text,
  StatusBar
} from 'react-native';
import AnimeAPI from '../services/animeApi';

const GalleryScreen = ({ navigation }) => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarAnimes();
  }, []);

  const cargarAnimes = async () => {
    setLoading(true);
    const datos = await AnimeAPI.getPopularAnimes();
    setAnimes(datos);
    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetailScreen', { anime: item })}
    >
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Galería</Text>
        </View>
      </View>
      
      <FlatList
        data={animes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  headerWrapper: {
    backgroundColor: '#007AFF',
    paddingTop: (StatusBar.currentHeight || 0) + 4
  },
  header: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#fff',
    letterSpacing: 0.5
  },
  list: {
    padding: 8
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4
  },
  image: {
    width: '100%',
    height: 220
  },
  cardContent: {
    padding: 10
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4
  },
  rating: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666'
  }
});

export default GalleryScreen;