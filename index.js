const mylib=require("./xmlFlightplan")
const myfs=require("./myfs")

var printHold = ""
const print = (msg) => {
  printHold+=msg;
}
const println = (msg) => {
  console.log(printHold+msg);
  printHold="";
}


let node = new mylib.Node("root","value","attr=\"attr value\"")
node.AddChild(new mylib.Node("child1","child1 value"))
console.log (node.ToXML())



myfs.mkdir("../../Flightplans/KSFO")
println("")
myfs.mkdir("../../Flightplans/KSFO/fp.fpl")
println("")
myfs.mkdir("./fp.fpl")
println("")
myfs.mkdir("test")
