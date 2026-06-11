import Carbon from "./src/Carbon.js";

// console.log(Carbon.parse("March of 2024").year(2027));
// console.log(Carbon.parse("March of 2024").addDays(3));


// console.log(Carbon.now().format('j'))
// console.log(Carbon.now().format('h'))
// console.log(Carbon.now().format('H'))
// console.log(Carbon.now().format('s'))
// console.log(Carbon.now().format('S'))
// console.log(Carbon.now().year(2027).format('i'))
// console.log(Carbon.now().year(2027).format('M'))
// console.log(Carbon.now().year(2027).format('l'))
// console.log(Carbon.now().year(2027).format('F'))
// console.log(Carbon.now().year(2027).format('D'))
// console.log(Carbon.now().year(2027).format('d'))
// console.log(Carbon.now().year(2027).format('h'))
// console.log(Carbon.now().year(2027).format('H'))
// console.log(Carbon.now().year(2027).format('F'))
// console.log(Carbon.now())
// console.log(Carbon.today())

// window.Carbon = Carbon;

// console.log(Carbon.createFromFormat('Y-m-d', '2024-11-08'));
// console.log(Carbon.createFromFormat('M d, y h:m:s', 'Nov 7,    24 12:10:07'));
// console.log(Carbon.createFromFormat('F d, Y', 'May 17, 1998'));
// console.log(Carbon.createFromFormat('c', '2024-11-08T12:28:07.103Z').format('u'));
// console.log(Carbon.createFromFormat('c', '2024-11-08T12:28:07.103Z').getMilliseconds());
// console.log(Carbon.createFromFormat('Y-m-dTh:i:s.uZ', '2024-11-08T11:28:07.103Z').format('d/m/Y h:i:s A'))
console.log(Carbon.createFromFormat('Y-m-dTh:i:s.uZ', '2024-11-08T11:28:07.103Z').formatSentence('John will arrive on {d/m/Y} at {h:i:s A} and and we will have to make him leave at {c} seconds.'));

// const JSCarbon = Window.Carbon;

export default Carbon;
