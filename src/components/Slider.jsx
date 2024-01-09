import React from "react";

function Slider({
  sliderID,
  min,
  max,
  sliderValue,
  setSliderValue,
  leftIcon,
  isDisabled,
}) {
  const trackBackground = isDisabled
    ? `linear-gradient(to right, var(--base-300) 0%, 
          var(--base-300) ${sliderValue}%, var(--base-300) ${sliderValue}%, 
          var(--base-300) 100%)`
    : `linear-gradient(to right, var(--primary-100) 0%, 
          var(--primary-100) ${sliderValue}%, var(--base-300) ${sliderValue}%, 
          var(--base-300) 100%)`;
  return (
    <div className="flex flex-row gap-2 items-center justify-center w-full">
      <div className="w-10 flex items-center justify-center">{leftIcon}</div>
      <input
        className={isDisabled ? "slider-disabled" : "slider"}
        type="range"
        min={min}
        max={max}
        value={sliderValue}
        id={sliderID}
        onChange={(e) => setSliderValue(e.target.value)}
        style={{ background: trackBackground }}
        disabled={isDisabled}
      />
    </div>
  );
}

export default Slider;
