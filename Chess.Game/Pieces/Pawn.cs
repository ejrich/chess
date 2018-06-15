using System;
using System.Collections.Generic;

namespace Chess.Game.Pieces
{
    public class Pawn : IPiece
    {
        private bool _moved = false;
        private int _multiplier => Color == Color.White ? 1 : -1;

        public Color Color { get; set; }

        public IList<Location> GetLegalMoves(Location currentLocation)
        {
            var legalMoves = new List<Location>();
            if (Color == Color.White)
            {
                if (currentLocation.Forward != null && currentLocation.Forward.CurrentColor == null)
                {

                }
            }

            return legalMoves;
        }
    }
}
