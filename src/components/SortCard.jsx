import React from "react";

function SortCard({ sortConstVar, selectedSort, setSelectedSort }) {
  return (
    <div
      onClick={() =>
        setSelectedSort({
          name: sortConstVar.name,
          function: sortConstVar.function,
        })
      }
      className={`${
        sortConstVar.name === selectedSort.name
          ? "bg-primary-200 text-base-100"
          : "text-primary-200"
      } px-3 py-1 border-2 border-primary-200 font-semibold hover:cursor-pointer rounded-full text-md`}
    >
      {sortConstVar.name}
    </div>
  );
}

export default SortCard;
