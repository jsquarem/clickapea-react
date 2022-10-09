import './RecipeExtras.css';
import TasteChart from '../../components/TasteChart/TasteChart';

export default function RecipeExtras({ recipeExtras }) {
  console.log(recipeExtras.readyInMinutes, '<-recipeExtras.readyInMinutes');
  return (
    <div className="col-12 mt-4">
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="col-12 text-left">
            <strong>Preparation Time:&nbsp;</strong>
            {recipeExtras.preparationMinutes > 0
              ? recipeExtras.preparation + ' Minutes'
              : 'Unknown'}
            <br />
            <strong>Cooking Time:&nbsp;</strong>
            {recipeExtras.cookingMinutes > 0
              ? recipeExtras.cookingMinutes + ' Minutes'
              : 'Unknown'}
            <br />
            <strong>Ready in:&nbsp;</strong>
            {recipeExtras.readyInMinutes > 0
              ? recipeExtras.readyInMinutes + ' Minutes'
              : 'Unknown'}
            <br />
          </div>
          <div className="col-12 text-center">
            <div className="row">
              {recipeExtras.vegetarian && (
                <div className="col-auto text-center mt-5">
                  <img src="https://spoonacular.com/application/frontend/images/badges/vegetarian.svg" />
                  <br />
                  Vegetarian
                </div>
              )}
              {recipeExtras.vegan && (
                <div className="col-auto text-center mt-5">
                  <img src="https://spoonacular.com/application/frontend/images/badges/vegan.svg" />
                  <br />
                  Vegan
                </div>
              )}
              {recipeExtras.glutenFree && (
                <div className="col-auto text-center mt-5">
                  <img src="https://spoonacular.com/application/frontend/images/badges/gluten-free.svg" />
                  <br />
                  Gluten Free
                </div>
              )}
              {recipeExtras.dairyFree && (
                <div className="col-auto text-center mt-5">
                  <img src="https://spoonacular.com/application/frontend/images/badges/dairy-free.svg" />
                  <br />
                  Dairy Free
                </div>
              )}
              {recipeExtras.veryHealthy && (
                <div className="col-auto text-center mt-5">
                  <img src="https://spoonacular.com/application/frontend/images/badges/protein.svg" />
                  <br />
                  Very Healthy
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          {recipeExtras?.taste && <TasteChart tasteData={recipeExtras.taste} />}
        </div>
      </div>
    </div>
  );
}
