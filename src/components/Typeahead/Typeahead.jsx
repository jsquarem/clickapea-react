import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

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
        setIsLoading({ isLoading: true });
        fetch(`https://api.github.com/search/users?q=${e}`)
          .then((resp) => resp.json())
          .then((json) => {
            setIsLoading(false);
            setOptions(json.items);
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
          labelKey={(option) => `${option.login}`}
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
