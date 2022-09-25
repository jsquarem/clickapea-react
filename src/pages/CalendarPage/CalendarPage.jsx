import React, { useState, useEffect } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import bootstrap5Plugin from '@fullcalendar/bootstrap5';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
import RecipeBooks from '../../components/RecipeBooks/RecipeBooks';
import MealPlanner from '../../components/MealPlanner/MealPlanner';
import * as recipeBookAPI from '../../utils/recipeBookAPI';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

export default function CalendarPage() {
  const [recipeBooks, setRecipeBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      recipeBookAPI.getBooks().then((response) => {
        setRecipeBooks(response.recipeBooks);
        setLoading(false);
      });
    } catch (err) {}
  }, []);

  const handleDateClick = (e) => {
    // bind with an arrow function
    console.log(e, '<-e');
  };
  const handleDateHover = (e) => {
    // bind with an arrow function
    console.log(e, '<-e');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="row">
        <div className="col-3">
          {recipeBooks && !loading ? (
            <RecipeBooks recipeBooks={recipeBooks} />
          ) : (
            ''
          )}
        </div>
        <div className="col-9">
          <MealPlanner />
        </div>
      </div>
    </DndProvider>
  );
}
