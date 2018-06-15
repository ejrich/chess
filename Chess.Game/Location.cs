using Chess.Game.Pieces;

namespace Chess.Game
{
    public class Location
    {
        public int Rank { get; set; }
        public Files File { get; set; }
        public IPiece Piece { get; set; }
        public Color? CurrentColor => Piece?.Color;

        // Graph of adjacent squares
        public Location Left { get; set; }
        public Location Right { get; set; }
        public Location Back { get; set; }
        public Location Forward { get; set; }
    }
}
