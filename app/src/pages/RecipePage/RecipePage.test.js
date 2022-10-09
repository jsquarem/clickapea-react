import { render, screen, cleanup } from '@testing-library/react';
import ImportRecipePage from './RecipePage';
import { BrowserRouter as Router } from 'react-router-dom';

it('should render recipe import page', () => {
  render(
    <Router>
      <ImportRecipePage />
    </Router>
  );
  const recipeImportElement = screen.getByTestId('recipe-import-container');
  expect(recipeImportElement).toBeInTheDocument();
});

it('should render recipe import input', () => {
  render(
    <Router>
      <ImportRecipePage />
    </Router>
  );
  const recipeImportInputElement = screen.getByTestId('recipe-import-input');
  expect(recipeImportInputElement).toBeInTheDocument();
});
