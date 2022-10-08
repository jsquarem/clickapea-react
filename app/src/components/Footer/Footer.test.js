import { render, screen, cleanup } from '@testing-library/react';
import Footer from './Footer';

it('should render footer', () => {
  render(<Footer />);
  const footerElement = screen.getByTestId('footer');
  expect(footerElement).toBeInTheDocument();
});

it('should render new recipe images', async () => {
  render(<Footer />);
  const imagesArray = await screen.getAllByRole('new-recipe-image');
  console.log(imagesArray);
});
