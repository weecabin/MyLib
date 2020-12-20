const mylib=require("./xmlFlightplan")

let node = new mylib.Node("root","value","attr=\"attr value\"")
node.AddChild(new mylib.Node("child1","child1 value"))
console.log (node.ToXML())