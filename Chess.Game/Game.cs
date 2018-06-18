using Chess.Game.Board;

namespace Chess.Game
{
    public class Game
    {
        private readonly IBoardFactory _boardFactory;
        private readonly ChessBoard _chessBoard;

        public Game(IBoardFactory boardFactory)
        {
            _boardFactory = boardFactory;

            _chessBoard = _boardFactory.CreateBoard();
        }

        public Player White { get; set; }
        public Player Black { get; set; }
        public Color Turn { get; set; }

        public bool TakeTurn(Files currentFile, int currentRank, Files newFile, int newRank)
        {
            var currentLocation = _chessBoard.GetLocation(currentFile, currentRank);
            var newLocation = _chessBoard.GetLocation(newFile, newRank);
            var piece = currentLocation.Piece;

            if (piece == null)
                return false;

            var isLegal = piece.IsMoveLegal(currentLocation, newLocation);

            if (isLegal)
            {
                _chessBoard.SetLocation(null, currentFile, currentRank);
                _chessBoard.SetLocation(piece, newFile, newRank);
                piece.Moved = true;
            }

            return isLegal;
        }
    }
}
