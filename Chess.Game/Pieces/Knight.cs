using System;
using System.Collections.Generic;

namespace Chess.Game.Pieces
{
    public class Knight : IPiece
    {
        public bool Moved { get; set; }
        public Color Color { get; set; }

        public IList<Location> GetLegalMoves(Location currentLocation)
        {
            throw new NotImplementedException();
        }

        public bool IsMoveLegal(Location current, Location newLocation)
        {
            if (newLocation.CurrentColor == Color)
                return false;

            var fileChange = Math.Abs((int) newLocation.File - (int) current.File);
            var rankChange = Math.Abs(newLocation.Rank - current.Rank);

            return fileChange == 2 && rankChange == 1 ||
                   fileChange == 1 && rankChange == 2;
        }
    }
}
