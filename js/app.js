var myModal = new bootstrap.Modal(document.getElementById('tutorialModal'), focus)
let tutorialIndex=0;
myModal.show();
let tutorialNext,tutorialPage;
var waitForModal = setInterval(getModalAssets, 100);
function getModalAssets() {
tutorialNext=document.getElementById('tutNext');
tutorialInfo=document.getElementById('tutorialInfo');
tutorialInfo.innerHTML = '<h3 class="tutorialPage1">Welcome to Dijkstra Shortest Path Visualization!</h3><br><p class="tutorialPage1p">This short tutorial will walk you through the features of this application</p><img class="tutorialP1img" src="images/tutorialP1.png"></img>' ;
tutorialNext.addEventListener("click",nextTutPage);
 clearInterval(waitForModal);
}

function nextTutPage(){
tutorialIndex++;
switch (tutorialIndex) {
  case 1:
    tutorialInfo.innerHTML ='<h5 class="tutorialPage2">Basics</h5><p>Start by placing the start node and goal node by dragging them to your desired spot</p><img src="images/tutorialP3.png"></img> ';
    break;

  case 2:
    tutorialInfo.innerHTML ='<h5>Adding Walls</h5><p>By clicking and dragging the mouse on the grid you can add walls, they are impenetrable meaning a path cannot cross them</p><img src="images/drawWall.gif"></img> ';
    break;

  case 3:
    tutorialInfo.innerHTML ='<h5>Removing Walls</h5><p>By right-clicking and dragging the mouse on the grid you can remove walls</p><br><img src="images/removeWall.gif"></img> ';
    break;
  
  case 4:
    tutorialInfo.innerHTML ='<h2 class="tutorialPage5">I hope you have fun playing around with it as I had building it!</h2><br><br><img class="covid" src="images/tutorialP6.png"></img>';
    tutorialNext.innerHTML='Start';
    let skip=document.getElementById('skipBtn');
    skip.remove();

    break;
  case 5:
    myModal.toggle();
    break;
  }
}


function executeDijkstra(){
  djikstraRunning=true;
    if(!nodes || !startNode || !endNode)
    {
      return;
    }
    let curr = startNode;
    let distanceMap = new Map();
    let processed = new Set();
    let choices = [[1,0],[-1,0],[0,-1],[0,1]];
    let parentMap = new Map();
    parentMap.set(curr,null);
    for(let i = 0 ; i < nodes.length ; ++i){
      for(let j = 0 ; j < nodes[i].length ; ++j){
        distanceMap.set(nodes[i][j],Infinity);
      }
    }
    distanceMap.set(curr,0);
    // let minHeap = new MinHeap();
    let minHeap = [];
    // minHeap.insert(curr);
    minHeap.push(curr);
    setTimeout(dijkstra,0,nodes,startNode,endNode,distanceMap,processed,choices,parentMap,minHeap);
  }

  function executeDrawPath(parentMap,endNode){
    let path = getPath(parentMap,endNode);
    setTimeout(drawPath,0,0,path);
  }
  function getPath(parentMap,curr){
    let path = [];
    while(curr !== null){
      path.unshift(curr);
      curr = parentMap.get(curr);
    }
    return path;
  }
  function drawPath(counter,path){
        if(counter !== path.length){
        const curr = path[counter];
        curr.htmlRef.classList.add("node-path");
        setTimeout(drawPath,45,++counter,path);
    }
  }
let startButton=document.querySelector("body > div > a.btn.btn-warning.btn-lg");
startButton.addEventListener("click",executeDijkstra);
let clearGridButton = document.querySelector("body > div > a.btn.btn-info.btn-lg");  
clearGridButton.addEventListener("click",clearGrid);

