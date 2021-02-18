let nodeSize = 30;
let gridRowLen= 20;
let gridColLen= 45;
let isLageGrid=false;
let prevStart=null,prevEnd=null;
let setNode=null;
let djikstraRunning = false;

let nodes=[];
let grid=null;
let rightClick = false;

let startNodeR= Math.floor(Math.random() * gridRowLen);
let startNodeC= Math.floor(Math.random() * gridColLen);
let endNodeR= Math.floor(Math.random() * gridRowLen);
let endNodeC= Math.floor(Math.random() * gridColLen);

document.addEventListener('contextmenu', event => event.preventDefault());

function makeGrid(){
    grid = document.createElement("tbody");
    grid.id = "grid";
    document.querySelector("#grid-box").appendChild(grid);
    // ADD GENERIC START&END NODES HERE
    let gridFragment = document.createDocumentFragment();
    outer: for(let i = 0 ; i < gridRowLen ; ++i){
      let gridRows = document.createElement("tr");
      gridRows.className = "grid-row";
       nodes.push([]);
       inner: for(let j = 0 ; j < gridColLen ; ++j){
         let htmlRef = document.createElement("td");
         htmlRef.className = "node";
         htmlRef.dataset["row"] = i;
         htmlRef.dataset["col"] = j;
           htmlRef.setAttribute("style","width",nodeSize);
           htmlRef.style.width = `${nodeSize}px`;
           htmlRef.style.height = `${nodeSize}px`;
         nodes[i][j] = new Node(htmlRef,i,j);
            if(i === startNodeR && j === startNodeC){
            htmlRef.classList.add("startNode");
            startNode = nodes[i][j];
            prevStart=startNode;
            nodes[i][j].isStart = true;
            }
            else if(i === endNodeR && j === endNodeC){
            htmlRef.classList.add("endNode");
            endNode = nodes[i][j];
            nodes[i][j].isEnd = true;
            prevEnd=endNode;
            }
         gridRows.appendChild(htmlRef);
       }
       gridFragment.appendChild(gridRows);
    }
  
    grid.appendChild(gridFragment);
}
  

makeGrid();
grid.addEventListener("mousedown",nodeClickDwn);
grid.addEventListener("mouseup",nodeClickUp);
function nodeMove(e){
    if(setNode==="START"){
      let row = e.target.dataset["row"];
      let col = e.target.dataset["col"];
        if(!nodes[row][col].isWall&&!nodes[row][col].isEnd){
          prevStart.isStart=false;
          prevStart.htmlRef.classList.remove("startNode");
          nodes[row][col].isStart = true;
          nodes[row][col].htmlRef.classList.add("startNode");
          startNode = nodes[row][col];
          prevStart = nodes[row][col];
        }
    }
    if(setNode==="END"){
      let row = e.target.dataset["row"];
      let col = e.target.dataset["col"];
      if(!nodes[row][col].isWall&&!nodes[row][col].isStart){
          prevEnd.isEnd=false;
          prevEnd.htmlRef.classList.remove("endNode");
          nodes[row][col].isEnd = true;
          nodes[row][col].htmlRef.classList.add("endNode");
          endNode = nodes[row][col];
          prevEnd = nodes[row][col];
      }
  }
}
function nodeHovering(e){
    if(e.target.className!== "node"&&e.target.className!== "node nodeWall"){
        return;
    }
    if(rightClick){//Right Click
        let i = e.target.dataset["row"];
        let j = e.target.dataset["col"];
        let node = nodes[i][j];
        nodes[i][j].isWall = false;
        e.target.classList.remove("nodeWall");
        return;
    }
    else{//Left Click
        let i = e.target.dataset["row"];
        let j = e.target.dataset["col"];
        let node = nodes[i][j];
        nodes[i][j].isWall = true;
        e.target.classList.add("nodeWall");
        return;
    }
    
}
function nodeClickDwn(e){
   if(e.target.classList.contains("startNode")){
      let row = e.target.dataset["row"];
      let col = e.target.dataset["col"];
      prevStart=nodes[row][col];
      setNode="START";
      grid.addEventListener("mousemove",nodeMove);
    }
    if(e.target.classList.contains("endNode")){
      let row = e.target.dataset["row"];
      let col = e.target.dataset["col"];
      prevEnd=nodes[row][col];
      setNode="END";
      grid.addEventListener("mousemove",nodeMove);
    }
    if(e.button==2){//Right click clicked
        rightClick=true;
    }
    if(e.target.className!== "node"){
        return;
    }
    grid.addEventListener("mouseover",nodeHovering);
}

function nodeClickUp(e){
    grid.removeEventListener("mouseover",nodeHovering);
    grid.removeEventListener("mousemove",nodeMove);
    setNode=null;
    rightClick = false;
}

function clearGrid(){
if(!djikstraRunning){
for(let i = 0 ; i < gridRowLen ; ++i){
  for(let j = 0 ; j < gridColLen ; ++j){
    nodes[i][j].htmlRef.className = "node";
    nodes[i][j].isWall=false;
    
      if(nodes[i][j].isStart){
          nodes[i][j].htmlRef.classList.add("startNode");
        }else{
          nodes[i][j].isStart = false;
        }
      if(nodes[i][j].isEnd){
          nodes[i][j].htmlRef.classList.add("endNode");
        }else{
          nodes[i][j].isEnd = false;
        }
      }
    }
}
}


function makeLargeGrid(){
 grid.remove();
  nodeSize = 5;
  gridRowLen= 120;
 gridColLen= 245;  
 isLageGrid=true;
makeGrid();
grid.addEventListener("mousedown",nodeClickDwn);
grid.addEventListener("mouseup",nodeClickUp);
}