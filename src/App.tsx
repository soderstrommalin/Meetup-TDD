import './App.css';
import { ListComponent } from './components/ListComponent'
import { data } from './data/data'

function App() {

  return (
    <>
      <h2 className='heading'>Apocalypse Meetup</h2>
      <div className='app-wrapper'>
        <ListComponent data={data} />
      </div>
    </>
  );
}

export default App;
