import { useRecipeStore } from './recipeStore';

const FavoriteButton = ({ recipeId }) => {
  const { favorites, addFavorite, removeFavorite } = useRecipeStore();
  
  const isFavorite = favorites.includes(recipeId);
  
  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  return (
    <button 
      onClick={handleToggleFavorite}
      style={{
        backgroundColor: isFavorite ? '#ffc107' : '#6c757d',
        color: isFavorite ? '#000' : 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
      }}
    >
      {isFavorite ? '⭐' : '☆'} {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
};

export default FavoriteButton; 