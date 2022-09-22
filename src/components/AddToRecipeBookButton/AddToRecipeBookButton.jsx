import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useEffect } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function AddToRecipeBookButton({ recipeBooks }) {
  return (
    <div className="col-12 mt-2 text-center">
      <h4 className="text-center">Add to book</h4>
    </div>
  );
}
