import React from "react";

const test = () => {
  const handleOpen = () => {
    console.log("show ");
    const obj = {
      name: "test",
      phoneNo: 34920129,
      age: 19,
      gender: "male",
    };
    const objTwo = {
      name: "test1",
      phoneNo: 303322,
      age: 34,
      gender: "female",
    };
    const objThree = {
      name: "test1",
      phoneNo: 303322,
      age: 34,
      gender: "female",
    };
    return obj, objTwo, objThree;
  };
  const handleUtils = () => {
    console.log("utils called");
  };
  return (
    <div>
      test
      <h1 onClick={handleOpen}>another component</h1>
      <h1 onClick={handleUtils}>test util function {}</h1>
    </div>
  );
};

export default test;
