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


let root = new mylib.Node("root","value","attr=\"attr value\"")
let c1=root.AddChild(new mylib.Node("child1","child1 value"))
c1.AddChild(new mylib.Node("child12","child12 value"))
console.log (root.ToXML())
if (root.Exists("child12"))println("found "+"child12")
root.Exists("child12","fake value")? println("found "+"child12"):println("no child12 fake value")


/*
myfs.mkdir("../../Flightplans/KSFO",true)
println("")
myfs.mkdir("../../Flightplans/KSFO/fp.fpl")
println("")
myfs.mkdir("./fp.fpl")
println("")
myfs.mkdir("test")
*/
