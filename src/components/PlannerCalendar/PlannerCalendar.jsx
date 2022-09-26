import { useCallback, useMemo, useState, memo, useEffect } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import dayjs, { Dayjs } from 'dayjs';
import * as plannerAPI from '../../utils/plannerApi';
import { PlannerCalendarDay } from '../PlannerCalendarDay/PlannerCalendarDay.jsx';
import Button from 'react-bootstrap/Button';
import './PlannerCalendar.css';

export const PlannerCalendar = memo(function PlannerCalendar(accept) {
  console.log('in PlannerCalendar');
  const [lastRecipeDropped, setLastRecipeDropped] = useState('');
  const [loading, setLoading] = useState(true);
  //console.log(loading, '<-loading');

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [plannerEvents, setPlannerEvents] = useState([
    {
      date: '',
      recipes: [],
    },
  ]);
  console.log(plannerEvents, '<-plannerEvents');

  const getPlanner = useCallback(async () => {
    //setLoading(true);
    const month = generateWeeksOfTheMonth;
    const firstDay = month[0][0];
    const lastDay = month[month.length - 1][6];
    try {
      const response = await plannerAPI.getEvents({ firstDay, lastDay });
      setPlannerEvents(response.plannerEvents);
      // setLoading(false);
      //setEvents(response);
    } catch (err) {
      console.log(err.message);
    }
  }, [selectedDate]);

  const currentDay = useMemo(() => dayjs().toDate(), []);

  useEffect(() => {
    getPlanner();
  }, []);

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

  const handleDrop = useCallback((day, item) => {
    console.log(item, day, '<-item, index');
    plannerAPI.addEvent({ recipeID: item.recipeID, date: day }).then(() => {
      getPlanner();
    });
  }, []);

  return (
    <div className="col-12">
      <div className="row position-relative">
        <div className="col-auto align-self-center">
          <MdKeyboardArrowLeft
            size={40}
            onClick={() => setSelectedDate((date) => date.subtract(1, 'month'))}
          />
          <MdKeyboardArrowRight
            size={40}
            onClick={() => setSelectedDate((date) => date.add(1, 'month'))}
          />
        </div>
        <div className="col-auto">
          <span className="h2">{selectedDate.clone().format('MMM YYYY')}</span>
        </div>
        <div className="col-auto align-self-end position-absolute cart-button">
          <Button variant="primary">Create Shipping List</Button>
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
            let dateType =
              selectedDate.clone().toDate().getMonth() !== day.getMonth()
                ? 'nextMonth'
                : dayjs(currentDay).isSame(day, 'date')
                ? 'today'
                : 'default';
            let recipes = [];
            plannerEvents.forEach((event) => {
              if (
                dayjs(day).format('YYYY-MM-DD') ===
                dayjs(event.date).format('YYYY-MM-DD')
              ) {
                recipes.push(...event.recipes);
              }
            });
            console.log(recipes, '<-recipes calendar');
            return (
              // Month Days
              <PlannerCalendarDay
                key={`day-${dayIndex}`}
                accept={['recipe']}
                dayNumber={day.getDate()}
                handleOnDrop={(item) => handleDrop(day, item)}
                recipes={recipes}
                dateType={dateType}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
});
