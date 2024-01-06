import React from "react";

function Slider({ sliderID, min, max, sliderValue, setSliderValue, leftIcon }) {
  const trackBackground = `linear-gradient(to right, var(--primary-100) 0%, 
          var(--primary-100) ${sliderValue}%, var(--base-300) ${sliderValue}%, 
          var(--base-300) 100%)`;
  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      <div className="w-10 flex items-center justify-center">{leftIcon}</div>
      <input
        className="slider"
        type="range"
        min={min}
        max={max}
        value={sliderValue}
        id={sliderID}
        onChange={(e) => setSliderValue(e.target.value)}
        style={{ background: trackBackground }}
      />
    </div>
  );
}

export default Slider;
