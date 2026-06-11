import Carbon from "./Carbon.js";

let date = Carbon.now()
    .format('d/m/Y h:i:s A');
console.log("Carbon.now() was executed, The formated date as d/m/Y h:i:s A of the current time is " + date);