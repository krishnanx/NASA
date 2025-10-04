import logo from './logo.svg';
import './App.css';
import DeepZoomViewer from './DeepZoomViewer';
import DragDeep from './DragDeep';
import SolarSystem from './components/SolarSystem'; // import your 3D solar system

function App() {
  return (
    <div className="App">
      {/* Solar System as landing page */}
      <SolarSystem />

      {/* Keep your existing components */}
      {/* <DeepZoomViewer /> */}
      <DragDeep />
    </div>
  );
}

export default App;