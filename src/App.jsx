import './App.css'
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PeopleTable from './components/PeopleTable';
import PersonForm from './components/PersonForm';

function App() {
  const [people, setPeople] = useState([])
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <div className="flex justify-between items-center p-4">
              <h1 className="text-2xl font-bold">Personas</h1>
              <Link to="/add-person" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                + Persona
              </Link>
            </div>
            <PeopleTable people={people} setPeople={setPeople}/>
          </>
        } />
        <Route path="/add-person" element={<PersonForm people={people} setPeople={setPeople} />} />
      </Routes>
    </Router>
  );
}

export default App;