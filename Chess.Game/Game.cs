using Chess.Game.Board;
using Chess.Game.Pieces;

namespace Chess.Game
{
    public class Game
    {
        private readonly IBoardFactory _boardFactory;
        private ChessBoard _chessBoard;

        public Game(IBoardFactory boardFactory)
        {
            _boardFactory = boardFactory;

            _chessBoard = _boardFactory.CreateBoard();
        }

        public Player White { get; set; }
        public Player Black { get; set; }
        public Color Turn { get; set; }

        public void TakeTurn(IPiece piece, Location location)
        {
            
        }
    }
}
