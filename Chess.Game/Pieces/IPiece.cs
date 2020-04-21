using System.Collections.Generic;

namespace Chess.Game.Pieces
{
    public interface IPiece
    {
        int Moves { get; set; }
        Color Color { get; set; }

        IList<Location> GetLegalMoves(Location currentLocation);
        bool IsMoveLegal(Location current, Location newLocation);
    }
}
