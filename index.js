const myfp=require("./flightplan")
const myxml=require("./myxml")
const myfs=require("./myfs")
const ms=require("./mystrings")
const fs=require("fs")
const https=require("https") 
const myhttps=require("./myhttps")

var printHold = ""
const print = (msg) => {
  printHold+=msg;
}
const println = (msg) => {
  console.log(printHold+msg);
  printHold="";
}

/*
test code for myxml (Currently just the Node class)

let root = new myxml.Node("root","value","attr=\"attr value\"")
let c1=root.AddChild(new myxml.Node("child1","child1 value"))
c1.AddChild(new myxml.Node("child12","child12 value"))
console.log (root.ToXML())
// find a node
if (root.Exists("child12"))println("found "+"child12")
println("search for a node with an invalid value")
root.Exists("child12","fake value")? println("found "+"child12"):println("no child12 fake value")
println("retrieve a node, then insert one after it")
let found = root.GetNode("child12","child12 value")
if (found!=null)
{
  found.AddChild(new myxml.Node("child13"))
  println("parent value="+found.Parent.Value)
}
println("print from root after inserting a child")
console.log(root.ToXML())
*/

/*
flightplan testing
create a small flightplan, save it to a file, and verify upload to IF

let fp= new myfp.FlightPlan("testing");
fp.AddUserFix("fix1",32,-117,5000)
fp.AddUserFix("fix2",33,-118)
fs.writeFile("./test.fpl", fp.ToXml() , function (err) 
  {
    if (err) throw err;
    console.log("test.fpl"+ ' Replaced!');
  });
// print it out
println(fp.ToXml())
*/

/*
myfs testing
mkdir will create folders as necessary to build the complete path
it will stop if it encounters a filename
*/
/*
myfs.mkdir("../../Flightplans/KSFO",true)
println("")
myfs.mkdir("../../Flightplans/KSFO/fp.fpl")
println("")
myfs.mkdir("./fp.fpl")
println("")
myfs.mkdir("test")
*/

/*
mystrings testing
*/


const srch = 
[
  "find something in this string string. the target will be identified below",
  [
    [2,"string"],
    [1,"the "],
    [1," will"]
  ],
  [
  ["r","s"],
  ["a","i"],
  ["ge","bm"]
  ]
]

/*
let offset = ms.Occurance(2,"string",srch[0]);
console.log(offset)
let newstr= srch[0].substring(offset);
console.log(newstr);
let newoffset = ms.Occurance(1,"find",srch[0]);
console.log(newoffset)



let found = ms.FindBracketed(srch[0],srch[1]);
console.log(found)
found = ms.FindBracketed(srch[0],srch[1],srch[2]);
console.log(found)
*/

/*
The following strings are used to find text inside a website

search=the url of the website

searchTags=an array of array of array of strings used to locate the text to be returned.
first element is the occurance number of the string
second element is the string to locate
the last two arrays bracket the target string
*/
const search = [
  ['https://www.airnav.com/airport/'],
  ['https://flightplandatabase.com/airport/'],
  ['https://www.airport-data.com/world-airports/'],
  ['https://skyvector.com/airport/']
  ];
  
/*
each block in here cerresponds with the same indexed url in search above
*/
const searchTags = 
[
  [
  [1,"Lat/Long"],
  [2,"<BR>"],
  [3,"<BR>"]
  ],
  
  [
  [1,"JSON.parse"],
  [1,"\"lat\":"],
  [1,",\"mag"]
  ]
]

const substitute =
[
  [
    ["",""]
  ],
  [
    ["\"lon\":",""]
  ]
]

myhttps.getContent(search[3]+"ksan")
        .then((html)=>
        {
          println(html)
          //let ll=ms.FindBracketed(html,searchTags[1],substitute[1])
          console.log(ll)
        }
        )
        .catch((err)=>
        {
          println(err)
          console.log(err.message);
          process.stdout.write(strings.optionprompt)
        })
        


