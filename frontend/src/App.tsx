import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { MainPage } from './main/main.page';
import dotenv from 'dotenv';
dotenv.config();

function App(): JSX.Element {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Route path={'/'} component={MainPage}></Route>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
