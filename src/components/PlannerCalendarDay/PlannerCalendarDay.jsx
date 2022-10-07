import { memo } from 'react';
import { useDrop } from 'react-dnd';
export const PlannerCalendarDay = memo(function PlannerCalendarDay({
  accept,
  dayNumber,
  handleOnDrop,
  recipes,
  dateType,
}) {
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
    backgroundColor = '#819ea5';
  } else if (canDrop) {
    backgroundColor = '#d5eff2';
  }

  return (
    <div
      ref={drop}
      style={{ backgroundColor }}
      className={`day-month border d-flex flex-column ${dateType}`}
    >
      <div className="date-label">{dayNumber}</div>
      <div
        style={{ margin: '0px 2px', width: '96%' }}
        className="align-self-end mt-auto"
      >
        {recipes.map((recipe, i) => {
          return (
            <div
              key={recipe._id + '-' + i}
              className="bg-primary text-center text-white rounded mb-1 p-1 w-100"
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
