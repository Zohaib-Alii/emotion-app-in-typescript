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
    return obj, objTwo;
  };
  return (
    <div>
      test
      <h1 onClick={handleOpen}>another component</h1>
    </div>
  );
};

export default test;
