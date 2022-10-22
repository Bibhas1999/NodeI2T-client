import { BrowserRouter } from 'react-router-dom';
import CustomRoutes from './routes/CustomRoutes';
import './App.css';

function App() {
  return (
    <>
    <BrowserRouter>
      <CustomRoutes/>
    </BrowserRouter>
    </>
  );
}

export default App;
