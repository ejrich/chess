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

        public bool TakeTurn(Location current, Location newLocation)
        {
            var piece = _chessBoard.GetLocation(current.File, current.Rank).Piece;

            if (piece == null)
                return false;

            var isLegal = DetermineMoveIsLegal(piece, current, newLocation);

            if (isLegal)
            {
                _chessBoard.SetLocation(null, current.File, current.Rank);
                _chessBoard.SetLocation(piece, newLocation.File, newLocation.Rank);
            }

            return isLegal;
        }

        private static bool DetermineMoveIsLegal(IPiece piece, Location current, Location newLocation)
        {
            if (piece.Color == newLocation.CurrentColor)
                return false;

            var legalMoves = piece.GetLegalMoves(current.File, current.Rank);

            return legalMoves.Contains(newLocation);
        }
    }
}
