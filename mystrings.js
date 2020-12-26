const search = [
  ['https://www.airnav.com/airport/'],
  ['https://flightplandatabase.com/airport/'],
  ['https://www.airport-data.com/world-airports/']
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

/*
finally, this is used to replace a substring in the target string
*/
const replacestrings =
[
  ["",""],
  ["\"lon\":",""]
]
var srchStringIndex =1;

// updates the airport database for airportICAO
// Does nothing if it already exists
function FindBracketed(stringToSearch,locate,replace)
{
  //println(xmlString);
  let sub = stringToSearch;
  let n = Occurence(locate[0][0], locate[0][1], sub);
  if (n<0)return "";
  sub = sub.substring(n)
  if (locate.length==1) return sub;
  sub = sub.substring(locate[0][1].length)
  //console.log("locate.lenght="+locate.length)
  for (let i=1;i<locate.length;i++)
  { 
    //console.log("loop index ",i)
    n = Occurence(locate[i][0], locate[i][1], sub);
    if (n<0)return "";
    if (i>=locate.length-1)
    {
      let ret = sub.substring(0,n);
      ret = ret.replace(replace[0], replace[1])
      return ret;
    }
    sub = sub.substring(n+ locate[i][1].length)
    //console.log(sub)
  }
  return sub;
}

// returns the offset into mainstr for the n'th searchstr'
function Occurence(count,searchstr,mainstr)
{
  //console.log("Occurance:"+count+"/"+searchstr+"/"+ mainstr)
  let offset=0;
  for (let i=0;i<count;i++)
  {
    let n = mainstr.substring(offset).indexOf(searchstr);
    if (n>=0)
    {
      offset+=n+ searchstr.length;
    }
    else
    {
      //console.log("error");
      return -1
    }
    //console.log(offset);
    //console.log(mainstr.substring(offset)) 
  }
  let ret= offset-searchstr.length;
  //console.log("Occurance:"+mainstr.substring(ret))
  return ret;
}

module.exports =
{
  FindBracketed: FindBracketed,
  Occurance:Occurence
}