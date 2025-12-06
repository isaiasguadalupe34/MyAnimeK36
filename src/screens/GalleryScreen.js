import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimeAPI from '../services/animeApi';

const { width } = Dimensions.get('window');

const getNumColumns = () => {
  if (width >= 768) return 4;
  if (width >= 600) return 3;
  return 2;
};

const NUM_COLUMNS = getNumColumns();
const CARD_PADDING = 16;
const CARD_MARGIN = 8;
const TOTAL_PADDING = CARD_PADDING * 2;
const TOTAL_MARGIN = CARD_MARGIN * 2 * NUM_COLUMNS;
const CARD_WIDTH = Math.floor((width - TOTAL_PADDING - TOTAL_MARGIN) / NUM_COLUMNS);

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
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Galería</Text>
      </View>
      
      <FlatList
        data={animes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={NUM_COLUMNS}
        key={NUM_COLUMNS}
        contentContainerStyle={styles.list}
        style={styles.flatList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#007AFF'
  },
  header: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 12
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#fff',
    letterSpacing: 0.5
  },
  flatList: {
    backgroundColor: '#f5f5f5'
  },
  list: {
    padding: CARD_PADDING / 2,
    paddingBottom: 20
  },
  card: {
    width: CARD_WIDTH,
    margin: CARD_MARGIN,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4
  },
  image: {
    width: '100%',
    height: CARD_WIDTH * 1.4
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
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666'
  }
});

export default GalleryScreen;