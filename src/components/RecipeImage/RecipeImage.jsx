import Image from 'react-bootstrap/Image';
import './RecipeImage.css';

export default function RecipeImage({ recipeImage }) {
  return (
    <div className="col-12 mt-2 text-center">
      <h4 className="text-center">Recipe Image</h4>
      <Image fluid src={recipeImage} />
    </div>
  );
}
