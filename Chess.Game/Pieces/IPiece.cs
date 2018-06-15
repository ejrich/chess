using System.Collections.Generic;

namespace Chess.Game.Pieces
{
    public interface IPiece
    {
        Color Color { get; set; }

        IList<Location> GetLegalMoves(Location currentLocation);
    }
}
