using Chess.Game.Pieces;

namespace Chess.Game
{
    public class Location
    {
        public int Rank { get; set; }
        public int File { get; set; }
        public IPiece Piece { get; set; }
    }
}
