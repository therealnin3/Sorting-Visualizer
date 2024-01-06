import React from "react";

// Resource from https://www.geeksforgeeks.org/bubble-sort/
export function bubbleSortMain(arr) {
  const animations = [];
  var n = arr.length;
  var i, j, temp;
  var swapped;
  for (i = 0; i < n - 1; i++) {
    swapped = false;
    for (j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap arr[j] and arr[j+1]
        animations.push({ left: j, right: j + 1 });
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }
    if (swapped == false) break;
  }
  return animations;
}

// Resource from https://www.geeksforgeeks.org/quick-sort/
export function quickSortMain(arr) {
  const animations = [];
  quickSort(arr, 0, arr.length - 1, animations);
  return animations;
}

function quickSort(arr, low, high, animations) {
  if (low < high) {
    let pi = partition(arr, low, high, animations);
    quickSort(arr, low, pi - 1, animations);
    quickSort(arr, pi + 1, high, animations);
  }
}

function partition(arr, low, high, animations) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      animations.push({ left: i, right: j });
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  animations.push({ left: i + 1, right: high });
  return i + 1;
}

// Resource from https://www.geeksforgeeks.org/selection-sort/
export function selectionSort(arr) {
  const animations = [];
  var n = arr.length;
  var i, j, min_idx;
  for (i = 0; i < n - 1; i++) {
    min_idx = i;
    for (j = i + 1; j < n; j++) if (arr[j] < arr[min_idx]) min_idx = j;
    swap(arr, min_idx, i);
    animations.push({ left: min_idx, right: i });
  }
  return animations;
}

function swap(arr, xp, yp) {
  var temp = arr[xp];
  arr[xp] = arr[yp];
  arr[yp] = temp;
}

// Resource from https://www.geeksforgeeks.org/insertion-sort/
export function insertionSort(arr) {
  const animations = [];
  let n = arr.length;
  let i, key, j;
  for (i = 1; i < n; i++) {
    key = arr[i];
    j = i - 1;
    while (j >= 0 && arr[j] > key) {
      animations.push({ left: j, right: j + 1, operation: "shift" });
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    animations.push({ left: j + 1, value: key, operation: "insert" });
    arr[j + 1] = key;
  }
  return animations;
}
