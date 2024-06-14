import React from "react";

function Home() {
  // Định nghĩa đối tượng skill
  let test = ["a", 1, "b", 2];

  test.push("c", 2, "d", 3);

  console.log(test);

  return (
    <div>
      <h1>Home</h1>
      <div></div>
    </div>
  );
}

export default Home;
