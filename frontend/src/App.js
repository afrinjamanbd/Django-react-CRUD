import './App.css';
import {  Route,Routes} from "react-router-dom";
import CreateEvent from "./CreateEvent";
import PaginatedEvent from './PaginatedEvent';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element= {<PaginatedEvent/>} />
        <Route path='/createvent' element= {<CreateEvent/>} />
        <Route path='/editevent' element= {<CreateEvent/>} />
      </Routes>
    </div>
  );
}

export default App;
