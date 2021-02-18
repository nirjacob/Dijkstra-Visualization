class Node{
    constructor(htmlRef, row, col, isStart = false, isEnd = false, isWall = false,distance=Infinity){
      this.row = row;
      this.col = col;
      this.isStart = isStart;
      this.isEnd = isEnd;
      this.isWall = isWall;
      this.htmlRef = htmlRef;
      this.distance=distance;
    }
}