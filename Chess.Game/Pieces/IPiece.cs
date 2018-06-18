using System.Collections.Generic;

namespace Chess.Game.Pieces
{
    public interface IPiece
    {
        bool Moved { get; set; }
        Color Color { get; set; }

        IList<Location> GetLegalMoves(Location currentLocation);
        bool IsMoveLegal(Location current, Location newLocation);
    }
}
