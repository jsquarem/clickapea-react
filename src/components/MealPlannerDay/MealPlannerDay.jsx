import { useCallback, useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import './MealPlannerDay.css';

export default function MealPlannerDay({ dateType, dayNumber }) {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleDragOver = () => {
    setIsHovering(true);
  };

  return (
    <div
      className={`day-month border${' ' + dateType}${
        isHovering ? ' bg-salmon' : ''
      }`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onDragOver={handleDragOver}
    >
      <div className="date-label">{dayNumber}</div>
    </div>
  );
}
