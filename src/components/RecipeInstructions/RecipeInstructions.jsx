import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export default function RecipeInstructions({ recipeInstructions }) {
  return (
    <div className="col-12">
      <h3 className="text-center">Cooking Instructions</h3>
      <ListGroup>
        {recipeInstructions?.map((instruction, index) => {
          return (
            <ListGroup.Item key={index}>
              <div className="row">
                <div className="col-3 col-lg-1 m-auto">
                  <div
                    style={{ height: '50px', width: '50px' }}
                    className="bg-success rounded-circle text-center text-white m-auto"
                  >
                    <h3 style={{ lineHeight: '50px' }}>{instruction.number}</h3>
                  </div>
                </div>
                <div className="col-9 col-lg-11">{instruction.step}</div>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}
