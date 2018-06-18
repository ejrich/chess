using System;
using System.Collections.Generic;

namespace Chess.Game.Pieces
{
    public class Queen : IPiece
    {
        public bool Moved { get; set; }
        public Color Color { get; set; }

        public IList<Location> GetLegalMoves(Location currentLocation)
        {
            throw new NotImplementedException();
        }

        public bool IsMoveLegal(Location current, Location newLocation)
        {
            throw new NotImplementedException();
        }
    }
}
