import { useCallback, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import * as recipeAPI from '../../utils/recipeAPI';
import './Footer.css';
import CartRecipeList from '../CartRecipeList/CartRecipeList';

export default function Footer() {
  const [newRecipeImages, setNewRecipeImages] = useState([]);

  const fetchNewRecipeImages = useCallback(async () => {
    try {
      const response = await recipeAPI.getNewRecipeImages();
      setNewRecipeImages(response.recipeURLs);
      //setLoading(false);
      console.log(response, '<-response');
      //console.log(response.recipeBooks, '<-response');
    } catch (err) {
      console.log(err.message);
    }
  }, [newRecipeImages]);

  useEffect(() => {
    fetchNewRecipeImages();
  }, []);

  console.log(newRecipeImages, '<-newRecipeImages');
  let imageCount = 8;
  return (
    <div className="bg-light 100vw p-3">
      <div
        className="text-center p-3"
        style={{ backgroundColor: `rgba(0, 0, 0, 0.2)` }}
      >
        <div className="col-12">
          <Carousel>
            {newRecipeImages.length > 0 &&
              Array.from(
                { length: Math.ceil(newRecipeImages.length / imageCount) },
                (_, i) => (
                  <Carousel.Item className="mb-5" key={`carosel-${i}`}>
                    <Stack
                      direction="horizontal"
                      className="h-100 justify-content-center align-items-center"
                      gap={3}
                    >
                      {newRecipeImages
                        .slice(i * imageCount, (i + 1) * imageCount)
                        .map((recipe) => (
                          <Card className="bg-transparent" key={recipe._id}>
                            <Card.Img
                              src={recipe.image}
                              alt={recipe.name}
                              className="footer-image"
                            />
                          </Card>
                        ))}
                    </Stack>
                  </Carousel.Item>
                )
              )}
          </Carousel>
        </div>
        <div className="col-12">
          © 2022 Copyright:&nbsp;&nbsp; Clickapea, Inc. - a&nbsp;
          <a className="text-white" href="https://www.jsquarem.com/">
            JSquareM.com
          </a>
          &nbsp;joint
        </div>
      </div>
    </div>
  );
}
