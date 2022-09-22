import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Accordion from 'react-bootstrap/Accordion';
import { ListGroup } from 'react-bootstrap';
import { useEffect } from 'react';
import IngedientList from '../../components/';

export default function RecipeCard({ recipe }) {
  const [state, setState] = useState('');

  useEffect(() => {
    console.log(recipe, '<--recipe');
  }, []);

  return <h2>Recipe Import</h2>;
}
