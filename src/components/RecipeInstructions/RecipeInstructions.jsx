import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export default function RecipeInstructions({ recipeInstructions }) {
  // console.log(recipeInstructions, '<-recipeInstructions');
  return (
    <div className="col-12 bg-white rounded my-3 pb-2">
      <h2 className="text-center">Cooking Instructions</h2>
      {recipeInstructions.map((step, idx) => {
        // console.log(step, '<-step');
        return (
          <>
            <h4 className="mt-2">
              Step {idx + 1}: {step.name}
            </h4>
            <ListGroup key={'instruction-' + idx}>
              {step.steps.map((instruction, index) => {
                // console.log(instruction, '<-instruction');
                return (
                  <ListGroup.Item key={'instruction-' + idx + '-' + index}>
                    <div className="row">
                      <div className="col-3 col-lg-1 m-auto">
                        <div
                          style={{ height: '50px', width: '50px' }}
                          className="bg-info rounded-circle text-center text-white m-auto"
                        >
                          <h3 style={{ lineHeight: '50px' }}>
                            {instruction.number}
                          </h3>
                        </div>
                      </div>
                      <div className="col-9 col-lg-11">{instruction.step}</div>
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </>
        );
      })}
    </div>
  );
}
