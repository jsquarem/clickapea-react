import { memo } from 'react';
import { useDrop } from 'react-dnd';
export const PlannerCalendarDay = memo(function PlannerCalendarDay({
  accept,
  dayNumber,
  handleOnDrop,
}) {
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
  return (
    <div ref={drop} style={{ backgroundColor }} className="day-month border">
      <div className="date-label">{dayNumber}</div>
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
