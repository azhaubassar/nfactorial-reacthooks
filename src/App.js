import { useState } from 'react';
import './App.css';
import Slider from './components/Slider'

function App() {

  const [slider, setSlider] = useState(true);
  const [height, setHeight] = useState(100)

  function toggleSlider(){
    setSlider(!slider)
  }

  function changeHeightOfSlider(h){
    setHeight(height=>height+h)
  }

  return (
    <div className="App">
      { slider && <Slider height={height}/>}
      <button className='btn btn-primary m-3' onClick={()=>changeHeightOfSlider(1)}>Change height</button>
      <button className='btn btn-primary m-3' onClick={toggleSlider}>Toggle Slider</button>
    </div>
  );
}

export default App;
