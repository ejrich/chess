using System;
using System.Collections.Generic;

namespace Chess.Game.Pieces
{
    public class Pawn : IPiece
    {
        private int _multiplier => Color == Color.White ? 1 : -1;

        public int Moves { get; set; }
        public Color Color { get; set; }

        public IList<Location> GetLegalMoves(Location currentLocation)
        {
            throw new NotImplementedException();
        }

        public bool IsMoveLegal(Location current, Location newLocation)
        {
            if (newLocation.CurrentColor == Color)
                return false;

            var fileChange = Math.Abs((int)newLocation.File - (int)current.File);
            var rankChange = Math.Abs(newLocation.Rank - current.Rank);

            if (fileChange > 1 || rankChange > 2)
                return false;

            var legal = false;

            if (fileChange == 0)
            {
                var location = Color == Color.White ? current.Forward : current.Back;
                legal = location.Piece == null;

                if (rankChange == 2)
                {
                    location = Color == Color.White ? location.Forward : location.Back;
                    legal = Moves == 0 && location.Piece == null;
                }
            }
            else if (fileChange == 1)
            {
                if (rankChange == 1)
                {
                    if (Color == Color.White && newLocation.Rank > current.Rank ||
                        Color == Color.Black && newLocation.Rank < current.Rank)
                    {
                        legal = newLocation.CurrentColor != null && newLocation.CurrentColor != Color;
                    }
                }
                // TODO Add en passant
            }

            return legal;
        }
    }
}
