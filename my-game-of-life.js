var Cell = function(status, neighbourhood){
  this.status = status;
  this.neighbourhood = neighbourhood;
};

Cell.statusLive = 1;
Cell.statusDead = 0;

Cell.prototype.isAlive = function(){
  return this.status === Cell.statusLive;
};

Cell.prototype.getNeighbourCount = function () {
  var neighbourCount = 0;
  this.neighbourhood.forEach(function(row){
    row.forEach(function(cell){
      neighbourCount = neighbourCount + cell;
    });
  });
  return neighbourCount - this.status;
};

var CellFateDecider = {
  willSurvive: function(cell){
    var neighbourCount = cell.getNeighbourCount();
    if(cell.isAlive()){
      return this._willLiveCellSurvive(neighbourCount);
    }else{
      return this._willDeadCellLive(neighbourCount);
    }
  },
  
  _willLiveCellSurvive: function (neighbourCount) {
    if(neighbourCount === 2 || neighbourCount === 3){
      return true;
    }else{
      return false;
    }
  },

  _willDeadCellLive: function (neighbourCount) {
    if(neighbourCount === 3){
      return true;
    }else{
      return false;
    }
  }
};

var Board = function(boardConfiguration){
  this.boardConfiguration = boardConfiguration;
  this.numberOfRows = boardConfiguration.length;
  this.numberOfColumn = boardConfiguration[0].length;
};

Board.prototype.getNeighbourhoodAt = function(rowIndex, columnIndex){
  var neighbourhood = [
    [this.getCellStatusAt(rowIndex - 1, columnIndex - 1),
    this.getCellStatusAt(rowIndex - 1, columnIndex - 0),
    this.getCellStatusAt(rowIndex - 1, columnIndex + 1)],
    
    [this.getCellStatusAt(rowIndex - 0, columnIndex - 1),
    this.getCellStatusAt(rowIndex - 0, columnIndex - 0),
    this.getCellStatusAt(rowIndex - 0, columnIndex + 1)],
    
    [this.getCellStatusAt(rowIndex + 1, columnIndex - 1),
    this.getCellStatusAt(rowIndex + 1, columnIndex - 0),
    this.getCellStatusAt(rowIndex + 1, columnIndex + 1)],
  ];
  return neighbourhood;
};

Board.prototype.getCellStatusAt = function(rowIndex, columnIndex){
  var row = this.boardConfiguration[rowIndex];
  if(row){
    return row[columnIndex] || Cell.statusDead;
  }else{
    return Cell.statusDead;
  }
};

Board.prototype.killCellAt = function(rowIndex, columnIndex){
  this.boardConfiguration[rowIndex][columnIndex] = Cell.statusDead;
};

Board.prototype.giveLifeAt = function(rowIndex, columnIndex){
  this.boardConfiguration[rowIndex][columnIndex] = Cell.statusLive;
};

Board.prototype.getCellAt = function(rowIndex, columnIndex){
  return new Cell(this.getCellStatusAt(rowIndex, columnIndex),
                 this.getNeighbourhoodAt(rowIndex, columnIndex));
};
