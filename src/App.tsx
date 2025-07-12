import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import NewsWrapper from "./components/NewsWrapper/NewsWrapper";
import { useState } from "react";
import LoadingBar from "react-top-loading-bar";

function App() {
  const [progress, setProgress] = useState<number>(0);

  return (
    <>
      <div>
        <Router>
          <LoadingBar
            color="#000"
            progress={progress}
          />
          <NavBar />
          <Routes>
            <Route path="/" element={
              <NewsWrapper setProgress={setProgress} key="general" pageSize={9} country="in" category="general" language="en"/>
              }/>
            <Route path="/business" element={
              <NewsWrapper setProgress={setProgress} key="business" pageSize={9} country="in" category="business" language="en"/>
              }/>
            <Route path="/entertainment" element={
              <NewsWrapper setProgress={setProgress} key="entertainment" pageSize={9} country="in" category="entertainment" language="en"/>
              }/>
            <Route path="/health" element={
              <NewsWrapper setProgress={setProgress} key="health" pageSize={9} country="in" category="health" language="en"/>
              }/>
            <Route path="/science" element={
              <NewsWrapper setProgress={setProgress} key="science" pageSize={9} country="in" category="science" language="en"/>
              }/>
            <Route path="/sports" element={
              <NewsWrapper setProgress={setProgress} key="sports" pageSize={9} country="in" category="sports" language="en"/>
              }/>
            <Route path="/technology" element={
              <NewsWrapper setProgress={setProgress} key="technology" pageSize={9} country="in" category="technology" language="en"/>
              }/>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
