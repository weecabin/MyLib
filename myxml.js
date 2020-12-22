/*
This class is used to generate all Nodes of an XML structure.
Each Node may contain any number of child Nodes.
the structure of the node is as follows...
<name attribute>value</name>
where attribure and value may be null, or not specified
*/

var printHold = ""
const print = (msg) => {
  printHold+=msg;
}
const println = (msg) => {
  console.log(printHold+msg);
  printHold="";
}

class Node
{
  constructor(name,value,attribute)
  {
    this.Name = name; 
    this.Value = "";
    if (typeof(value) != "undefined")
      this.Value = value;
    this.Attribute = "";
    if (typeof(attribute)!="undefined")
      this.Attribute=" "+attribute;
    this.Children=[];
    this.Indent="";
    this.Version = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
    this.Parent=null;
  }
  // adds a Node below this Node
  AddChild(childNode)
  {
    childNode.Parent=this;
    childNode.Version="";
    childNode.Indent+=this.Indent+"  ";
    this.Children.push(childNode);
    return childNode;
  }
  /*
  checks for the existance of a Node with the specifed 
  name & value, or just the name if the value field is empty
  at any level below this node
  */
  Exists(name,value)
  {
    //println("value="+value)
    if (this.Name==name && (this.Value==value || value==undefined))
      return true;
    var i=0;
    while(i<this.Children.length)
    {
      if (this.Children[i].Exists(name,value))
        return true;
      i++;
    }
    return false;
  }
  
    /*
  checks for the existance of a Node with the specifed 
  name & value, or just the name if the value field is empty
  at any level below this node. 
  Returns a reference to the node if found, or null if not
  */
  GetNode(name,value)
  {
    //println("in "+this.Value)
    if (this.Name==name && (this.Value==value || value==undefined))
      return this;
    var i=0;
    while(i<this.Children.length)
    { 
      let child = this.Children[i].GetNode(name,value)
      if (child!=null)
        return child;
      i++;
    }
    return null;
  }
  
  // returns a string representing the data below this Node
  ToXML()
  {
    //println("building "+this.Name)
    var ret = this.Version;
    ret += this.Indent+"<"+this.Name+this.Attribute+">"+this.Value;
    if (this.Children.length==0)
      ret += "</"+this.Name+">\n";
    else
      ret += "\n";
    var i=0;
    while (i<this.Children.length)
    {
       ret += this.Children[i].ToXML();
       i++;
    }
    if (this.Children.length!=0)
      ret+=this.Indent+"</"+this.Name+">\n";
    return ret;
  }
 }
 module.exports.Node = Node;