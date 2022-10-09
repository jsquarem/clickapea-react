import ListGroup from 'react-bootstrap/ListGroup';

export default function RecipeInstructions({ recipeInstructions }) {
  return (
    <div className="col-12 bg-white rounded my-3 pb-2">
      <h2 className="text-center">Cooking Instructions</h2>
      {recipeInstructions.map((step, i) => {
        return (
          <div key={'instruction-' + i}>
            <h4 className="mt-2">
              Step {i + 1}: {step.name}
            </h4>
            <ListGroup>
              {step.steps.map((instruction, j) => {
                return (
                  <ListGroup.Item key={'instruction-' + i + '-' + j}>
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
                      <div className="col-9 col-lg-11">
                        {instruction.step.replaceAll('&nbsp;', ' ')}
                      </div>
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </div>
        );
      })}
    </div>
  );
}
