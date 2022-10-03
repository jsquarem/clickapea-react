import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import * as recipeAPI from '../../utils/recipeAPI';

import { options } from './Data';

/* example-start */
const BasicExample = () => {
  const [singleSelections, setSingleSelections] = useState([]);
  const [multiSelections, setMultiSelections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  console.log(options, '<-options');

  const handleChange = (e) => {
    if (e.length > 2) {
      if (e.startsWith('htt')) {
        // url query
      } else {
        //recipe query
        setIsLoading(true);
        recipeAPI.searchRecipes(e).then((response) => {
          console.log(response, '<-response');

          setIsLoading(false);
          setOptions(response);
        });
      }
    }
    console.log(e, '<-e');
    //
  };

  // };

  return (
    <>
      <Form.Group>
        <Form.Label>Single Selection</Form.Label>
        <AsyncTypeahead
          isLoading={isLoading}
          labelKey={(option) => `${option.label}`}
          onSearch={handleChange}
          options={options}
          id="recipe-typeahead"
        />
      </Form.Group>
    </>
  );
};
/* example-end */

export default BasicExample;
