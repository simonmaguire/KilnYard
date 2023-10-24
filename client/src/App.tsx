import Main from "./pages/pottery/main";
import PotNotes from "./pages/potNotes/PotContainer";
import Banner from "./components/banner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotFound, Page404 } from "./pages/ErrorPages";
import Signup from "./pages/login/Signup";
import Login from "./pages/login/Login";
import { Home } from "./pages/home/home";
import "./css/App.css";
import { ActiveUserProvider } from "./AppState/context";

function App() {
  return (
    <div className="App">
      <Router>
        <ActiveUserProvider>
          <Banner></Banner>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pottery" element={<Main />} />
            <Route path="/pottery/:id" element={<PotNotes />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="pot/:id/notfound" element={<NotFound />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </ActiveUserProvider>
      </Router>
    </div>
  );
}

export default App;
