import React from "react";
// import GridMotionAnimation from "./pages/GridMotionAnimation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ScrollStackAnimation from "./pages/ScrollStackAnimation";
// import CircularGalleryAnimation from "./pages/CircularGalleryAnimation";
// import FluidGlassAnimation from "./pages/FluidGlassAnimation";
// import GlassSurfaceAnimation from "./pages/GlassSurfaceAnimation";
// import TitledCardAnimation from "./pages/TitledCardAnimation";
// import ProfileCardAnimation from "./pages/ProfileCardAnimation";
// import FlyingPostersAnimation from "./pages/FlyingPostersAnimation";
// import FlowingMenuAnimation from "./pages/FlowingMenuAnimation";
// import RollingGalleryAnimation from "./pages/RollingGalleryAnimation";
// import InfiniteMenuAnimation from "./pages/InfiniteMenuAnimation";
// import Text1Animation from "./pages/Text1Animation";
// import ImageTrailAnimation from "./pages/ImageTrailAnimation";
// import Home from "./pages/Home";
// import TeaLandingPage from "./pages/TeaLandingPage";
// import ModelViewerAnimation from "./pages/ModelViewerAnimation";
// import PhotographyLanding from "./pages/Landing";
import Land from "./pages/Land";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/" element={<GridMotionAnimation />} />
          <Route path="/scroll" element={<ScrollStackAnimation />} />
          <Route path="/circle" element={<CircularGalleryAnimation />} />
          <Route path="/fluid" element={<FluidGlassAnimation />} />
          <Route path="/glass" element={<GlassSurfaceAnimation />} />
          <Route path="/title" element={<TitledCardAnimation />} />
          <Route path="/profile" element={<ProfileCardAnimation />} />
          <Route path="/flying" element={<FlyingPostersAnimation />} />
          <Route path="/flowing" element={<FlowingMenuAnimation />} />
          <Route path="/rolling" element={<RollingGalleryAnimation />} />
          <Route path="/infinite" element={<InfiniteMenuAnimation />} />
          <Route path="/text1" element={<Text1Animation />} />
          <Route path="/image" element={<ImageTrailAnimation />} />
          <Route path="/land" element={<TeaLandingPage />} />
          <Route path="/model" element={<ModelViewerAnimation />} />
          <Route path="/home" element={<Home />} />
          <Route path="/la" element={<PhotographyLanding />} /> */}
          <Route path="/lan" element={<Land />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

