import React from 'react';
import { 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Text, 
  View,
  Alert,
  Share,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

const DetailScreen = ({ route, navigation }) => {
  const { anime } = route.params;
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const isInFavorites = isFavorite(anime.id);

  // Compartir imagen
  const compartirImagen = async () => {
    try {
      await Share.share({
        message: `Mira este anime: ${anime.title}\n\n${anime.image_url}`,
        title: anime.title
      });
    } catch (error) {
      console.log('Error al compartir:', error);
    }
  };

  // Abrir imagen en navegador
  const abrirEnNavegador = async () => {
    try {
      await Linking.openURL(anime.image_url);
      Alert.alert(
        '📱 Imagen abierta',
        'Mantén presionada la imagen para guardarla'
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo abrir la imagen');
    }
  };

  // Menú de opciones
  const mostrarOpciones = () => {
    Alert.alert(
      '💾 Guardar imagen',
      'Elige cómo quieres guardar:',
      [
        {
          text: '📤 Compartir',
          onPress: compartirImagen
        },
        {
          text: '🌐 Abrir en navegador',
          onPress: abrirEnNavegador
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ]
    );
  };

  // Toggle favorito
  const manejarFavorito = () => {
    toggleFavorite(anime);
    Alert.alert(
      isInFavorites ? '💔' : '❤️',
      isInFavorites ? 'Eliminado de favoritos' : 'Agregado a favoritos'
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Imagen */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: anime.image_url }} 
          style={styles.imagen}
          resizeMode="cover"
        />
        
        {/* Botón volver */}
        <TouchableOpacity 
          style={[styles.boton, styles.botonVolver]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        {/* Botón favorito */}
        <TouchableOpacity 
          style={[styles.boton, styles.botonFavorito]}
          onPress={manejarFavorito}
        >
          <Ionicons 
            name={isInFavorites ? "heart" : "heart-outline"} 
            size={28} 
            color={isInFavorites ? "#FF0000" : "white"} 
          />
        </TouchableOpacity>

        {/* Botón descargar */}
        <TouchableOpacity 
          style={[styles.boton, styles.botonDescargar]}
          onPress={mostrarOpciones}
        >
          <Ionicons name="download-outline" size={26} color="white" />
        </TouchableOpacity>
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        <Text style={styles.titulo}>{anime.title}</Text>
        
        {/* Info badges */}
        <View style={styles.badgesContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>⭐ {anime.rating}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>📺 {anime.episodes} eps</Text>
          </View>
        </View>

        {/* Descripción */}
        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.descripcion}>
          {anime.description || 'Sin descripción disponible'}
        </Text>

        {/* Ayuda */}
        <View style={styles.ayuda}>
          <Text style={styles.ayudaTitulo}>💡 Cómo guardar:</Text>
          <Text style={styles.ayudaTexto}>
            • Toca ⬇️ → Compartir → Guardar imagen{'\n'}
            • O toca ⬇️ → Abrir en navegador → Mantén presionada la imagen
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  imageContainer: {
    position: 'relative'
  },
  imagen: {
    width: '100%',
    height: 400,
    backgroundColor: '#f0f0f0'
  },
  boton: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 25,
    padding: 12,
    elevation: 5
  },
  botonVolver: {
    top: 40,
    left: 16
  },
  botonFavorito: {
    top: 40,
    right: 16
  },
  botonDescargar: {
    top: 100,
    right: 16,
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    padding: 16
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000'
  },
  badgesContainer: {
    flexDirection: 'row',
    marginBottom: 16
  },
  badge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32'
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 8,
    color: '#000'
  },
  descripcion: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    textAlign: 'justify'
  },
  ayuda: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#FFF3E0',
    borderRadius: 12
  },
  ayudaTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 8
  },
  ayudaTexto: {
    fontSize: 13,
    color: '#E65100',
    lineHeight: 20
  }
});

export default DetailScreen;