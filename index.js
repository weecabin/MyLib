const myfp=require("./flightplan")
const myxml=require("./myxml")
const myfs=require("./myfs")

var printHold = ""
const print = (msg) => {
  printHold+=msg;
}
const println = (msg) => {
  console.log(printHold+msg);
  printHold="";
}

let root = new myxml.Node("root","value","attr=\"attr value\"")
let c1=root.AddChild(new myxml.Node("child1","child1 value"))
c1.AddChild(new myxml.Node("child12","child12 value"))
console.log (root.ToXML())
if (root.Exists("child12"))println("found "+"child12")
root.Exists("child12","fake value")? println("found "+"child12"):println("no child12 fake value")
// try inserting a Node after a returned Node
let found = root.GetNode("child12","child12 value")
if (found!=null)
{
  found.AddChild(new myxml.Node("child13"))
  println("parent value="+found.Parent.Value)
}
 
println("print it again after inserting a child")
console.log(root.ToXML())

let fp= new myfp.FlightPlan("testing");
fp.AddUserFix("fix1",32,-117)
fp.AddUserFix("fix2",33,-118)
println(fp.ToXml())

/*
myfs.mkdir("../../Flightplans/KSFO",true)
println("")
myfs.mkdir("../../Flightplans/KSFO/fp.fpl")
println("")
myfs.mkdir("./fp.fpl")
println("")
myfs.mkdir("test")
*/
