import React, { useState, useEffect } from 'react';
import { 
  View, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator, 
  StyleSheet,
  TextInput,
  Text,
  StatusBar
} from 'react-native';
import AnimeAPI from '../services/animeApi';

const HomeScreen = ({ navigation }) => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    cargarAnimes();
  }, []);

  const cargarAnimes = async () => {
    setLoading(true);
    const datos = await AnimeAPI.getPopularAnimes();
    setAnimes(datos);
    setLoading(false);
  };

  const buscar = async (texto) => {
    setSearchText(texto);
    if (texto.length > 2) {
      setLoading(true);
      const resultados = await AnimeAPI.searchAnimes(texto);
      setAnimes(resultados);
      setLoading(false);
    } else if (texto.length === 0) {
      cargarAnimes();
    }
  };

  const AnimeCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('DetailScreen', { anime: item })}
    >
      <Image 
        source={{ uri: item.image_url }} 
        style={styles.imagen}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.titulo} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.rating}>
          ⭐ {item.rating}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#007AFF"
      />
      
      {/* Header - SIN cortes */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Anime App</Text>
          
          {/* Buscador */}
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar anime..."
            value={searchText}
            onChangeText={buscar}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Loading */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      )}

      {/* Lista de animes */}
      {!loading && (
        <FlatList
          data={animes}
          renderItem={({ item }) => <AnimeCard item={item} />}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 8,
    letterSpacing: 0.5
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#000',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  listContent: {
    padding: 8
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    maxWidth: '47%'
  },
  imagen: {
    width: '100%',
    height: 220,
    backgroundColor: '#ddd'
  },
  cardContent: {
    padding: 10
  },
  titulo: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000'
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
    backgroundColor: '#fff'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666'
  }
});

export default HomeScreen;