import { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { LinkContainer } from 'react-router-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import * as recipeAPI from '../../utils/recipeAPI';
import './Footer.css';

export default function Footer() {
  const [newRecipeImages, setNewRecipeImages] = useState([]);

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  const fetchNewRecipeImages = useCallback(async () => {
    try {
      const response = await recipeAPI.getNewRecipeImages();
      setNewRecipeImages(response.recipeURLs);
    } catch (err) {
      console.log(err.message);
    }
  }, [newRecipeImages]);

  useEffect(() => {
    fetchNewRecipeImages();
  }, []);

  let imageCount = 8;
  if (isMobile) {
    imageCount = 3;
  }

  return (
    <div
      className="bg-light 100vw p-3"
      style={{ minHeight: '200px' }}
      data-testid="footer"
    >
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
                          <Card
                            className="bg-transparent"
                            role="new-recipe-image"
                            key={recipe._id}
                          >
                            <LinkContainer
                              to={`/recipes/${recipe._id}`}
                              style={{ cursor: 'pointer' }}
                            >
                              <Card.Img
                                src={recipe.image}
                                alt={recipe.name}
                                className="footer-image"
                              />
                            </LinkContainer>
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
