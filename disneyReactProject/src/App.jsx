import { BrowserRouter as Router, Routes, Route } from "react-router";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import Detail from "./components/Detail";
function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/detail/:id" element={<Detail />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
