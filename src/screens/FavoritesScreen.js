import React from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

const FavoritesScreen = ({ navigation }) => {
  const { favorites, toggleFavorite } = useFavorites();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetailScreen', { anime: item })}
    >
      <Image source={{ uri: item.image_url }} style={styles.image} />
      
      <TouchableOpacity
        style={styles.heart}
        onPress={() => toggleFavorite(item)}
      >
        <Ionicons name="heart" size={22} color="#FF0000" />
      </TouchableOpacity>

      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.infoRow}>
          <Text style={styles.info}>⭐ {item.rating}</Text>
          <Text style={styles.info}>📺 {item.episodes}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Mis Favoritos ({favorites.length})
          </Text>
        </View>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyTitle}>No tienes favoritos aún</Text>
          <Text style={styles.emptySubtitle}>
            Toca el ❤️ en los animes que te gusten
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.list}
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
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#fff',
    letterSpacing: 0.3
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
  heart: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 8
  },
  cardContent: {
    padding: 10
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4
  },
  infoRow: {
    flexDirection: 'row',
    gap: 8
  },
  info: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  emptyTitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    fontWeight: 'bold'
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 8
  }
});

export default FavoritesScreen;