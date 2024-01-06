import React, { useState, useEffect } from "react";
import { FiRotateCw } from "react-icons/fi";
import "./index.css";
import { bubbleSort, quickSortMain } from "./SortingAlgorithms";

function App() {
  const [dataNumbers, setDataNumbers] = useState([]);
  const [dataColors, setDataColors] = useState([]);
  const [dataCurrentMax, setDataCurrentMax] = useState(0);

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
      newDataColors[shift.left] = "bg-blue-500";
      newDataColors[shift.right] = "bg-blue-500";
      return newDataColors;
    });

    setTimeout(() => {
      setDataColors((prevDataColors) => {
        const newDataColors = [...prevDataColors];
        newDataColors[shift.left] = "bg-primary";
        newDataColors[shift.right] = "bg-primary";
        return newDataColors;
      });
      playAnimations(animations.slice(1));
    }, 20);
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
      colors.push("bg-primary");
    }
    setDataNumbers(numbers);
    setDataColors(colors);
    setDataCurrentMax(maxNumber);
  };

  return (
    <div className="bg-base-100 h-screen w-screen flex flex-col items-center justify-center gap-5 overflow-hidden p-40">
      <div className="bg-base-100 flex justify-center items-end gap-2 w-full h-3/4 rounded-2xl shadow-xl p-5">
        {dataNumbers.map((item, index) => (
          <div
            key={index}
            style={{ height: `${(item / dataCurrentMax) * 100}%` }}
            className={`${dataColors[index]} w-3 transition-height rounded-2xl shadow-lg`}
          ></div>
        ))}
      </div>
      <div className="bg-base-100 w-full h-1/4 rounded-2xl shadow-xl p-5">
        <button
          onClick={() => playAnimations(quickSortMain([...dataNumbers]))}
          className="flex items-center justify-center gap-2 w-fit h-fit px-4 py-2 border-primary border-2 font-bold text-lg text-primary rounded-2xl"
        >
          <label className="hover:cursor-pointer">Sort Array</label>
        </button>
      </div>
      <button
        onClick={() => generateRandomData(5, 100, 30)}
        className="flex items-center justify-center gap-2 w-fit h-fit px-4 py-2 bg-primary font-bold text-lg text-base-100 shadow-lg rounded-2xl"
      >
        <FiRotateCw className="icon" size={24} />
        <label className="hover:cursor-pointer">RESET</label>
      </button>
    </div>
  );
}

export default App;
