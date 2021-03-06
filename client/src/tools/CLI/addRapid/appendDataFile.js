var fs = require("fs");
var nameParser = require("../nameParser.js");

module.exports = function ({ rapidName }) {
  console.log("append data file starting...");

  //Deconstruct name parser
  const { rapid, userInput } = nameParser;

  //Copy RiverList
  var content = fs.readFileSync(`data.js`, "utf8");

  //Define an import line
  var rapidImport = `import ${rapid(
    rapidName
  )} from "./basemaps/${nameParser.rapid(rapidName)}.js";`;

  //Define chunk of data
  var rapidChunk = `{
    name: "${rapidName}",
    desc: "Class III",
    displayPosition: {
      top: "70vh",
      left: "22vw",
      width: "35vw",
    },
    riverMap: {
      viewBox: "0 0 1600 900",
      path: ${nameParser.rapid(rapidName)},
    },
    hydraulics: [
      {
        name: "Booty Beer Wave",
        desc:
          "Add information about the feature. Is it a ledge, hole or wave? Is it shallow, sticky, trashy, glassy, flushy? Is there a certain level where it is prime for surfing, or maybe especially dangerous?",
        y: "463.55",
        x: "589.11",
        height: "58.73",
        width: "13.44",
        rotation: 1,
        range: [-10, 13],
      }, //Booty Beer Wave
    ],
    eddys: [
      {
        name: "Hotshot Eddy",
        desc:
          "What is this eddy used for? Is it easy to catch? Difficult to exit? Land Access?",
        vector:
          "M57.7367 100.472C112.332 100.472 150.868 97.0028 157.209 77.01C164.801 53.0702 161.941 37.64 106.045 30.2237C36.1735 20.9535 8.56346 41.3981 12.9053 63.0286C17.2471 84.6591 30.113 100.472 57.7367 100.472Z",
        x: "725",
        y: "250",
        range: [-10, 10],
      }, //Hotshot Eddy
    ],
    lines: [
      {
        name: "Pick Your Poison",
        desc:
          "Explain the line. Where to start, reference points on the river, hazards to avoid, what to expect.",
        vector: "M 150,455q 300,58 500,-10Q 1000,340 1180,800",
        range: [-100, 100],
      }, //Pick Your Poison
    ],
    symbols: [
      {
        type: "Caution",
        desc:
          "There is no safe way to navigate this rapid at this water level.",
        top: "200",
        left: "200",
      }, // Caution
    ],
    arrows: [
      {
        name: "Nexterino Rapid",
        rotation: "160deg",
        bottom: "4vh",
        right: "5vw",
      }, //Nexterino Rapid
    ],
    mapLabel: {
      titleTop: "45vh",
      titleLeft: "11vw",
      pointerDirection: "bottom",
      pointerCoordinates: "35,47",
    }, 
  }, // "${userInput(rapidName)}"`;

  //Add import line
  var result = content.replace(
    /\/\/importEntryPoint/,
    `${rapidImport} //importEntryPoint`
  );

  //Add import chunk
  result = result.replace(
    /\/\/rapidEntryPoint/,
    `${rapidChunk}
  //rapidEntryPoint`
  );

  //Write to a fresh data.js file
  let wstream = fs.createWriteStream(`data.js`);
  wstream.write(result, function (err) {
    if (err) throw err;
    console.log("append data file complete.");
  });
};
