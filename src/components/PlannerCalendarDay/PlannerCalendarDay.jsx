import { useEffect, useState } from 'react';
import { memo } from 'react';
import { useDrop } from 'react-dnd';
export const PlannerCalendarDay = memo(function PlannerCalendarDay({
  accept,
  dayNumber,
  handleOnDrop,
  recipes,
  dateType,
}) {
  //const [dayRecipes, setDayRecipes] = useState(recipes);

  // useEffect();
  // console.log(accept, '<-accept');
  // console.log(dayNumber, 'dayNumber');
  // console.log(handleOnDrop, 'handleOnDrop');
  if (dateType === 'nextMonth') {
    accept = [''];
  }
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
  console.log(recipes, '<-recipes');
  return (
    <div
      ref={drop}
      style={{ backgroundColor }}
      className={`day-month border d-flex flex-column ${dateType}`}
    >
      <div className="date-label">{dayNumber}</div>
      <div style={{ margin: '0px 2px' }} className="align-self-end mt-auto">
        {recipes.map((recipe, index) => {
          return (
            <div
              key={recipe._id + '-' + index}
              className="bg-primary text-center text-white rounded mb-1 p-1"
            >
              <p
                style={{
                  fontSize: '.8rem',
                  lineHeight: '.9rem',
                  width: '100%',
                }}
                className="p-0 m-0"
              >
                {recipe.title}
              </p>
            </div>
          );
        })}
      </div>
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
