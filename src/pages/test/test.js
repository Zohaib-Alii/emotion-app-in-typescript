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
    return obj;
  };
  return (
    <div>
      test
      <h1 onClick={handleOpen}>another component</h1>
    </div>
  );
};

export default test;
