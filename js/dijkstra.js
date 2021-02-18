function dijkstra(grid, start, end,distanceMap,processed,choices,parentMap, minHeap){
    let curr = null;
    if(minHeap.length){
      minHeap.sort((a,b) => distanceMap.get(b) - distanceMap.get(a));
      curr = minHeap.pop();
      let cell = curr.htmlRef;
      if(processed.has(curr)){
        cell.classList.add("node-backtrack");
        setTimeout(dijkstra,0,grid,start,end,distanceMap,processed,choices,parentMap,minHeap)
        return;
      }
      curr.htmlRef.classList.add("node-current");
      setTimeout(()=> {cell.classList.remove("node-current"); cell.classList.add("node-check");},1000);
      processed.add(curr);
      if(curr === end){
        executeDrawPath(parentMap,curr);
        djikstraRunning=false;
        return;
      }
      for(let i = 0 ; i < choices.length ; ++i){
        let row = curr.row + choices[i][0];
        let col = curr.col + choices[i][1];
        if(grid[row] && grid[row][col] && !grid[row][col].isWall && !processed.has(grid[row][col])){
          let currDistance = distanceMap.get(curr);
          let edgeDistance = !grid[row][col].weight ? 1 : grid[row][col].weight;
          let newDistance = currDistance + edgeDistance;
          if(newDistance <= distanceMap.get(grid[row][col])){
            parentMap.set(grid[row][col],curr);
            distanceMap.set(grid[row][col],newDistance);
          }
          minHeap.push(grid[row][col]);
        }
      }
    setTimeout(dijkstra,0,grid,start,end,distanceMap,processed,choices,parentMap,minHeap)
    }else{
      return;
    }
  }
