describe('Cell', function(){
  describe('isAlive', function(){
    it('will return true for live cell', function(){
      var neighbourhood = [
        [0,0,1],
        [0,Cell.statusLive,0],
        [1,0,0]
      ];
      var cell = new Cell(Cell.statusLive, neighbourhood);
      expect(cell.isAlive()).toBeTruthy();
    });
    it('will return false for dead cell', function(){
      var neighbourhood = [
        [0,0,1],
        [0,Cell.statusDead,0],
        [1,0,0]
      ];
      var cell = new Cell(Cell.statusDead, neighbourhood);
      expect(cell.isAlive()).toBeFalsy();
    });
  });
  describe('neighbourCount', function(){
    it('will be three if there are three neighbours for live cell', function(){
      var neighbourhood = [
        [0,0,1],
        [0,Cell.statusLive,0],
        [1,0,1]
      ];
      var cell = new Cell(Cell.statusLive, neighbourhood);
      expect(cell.getNeighbourCount()).toEqual(3);
    });
    it('will be three if there are three neighbours for dead cell', function(){
      var neighbourhood = [
        [0,0,1],
        [0,Cell.statusDead,0],
        [1,0,1]
      ];
      var cell = new Cell(Cell.statusDead, neighbourhood);
      expect(cell.getNeighbourCount()).toEqual(3);
    });
  });
});

describe('CellFateDecider', function(){
  describe('live cell', function(){
    var status = Cell.statusLive;
    it('survives if it has two neighbours', function(){
      var neighbourhood = [
        [0,0,1],
        [0,status,0],
        [1,0,0]
      ];
      var cell = new Cell(status, neighbourhood);
      expect(CellFateDecider.willSurvive(cell)).toBeTruthy();
    });
    it('survives if it has three neighbours', function(){
      var neighbourhood = [
        [0,0,1],
        [0,status,0],
        [1,0,1]
      ];
      var cell = new Cell(status, neighbourhood);
      expect(CellFateDecider.willSurvive(cell)).toBeTruthy();
    });
    
    it('will not survive if it has less than two neighbours', function(){
      var neighbourhood = [
        [0,0,0],
        [0,status,0],
        [1,0,0]
      ];
      var cell = new Cell(status, neighbourhood);
      expect(CellFateDecider.willSurvive(cell)).toBeFalsy();
    });
    
    it('will not survive if it has more than three neighbours', function(){
      var neighbourhood = [
        [1,0,1],
        [0,status,0],
        [1,0,1]
      ];
      var cell = new Cell(status, neighbourhood);
      expect(CellFateDecider.willSurvive(cell)).toBeFalsy();
    });
  });
  describe('dead cell', function(){
    var status = Cell.statusDead;
    it('will come back alive if it has three neighbours', function(){
      var neighbourhood = [
        [1,0,1],
        [0,status,0],
        [1,0,0]
      ];
      var cell = new Cell(status, neighbourhood);
      expect(CellFateDecider.willSurvive(cell)).toBeTruthy();
    });
    it('will not live if it has less than three neighbours', function(){
      var neighbourhood = [
        [1,0,0],
        [0,status,0],
        [1,0,0]
      ];
      var cell = new Cell(status, neighbourhood);
      expect(CellFateDecider.willSurvive(cell)).toBeFalsy();
    });
    it('will not live if it has more than three neighbours', function(){
      var neighbourhood = [
        [1,0,1],
        [0,status,0],
        [1,0,1]
      ];
      var cell = new Cell(status, neighbourhood);
      expect(CellFateDecider.willSurvive(cell)).toBeFalsy();
    });
  });
});

describe('Board', function(){
  var boardConfiguration = [
    [1,0,0,0,1],
    [0,0,0,1,0],
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0]
  ];
  var board;
  beforeEach(function(){
    board = new Board(boardConfiguration);
  });
  describe('getCellStatusAt', function(){
    it('will return cell at the given posisiton', function(){
      expect(board.getCellStatusAt(0,0)).toEqual(1);
      expect(board.getCellStatusAt(1,1)).toEqual(0);
    });
    it('will return a dead cell if the given row index is less than zero', function(){
      expect(board.getCellStatusAt(-1,0)).toEqual(0);
    });
    it('will return a dead cell if the given column index is less than zero', function(){
      expect(board.getCellStatusAt(0,-1)).toEqual(0);
    });
    it('will return a dead cell if the given row index is greater than available rows', function(){
      expect(board.getCellStatusAt(7,0)).toEqual(0);
    });
    it('will return a dead cell if the given column index is greater than available column', function(){
      expect(board.getCellStatusAt(0,7)).toEqual(0);
    });
  });
  describe('getNeighbourhoodAt', function(){
    it('will construct neighbourhood for a cell', function(){
      var expectedNeighbourhood = [
        [0,0,1],
        [0,0,0],
        [0,1,0]
      ];
      expect(board.getNeighbourhoodAt(2,2)).toEqual(expectedNeighbourhood);
    });
    it('will return a valid neighbourhood even for cells at the edge', function(){
      var expectedNeighbourhood = [
        [0,0,0],
        [0,1,0],
        [0,0,0]
      ];
      expect(board.getNeighbourhoodAt(0,0)).toEqual(expectedNeighbourhood);
    });
  });
  describe('change cell status', function(){
    it('will kill or save a cell', function(){
      expect(board.getCellStatusAt(0,0)).toEqual(Cell.statusLive);
      board.killCellAt(0,0);
      expect(board.getCellStatusAt(0,0)).toEqual(Cell.statusDead);
      board.giveLifeAt(0,0);
      expect(board.getCellStatusAt(0,0)).toEqual(Cell.statusLive);
    });
  });
  describe('getCellAt', function(){
    it('will return a cell object', function(){
      var expectedNeighbourhood = [
        [0,0,0],
        [0,1,0],
        [0,0,0]
      ];
      console.log("boardConfiguration = ", boardConfiguration);
      var cell = board.getCellAt(0,0);
      expect(cell.status).toEqual(Cell.statusLive);
      expect(cell.neighbourhood).toEqual(expectedNeighbourhood);
    });
  });
});
