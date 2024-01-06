import React, { useState, useEffect } from "react";
import { FiRotateCw, FiPlay } from "react-icons/fi";
import { TbBrandSpeedtest } from "react-icons/tb";
import "./index.css";
import { bubbleSortMain, quickSortMain } from "./SortingAlgorithms";
import Slider from "./components/Slider";
import SortCard from "./components/SortCard";

function App() {
  // Data
  const [dataNumbers, setDataNumbers] = useState([]);
  const [dataColors, setDataColors] = useState([]);
  const [dataCurrentMax, setDataCurrentMax] = useState(0);

  // Sliders
  const [sliderNumberAmount, setSliderNumberAmount] = useState(50);
  const [sliderSpeed, setSliderSpeed] = useState(50);

  // Sort Variables
  const [selectionSortVar] = useState({
    name: "selection sort",
    function: () => {}, // TODO:
  });

  const [bubbleSortVar] = useState({
    name: "bubble sort",
    function: bubbleSortMain,
  });

  const [insertionSortVar] = useState({
    name: "insertion sort",
    function: () => {}, // TODO:
  });

  const [mergeSortVar] = useState({
    name: "merge sort",
    function: () => {}, // TODO:
  });

  const [quickSortVar] = useState({
    name: "quick sort",
    function: quickSortMain,
  });

  // Constants
  const barColor = "bg-primary-100";
  const barColorActive = "bg-primary-200";
  const [selectedSort, setSelectedSort] = useState(bubbleSortVar);

  useEffect(() => {
    generateRandomData(5, 100, 10);
  }, []);

  const playAnimations = (animations) => {
    if (animations.length === 0) {
      return;
    }

    const shift = animations[0];

    setDataNumbers((prevDataNumbers) => {
      const newDataNumbers = [...prevDataNumbers];
      const temp = newDataNumbers[shift.left];
      newDataNumbers[shift.left] = newDataNumbers[shift.right];
      newDataNumbers[shift.right] = temp;
      return newDataNumbers;
    });

    setDataColors((prevDataColors) => {
      const newDataColors = [...prevDataColors];
      newDataColors[shift.left] = barColorActive;
      newDataColors[shift.right] = barColorActive;
      return newDataColors;
    });

    setTimeout(() => {
      setDataColors((prevDataColors) => {
        const newDataColors = [...prevDataColors];
        newDataColors[shift.left] = barColor;
        newDataColors[shift.right] = barColor;
        return newDataColors;
      });
      playAnimations(animations.slice(1));
    }, 100);
  };

  const generateRandomData = (minNumber, maxNumber, totalNumbers) => {
    const numbers = [];
    const colors = [];
    let currentMax = 0;
    for (var i = 0; i < totalNumbers; i++) {
      var number =
        Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
      if (number > currentMax) {
        currentMax = number;
      }
      numbers.push(number);
      colors.push(barColor);
    }
    setDataNumbers(numbers);
    setDataColors(colors);
    setDataCurrentMax(maxNumber);
  };

  return (
    <div className="bg-base-200 h-screen w-screen flex flex-col items-center justify-center gap-5 overflow-hidden p-40">
      <div className="bg-base-100 flex justify-center items-end gap-2 w-full h-1/2 rounded-2xl shadow-xl p-5">
        {dataNumbers.map((item, index) => (
          <div
            key={index}
            style={{ height: `${(item / dataCurrentMax) * 100}%` }}
            className={`${dataColors[index]} w-3 transition-height rounded-2xl shadow-lg`}
          ></div>
        ))}
      </div>
      <div className="bg-base-100 w-full h-fit rounded-2xl shadow-xl p-5 flex gap-3 flex-col items-center justify-center overflow-hidden">
        <div className="flex flex-row gap-2">
          <SortCard
            sortConstVar={bubbleSortVar}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
          <SortCard
            sortConstVar={quickSortVar}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
        </div>

        <div className="w-full flex flex-row justify-between gap-16 mb-4">
          <Slider
            sliderID="sliderNumberAmount"
            min={1}
            max={100}
            sliderValue={sliderNumberAmount}
            setSliderValue={setSliderNumberAmount}
            leftIcon={<TbBrandSpeedtest size={24} />}
            rightIcon={<TbBrandSpeedtest size={24} />}
          />
          <Slider
            sliderID="sliderSpeed"
            min={1}
            max={100}
            sliderValue={sliderSpeed}
            setSliderValue={setSliderSpeed}
          />
          <Slider
            sliderID="toets1"
            min={1}
            max={100}
            sliderValue={sliderSpeed}
            setSliderValue={setSliderSpeed}
          />
          <Slider
            sliderID="toets2"
            min={1}
            max={100}
            sliderValue={sliderSpeed}
            setSliderValue={setSliderSpeed}
          />
          <Slider
            sliderID="toets3"
            min={1}
            max={100}
            sliderValue={sliderSpeed}
            setSliderValue={setSliderSpeed}
          />
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <button
          onClick={() =>
            playAnimations(selectedSort.function([...dataNumbers]))
          }
          className="flex items-center justify-center gap-2 w-fit h-fit px-4 py-2 bg-primary-100 font-bold text-lg text-base-100 shadow-lg rounded-2xl"
        >
          <FiPlay className="icon" size={24} />
          <label className="hover:cursor-pointer">PLAY</label>
        </button>
        <button
          onClick={() => generateRandomData(5, 100, 30)}
          className="flex items-center justify-center gap-2 w-fit h-fit px-4 py-2 bg-primary-100 font-bold text-lg text-base-100 shadow-lg rounded-2xl"
        >
          <FiRotateCw className="icon" size={24} />
          <label className="hover:cursor-pointer">RESET</label>
        </button>
      </div>
    </div>
  );
}

export default App;
