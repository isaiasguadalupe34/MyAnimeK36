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
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Anime App</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar anime..."
          value={searchText}
          onChangeText={buscar}
          placeholderTextColor="#999"
        />
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      )}

      {!loading && (
        <FlatList
          data={animes}
          renderItem={({ item }) => <AnimeCard item={item} />}
          keyExtractor={(item) => String(item.id)}
          numColumns={NUM_COLUMNS}
          key={NUM_COLUMNS}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    color: '#000'
  },
  listContent: {
    padding: CARD_PADDING / 2,
    paddingBottom: 20,
    backgroundColor: '#f5f5f5'
  },
  card: {
    width: CARD_WIDTH,
    margin: CARD_MARGIN,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4
  },
  imagen: {
    width: '100%',
    height: CARD_WIDTH * 1.4,
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
    backgroundColor: '#f5f5f5'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666'
  }
});

export default HomeScreen;