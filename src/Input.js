import React from "react";

const handleInput = () => {
  var val = document.getElementById("url").value;
  console.log(val);
};

function Input() {
  return (
    <div className="input">
      <ul>
        <li>
          <textarea
            id="url"
            className="url"
            type="text"
            placeholder="paste urls here. Separate by ','"
          />
        </li>
        <li>
          <button type="submit" onClick={handleInput}>
            Submit
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Input;
