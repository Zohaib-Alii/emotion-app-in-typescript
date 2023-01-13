import React from "react";

const test = () => {
  const handleOpen = () => {
    console.log("show ");
  };
  return (
    <div>
      test
      <h1 onClick={handleOpen}>another component</h1>
    </div>
  );
};

export default test;
