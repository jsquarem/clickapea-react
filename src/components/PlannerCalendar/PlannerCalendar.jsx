import { useCallback, useMemo, useState, memo } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import dayjs, { Dayjs } from 'dayjs';
import { useDrop } from 'react-dnd';
import { PlannerCalendarDay } from '../PlannerCalendarDay/PlannerCalendarDay.jsx';
import './PlannerCalendar.css';
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
export const PlannerCalendar = memo(function PlannerCalendar(
  accept,
  handleOnDrop
) {
  console.log('in PlannerCalendar');

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const currentDay = useMemo(() => dayjs().toDate(), []);

  const firstDayOfTheMonth = useMemo(
    () => selectedDate.clone().startOf('month'),
    [selectedDate]
  );

  const firstDayOfFirstWeekOfMonth = useMemo(
    () => dayjs(firstDayOfTheMonth).startOf('week'),
    [firstDayOfTheMonth]
  );

  const generateFirstDayOfEachWeek = useCallback((day) => {
    const dates = [day];
    for (let i = 1; i < 6; i++) {
      const date = day.clone().add(i, 'week');
      dates.push(date);
    }
    return dates;
  }, []);

  const generateWeek = useCallback((day) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = day.clone().add(i, 'day').toDate();
      dates.push(date);
    }
    return dates;
  }, []);

  const generateWeeksOfTheMonth = useMemo(() => {
    const firstDayOfEachWeek = generateFirstDayOfEachWeek(
      firstDayOfFirstWeekOfMonth
    );
    return firstDayOfEachWeek.map((date) => generateWeek(date));
  }, [generateFirstDayOfEachWeek, firstDayOfFirstWeekOfMonth, generateWeek]);

  return (
    <div className="col-12">
      <div className="row">
        <h3>{selectedDate.clone().format('MMM YYYY')}</h3>
        <div>
          <MdKeyboardArrowLeft
            size={25}
            onClick={() => setSelectedDate((date) => date.subtract(1, 'month'))}
          />
          <MdKeyboardArrowRight
            size={25}
            onClick={() => setSelectedDate((date) => date.add(1, 'month'))}
          />
        </div>
      </div>
      <div className="d-flex justify-content-around">
        {generateWeeksOfTheMonth[0].map((day, index) => (
          <div className="day-week-header" key={`week-day-${index}`}>
            {dayjs(day).format('dd')}
          </div>
        ))}
      </div>
      {generateWeeksOfTheMonth.map((week, weekIndex) => (
        // Days of the week text
        <div
          className="d-flex justify-content-around"
          key={`week-${weekIndex}`}
        >
          {week.map((day, dayIndex) => {
            // let dateType =
            //   selectedDate.clone().toDate().getMonth() !== day.getMonth()
            //     ? 'nextMonth'
            //     : dayjs(currentDay).isSame(day, 'date')
            //     ? 'today'
            //     : 'default';
            return (
              // Month Days
              <PlannerCalendarDay
                key={`day-${dayIndex}`}
                accept={['recipe']}
                dayNumber={day.getDate()}
                handleOnDrop={(item) => handleOnDrop(item)}
              />
            );
          })}
        </div>
      ))}
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
// );
