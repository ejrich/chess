using System;
using System.Collections.Generic;

namespace Chess.Game.Pieces
{
    public class Rook : IPiece
    {
        public Color Color { get; set; }
        public Location Location { get; set; }

        public void Move(Location location)
        {
            throw new NotImplementedException();
        }

        public IList<Location> LegalMoves()
        {
            throw new NotImplementedException();
        }
    }
}
