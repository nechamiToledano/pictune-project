import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Outlet } from "react-router-dom"; // To use the Outlet component
import SongsPage from "./pages/AllMusic";
import SongDetails from "./pages/SongDetails";

import AllMusic from "./pages/AllMusic";
import FileUploader from "./pages/FileUploader";
import MusicLibrary from "./pages/Music-library";
const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main
      >
        <Outlet /> {/* Renders child pages */}
      </main>

      { (
        <Footer/>
      )}
    </div>
  );
};


const App: React.FC = () => {
  return (
    <Router >
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/songs" element={<SongsPage />} />
          <Route path="/songs/:id" element={<SongDetails  />} />       
          <Route path="/songs" element={<AllMusic />} />
          <Route path="/upload" element={<FileUploader />} />
          <Route path="/playlists" element={<MusicLibrary />} />



        </Route>
      </Routes>
    </Router>
  );
};

export default App;
