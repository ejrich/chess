using Chess.Game.Pieces;

namespace Chess.Game.Board
{
    public class ChessBoard
    {
        public Location[,] Squares { get; set; }

        public Location GetLocation(Files files, int rank)
        {
            return Squares[(int) files - 1, rank - 1];
        }

        public void SetLocation(IPiece piece, Files files, int rank)
        {
            Squares[(int) files - 1, rank - 1].Piece = piece;
        }
    }
}
