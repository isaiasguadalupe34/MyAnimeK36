const API_URL = 'https://api.jikan.moe/v4';

const AnimeAPI = {
  
  getPopularAnimes: async () => {
    try {
      const response = await fetch(`${API_URL}/top/anime?limit=25`);
      const json = await response.json();
      
      return json.data.map(anime => ({
        id: anime.mal_id,
        title: anime.title,
        image_url: anime.images.jpg.large_image_url,
        description: anime.synopsis,
        rating: anime.score || 0,
        episodes: anime.episodes || 0
      }));
    } catch (error) {
      console.log('Error:', error);
      return [];
    }
  },

  searchAnimes: async (query) => {
    try {
      const response = await fetch(`${API_URL}/anime?q=${query}&limit=25`);
      const json = await response.json();
      
      return json.data.map(anime => ({
        id: anime.mal_id,
        title: anime.title,
        image_url: anime.images.jpg.large_image_url,
        description: anime.synopsis,
        rating: anime.score || 0,
        episodes: anime.episodes || 0
      }));
    } catch (error) {
      console.log('Error:', error);
      return [];
    }
  }
};

export default AnimeAPI;