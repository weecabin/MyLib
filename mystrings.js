/*
finds a string bracketed by other strings
stringToSearch:
The string to search...
"find something is this string string. the target will be identified below"

locate:
multidimensional array of search parameters...
[2,"string"],
[1,"the "],
[1," will"]
will find in succession, the 2nd occurance of "string"
then the first occurance of "the "
then the frst occursnce of " will"
it will return the string bracketed by "the " and " will"
*/
function FindBracketed(stringToSearch,locate,substitute)
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
      if (substitute!=undefined)
      {
        for (ri=0;ri< substitute.length;ri++)
        {
          ret = ret.replace(substitute[ri][0], substitute[ri][1])
        }
      }
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