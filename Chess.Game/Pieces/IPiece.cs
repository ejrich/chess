using System.Collections.Generic;

namespace Chess.Game.Pieces
{
    public interface IPiece
    {
        Color Color { get; set; }
        Location Location { get; set; }
        void Move(Location location);
        IList<Location> LegalMoves();
    }
}
