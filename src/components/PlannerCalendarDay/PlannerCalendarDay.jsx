import { useEffect, useState } from 'react';
import { memo } from 'react';
import { useDrop } from 'react-dnd';
export const PlannerCalendarDay = memo(function PlannerCalendarDay({
  accept,
  dayNumber,
  handleOnDrop,
  recipes,
}) {
  //const [dayRecipes, setDayRecipes] = useState(recipes);

  // useEffect();
  // console.log(accept, '<-accept');
  // console.log(dayNumber, 'dayNumber');
  // console.log(handleOnDrop, 'handleOnDrop');
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: handleOnDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = isOver && canDrop;
  let backgroundColor = '';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }
  // console.log(recipes, '<-recipes');
  return (
    <div
      ref={drop}
      style={{ backgroundColor }}
      className="day-month border d-flex"
    >
      <div className="date-label">{dayNumber}</div>
      {recipes.map((recipe) => {
        return (
          <div
            key={recipe._id}
            className="m-2 bg-primary align-self-end text-center text-white p-2 rounded"
          >
            <span style={{ fontSize: '.9rem' }}>{recipe.title}</span>
          </div>
        );
      })}
    </div>
  );
});

// return (
//   <div ref={drop} style={{ ...style, backgroundColor }} data-testid="dustbin">
//     {isActive
//       ? 'Release to drop'
//       : `This dustbin accepts: ${accept.join(', ')}`}

//     {lastDroppedItem && (
//       <p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
//     )}
//   </div>
// )
