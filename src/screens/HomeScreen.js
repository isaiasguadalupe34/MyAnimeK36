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
  SafeAreaView
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
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Anime App</Text>
        
        {/* Buscador simple */}
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar anime..."
          value={searchText}
          onChangeText={buscar}
        />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16
  },
  headerTitle: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000'
  },
  listContent: {
    padding: 8
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    maxWidth: '47%'
  },
  imagen: {
    width: '100%',
    height: 200,
    backgroundColor: '#ddd'
  },
  cardContent: {
    padding: 8
  },
  titulo: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000'
  },
  rating: {
    fontSize: 12,
    color: '#666'
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