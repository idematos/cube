import './App.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        {/* <Route path='/login' element={<Login />} />
        <Route path='/products' element={<Products />} />
        <Route path='/' element={<Navigate to='/login' />} /> */}
    </Routes>
    </div>
  );
}

export default App;
