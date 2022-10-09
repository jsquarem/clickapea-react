import './HomePage.css';
import RecipeSearchForm from '../../components/RecipeSearchForm/RecipeSearchFrom';

export default function HomePage({ user }) {
  return (
    <>
      <header>
        <img src="https://catcollection7-11.s3.us-east-2.amazonaws.com/pexels-ella-olsson-1600.jpg" />
        <section>
          <h1
            className="text-center mb-5"
            style={{
              // fontFamily: `Indie Flower, cursive`,
              fontSize: '5rem',
              textShadow: '2px 2px 5px #abbfc2',
            }}
          >
            Welcome to Clickapea!
          </h1>
          <h3>
            Import a recipe with a URL or search our database of recipes by name
          </h3>
          <RecipeSearchForm user={user} />
          <p>
            You can also select one of the newest recipes added below to get
            started.
          </p>
        </section>
      </header>
    </>
  );
}
