import "./App.css";
import React, { useState, useEffect } from "react";

//const allImages = [1, 2];
function App() {
  const [allImages, setAll] = useState([]);
  const [URLS, setUrl] = useState(null);
  const [generated, setGenerated] = useState(null);

  const handleGenerate = async () => {
    const request = await fetch("http://localhost:5000/pr/process", {
      method: "POST",
      body: URLS?.join(","),
      headers: { "Content-Type": "application/json" },
    });
    var imgBlob = await request.blob();
    setGenerated(imgBlob);
  };
  const handleInput = () => {
    var val = document.getElementById("url").value;
    val = val.split(",");
    console.log(val);
    setUrl(val);
  };
  useEffect(() => {
    if (URLS)
      URLS.map((val) => {
        fetchData(val);
      });
  }, [URLS]);

  async function fetchData(url) {
    console.log("fetching");
    if (URLS) {
      const request = await fetch("http://localhost:5000/pr", {
        method: "POST",
        body: url,
        headers: { "Content-Type": "application/json" },
      });

      var imgBlob = await request.blob();
      setAll((prev) => [...prev, imgBlob]);
      //allImages.push(imgBlob);
      console.log("allImagesHere", allImages);
      // fetch("http://localhost:5000/pr", {
      //   method: "POST",
      //   body: {
      //     url: "URLS[0]",
      //   },
      // });
      // fetch("http://localhost:5000/pr/get");

      return request;
    }
  }
  // useEffect(() => {
  //   fetchData();
  //   console.log("allImages", allImages);
  // }, [URLS]);
  return (
    <div className="App">
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

      <div className="container">
        <div>Original work</div>
        <div className="original">
          {console.log("allImages", allImages)}
          {allImages.map((val) => {
            console.log("val", val);
            const url = URL.createObjectURL(val);
            console.log(url);
            return <img className="ojimage" key={url} src={url}></img>;
          })}
        </div>
        <div>
          <button className="generate" onClick={handleGenerate}>
            Generate
          </button>
        </div>
        <div>Generated</div>
        <div className="display">
          <img src={generated ? URL.createObjectURL(generated) : ""}></img>
        </div>
      </div>
    </div>
  );
}

export default App;
