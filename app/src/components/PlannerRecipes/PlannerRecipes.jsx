import { memo } from 'react';
import { useDrag } from 'react-dnd';
import { GripVertical } from 'react-bootstrap-icons';

export const PlannerRecipes = memo(function PlannerRecipes({
  image,
  name,
  recipeID,
  type,
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
      style={{
        border: '1px dashed gray',
        lineHeight: '40px',
        cursor: 'move',
        opacity,
      }}
      data-testid="box"
      className="d-flex flex-row justify-content-start h-100 bg-light"
    >
      <div className="px-2">
        <GripVertical style={{ fontSize: '1.5rem' }} />
      </div>
      <div className="px-2 flex-grow-1">{name}</div>
      <div className="px-2">
        <img src={image} style={{ maxHeight: '30px', maxWidth: '40px' }} />
      </div>
    </div>
  );
});
