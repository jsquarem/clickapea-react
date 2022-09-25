import { memo } from 'react';
import { useDrop } from 'react-dnd';
const style = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
};
export const PlannerCalendarDay = memo(function PlannerCalendarDay({
  accept,
  dayNumber,
  handleOnDrop,
}) {
  console.log(accept, '<-accept');
  console.log(dayNumber, 'dayNumber');
  console.log(handleOnDrop, 'handleOnDrop');
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: handleOnDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = isOver && canDrop;
  let backgroundColor = '#222';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }
  return (
    <div
      ref={drop}
      style={{ ...style, backgroundColor }}
      className="day-month border"
      data-testid="dustbin"
    >
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
