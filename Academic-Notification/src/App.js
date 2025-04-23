import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Selection from "./Pages/Selection";
import DegreeProgress from "./Pages/DegreeProgress";
import CourseSelection from './Pages/CourseSelection.js';
import DegreeInfo from "./Pages/DegreeInfo";
import ElectiveRequirements from "./Pages/ElectiveRequirements";
import FakePage from "./Pages/FakePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Selection />} />
        <Route path="/degree-progress/:studentID" element={<DegreeProgress />} />
        <Route path="/Course-Selection/:studentID" element={<CourseSelection />} />
        <Route path="/degree-information/:studentID" element={<DegreeInfo/>} />
        <Route path="/elective-requirements/:studentID" element={<ElectiveRequirements/>} />
        <Route path="/fake-page" element={<FakePage />} />
      </Routes>
    </Router>
  );
}

export default App;

