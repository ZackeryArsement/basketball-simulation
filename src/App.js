import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
// import classes from './App.module.css'
import MainPage from './components/homepage/MainPage'

function App() {

    return (
      <Router>
        <main>
          <Routes>
            {/* About Me Route */}
            <Route 
            path="/"
            element={<MainPage />}
            />
          </Routes>
        </main>
      </Router>
    );
  }
  
  export default App;