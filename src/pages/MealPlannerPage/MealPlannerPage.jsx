import { render } from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Planner } from '../../components/Planner/Planner';

export default function Drag() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Planner />
    </DndProvider>
  );
}
