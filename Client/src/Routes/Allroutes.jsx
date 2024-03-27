
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";

import Login from '../components/Login';
import Register from '../components/Register';
import WorldMap from '../components/Map';

const AllRoutes = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<WorldMap />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
           </Router>
      </div>
    )
}

export default {AllRoutes}