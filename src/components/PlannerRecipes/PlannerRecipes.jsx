import { memo } from 'react';
import { useDrag } from 'react-dnd';
const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  //marginRight: '1.5rem',
  //marginBottom: '1.5rem',
  cursor: 'move',
  //float: 'left',
};
export const PlannerRecipes = memo(function PlannerRecipes({
  image,
  name,
  recipeID,
  type,
  isDropped,
}) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name, recipeID },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name, type]
  );
  return (
    <div
      ref={drag}
      style={{ ...style, opacity }}
      data-testid="box"
      className="d-flex flex-row justify-content-center w-100"
    >
      <BsGripVertical />
      {name}
      <img src={image} style={{ maxHeight: '30px', maxWidth: '40px' }} />
    </div>
  );
});
