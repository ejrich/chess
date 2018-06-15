using System;
using System.Collections.Generic;

namespace Chess.Game.Pieces
{
    public class King : IPiece
    {
        public Color Color { get; set; }
        public Location Location { get; set; }

        public IList<Location> GetLegalMoves(Files file, int rank)
        {
            throw new NotImplementedException();
        }
    }
}
