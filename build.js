"use strict"; 

const spawn = require("child_process").spawn;
const spawnOptions = { stdio: "inherit" };
const suffix = (process.platform === "win32") ? ".cmd" : "";
 
const watchMode = process.argv[2] === "-w";
const bundler = watchMode ? "watchify" : "browserify";
const watchArgs = watchMode ? [ "-w" ] : []; 

spawn(`tsc${suffix}`, [ "-p", `${__dirname}/src` ], spawnOptions).on("close", () => {
  if (watchMode) spawn(`tsc${suffix}`, watchArgs.concat([ "-p", `${__dirname}/src` ]), spawnOptions);
  spawn(`${bundler}${suffix}`, [ `${__dirname}/src/index.js`, "-s", "ResizeHandle", "-o", `${__dirname}/lib/ResizeHandle.js` ], spawnOptions);
});
