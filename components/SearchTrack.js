import React from "react";

const SearchTrack = ({ value, handleChange, result }) => {
  return (
    <div className="w-1/2 relative">
      <input
        type="text"
        placeholder="Search a track"
        className="input input-bordered bg-white w-full"
        value={value}
        onChange={handleChange}
      />
      {result.length !==0 && (
        <div className="absolute bg-white w-full max-h-56 overflow-y-auto">
          {result.map((track, i) => {
            return <p key={i}>{track.name}</p>;
          })}
        </div>
      )}
    </div>
  );
};

export default SearchTrack;
