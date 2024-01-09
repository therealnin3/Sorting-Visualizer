import React, { useState, useRef, useEffect } from "react";
import { FiRotateCw, FiPlay, FiPause, FiExternalLink } from "react-icons/fi";
import { TbBrandSpeedtest } from "react-icons/tb";
import { LuBarChart2 } from "react-icons/lu";
import "./index.css";
import {
  bubbleSortMain,
  quickSortMain,
  selectionSort,
  insertionSort,
  mergeSortMain,
} from "./SortingAlgorithms";
import Slider from "./components/Slider";
import SortCard from "./components/SortCard";

function App() {
  // Data
  const [dataNumbers, setDataNumbers] = useState([]);
  const [dataColors, setDataColors] = useState([]);
  const [dataCurrentMax, setDataCurrentMax] = useState(0);

  // Sliders
  const [sliderSpeed, setSliderSpeed] = useState(50);
  const sliderSpeedRef = useRef(sliderSpeed);
  const [sliderNumberAmount, setSliderNumberAmount] = useState(50);
  const sliderNumberAmountRef = useRef(sliderNumberAmount);

  // Sort Variables
  const [selectionSortVar] = useState({
    name: "selection sort",
    function: selectionSort,
  });

  const [bubbleSortVar] = useState({
    name: "bubble sort",
    function: bubbleSortMain,
  });

  const [insertionSortVar] = useState({
    name: "insertion sort",
    function: insertionSort,
  });

  const [mergeSortVar] = useState({
    name: "merge sort",
    function: mergeSortMain,
  });

  const [quickSortVar] = useState({
    name: "quick sort",
    function: quickSortMain,
  });

  const [arrayOfSorts] = useState([
    selectionSortVar,
    bubbleSortVar,
    insertionSortVar,
    mergeSortVar,
    quickSortVar,
  ]);

  // Constants
  const barColor = "bg-primary-100";
  const barColorActive = "bg-primary-200";
  const [selectedSort, setSelectedSort] = useState(selectionSortVar);

  const animations = useRef([]);
  const isPlaying = useRef(false);

  useEffect(() => {
    generateRandomData();
  }, []);

  // Keep sliderSpeedRef.current up to date
  useEffect(() => {
    sliderSpeedRef.current = sliderSpeed;
  }, [sliderSpeed]);

  // Keep sliderNumberAmountRef.current up to date
  useEffect(() => {
    sliderNumberAmountRef.current = sliderNumberAmount;
    generateRandomData();
  }, [sliderNumberAmount]);

  const playAnimation = () => {
    // If animations is empty, generate new animations
    if (animations.current.length === 0) {
      animations.current = selectedSort.function([...dataNumbers]);
    }
    isPlaying.current = true;
    animateAnimations();
  };

  const pauseAnimation = () => {
    isPlaying.current = false;
  };

  const stopAnimation = () => {
    isPlaying.current = false;
    animations.current = [];
  };

  const animateAnimations = () => {
    if (!isPlaying.current) {
      return;
    }

    if (animations.current.length === 0) {
      isPlaying.current = false;
      return;
    }

    const shift = animations.current[0];

    // Set numbers
    setDataNumbers((prevDataNumbers) => {
      const newDataNumbers = [...prevDataNumbers];
      if (shift.operation === "shift") {
        newDataNumbers[shift.right] = newDataNumbers[shift.left];
      } else if (shift.operation === "insert") {
        newDataNumbers[shift.left] = shift.value;
      } else if (shift.operation === "swap") {
        const temp = newDataNumbers[shift.left];
        newDataNumbers[shift.left] = newDataNumbers[shift.right];
        newDataNumbers[shift.right] = temp;
      } else if (shift.operation === "move") {
        newDataNumbers[shift.index] = shift.value;
      }
      return newDataNumbers;
    });

    // Set colors
    setDataColors((prevDataColors) => {
      const newDataColors = [...prevDataColors];
      if (shift.operation === "shift") {
        newDataColors[shift.right] = barColorActive;
      } else if (shift.operation === "insert") {
        newDataColors[shift.left] = "bg-green-500";
      } else if (shift.operation === "swap") {
        newDataColors[shift.left] = barColorActive;
        newDataColors[shift.right] = barColorActive;
      } else if (shift.operation === "move") {
        newDataColors[shift.index] = barColorActive;
      }
      return newDataColors;
    });

    setTimeout(() => {
      setDataColors((prevDataColors) => {
        const newDataColors = [...prevDataColors];

        // Reset colors
        if (shift.operation === "shift") {
          newDataColors[shift.right] = barColor;
        } else if (shift.operation === "insert") {
          newDataColors[shift.left] = barColor;
        } else if (shift.operation === "swap") {
          newDataColors[shift.left] = barColor;
          newDataColors[shift.right] = barColor;
        } else if (shift.operation === "move") {
          newDataColors[shift.index] = barColor;
        }

        return newDataColors;
      });
      animations.current = animations.current.slice(1);
      animateAnimations();
    }, 450 - mapRange(sliderSpeedRef.current, 1, 100, 40, 450)); // 1-100 -> 40 - 450
  };

  const mapRange = (value, in_min, in_max, out_min, out_max) => {
    return (
      ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  };

  const generateRandomData = () => {
    const minNumber = 5;
    const maxNumber = 100;
    const totalNumbers = mapRange(
      sliderNumberAmountRef.current,
      1,
      100,
      5,
      100
    );
    const numbers = [];
    const colors = [];
    let currentMax = minNumber;
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
    <div className="bg-base-200 h-screen w-screen flex flex-col items-center justify-center gap-5 overflow-hidden px-[calc(100%*1/9)]">
      <a
        target="_blank"
        href="https://github.com/therealnin3"
        className="flex flex-row gap-2 text-primary-100 items-center justify-center"
      >
        <FiExternalLink size={16} />
        <p className="font-semibold">nin3</p>
      </a>

      <div className="bg-base-100 flex justify-center items-end gap-2 w-full h-1/2 rounded-2xl shadow-xl p-5">
        {dataNumbers.map((item, index) => (
          <div
            key={index}
            style={{ height: `${(item / dataCurrentMax) * 100}%` }}
            className={`${dataColors[index]} w-2 transition-height rounded-2xl shadow-lg`}
          ></div>
        ))}
      </div>
      <div className="flex flex-wrap flex-row gap-2">
        {arrayOfSorts.map((sortConstVar, index) => (
          <SortCard
            key={index}
            sortConstVar={sortConstVar}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            resetFunction={() => {
              stopAnimation();
              generateRandomData();
            }}
          />
        ))}
      </div>
      <div className="border-2 border-base-300 w-fit h-fit rounded-2xl p-5 flex gap-3 flex-col items-center justify-center overflow-hidden">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <div className="flex flex-col gap-4">
            <Slider
              sliderID="sliderSpeed"
              min={1}
              max={100}
              sliderValue={sliderSpeed}
              setSliderValue={setSliderSpeed}
              leftIcon={
                <TbBrandSpeedtest className="text-primary-200" size={25} />
              }
            />
            <Slider
              sliderID="sliderNumberAmount"
              min={1}
              max={100}
              sliderValue={sliderNumberAmount}
              setSliderValue={setSliderNumberAmount}
              leftIcon={
                <LuBarChart2
                  className={
                    isPlaying.current || animations.current.length > 0
                      ? "text-base-400"
                      : "text-primary-200"
                  }
                  size={25}
                />
              }
              isDisabled={isPlaying.current || animations.current.length > 0}
            />
          </div>
          <div className="flex gap-2 items-center justify-center">
            <button
              onClick={() => {
                stopAnimation();
                generateRandomData();
              }}
              className="flex items-center justify-center p-3 rounded-full bg-base-100 shadow-lg"
            >
              <FiRotateCw size={25} className="text-primary-200" />
            </button>
            <button
              onClick={() => {
                if (isPlaying.current) {
                  pauseAnimation();
                } else {
                  playAnimation();
                }
              }}
              className="flex items-center justify-center  p-3 rounded-full bg-base-100 shadow-lg"
            >
              {isPlaying.current ? (
                <FiPause size={25} className="text-primary-200" />
              ) : (
                <FiPlay size={25} className="text-primary-200" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
