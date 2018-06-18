using System;
using System.Collections.Generic;

namespace Chess.Game.Pieces
{
    public class Bishop : IPiece
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

            if (fileChange != rankChange)
                return false;

            var legal = true;

            if (newLocation.Rank > current.Rank)
            {
                if (newLocation.File > current.File)
                {
                    var location = current.Right.Forward;
                    while (location != newLocation && legal)
                    {
                        if (location.CurrentColor != null)
                            legal = false;
                        else
                            location = location.Right.Forward;
                    }
                }
                else
                {
                    var location = current.Left.Forward;
                    while (location != newLocation && legal)
                    {
                        if (location.CurrentColor != null)
                            legal = false;
                        else
                            location = location.Left.Forward;
                    }
                }
            }
            else
            {
                if (newLocation.File > current.File)
                {
                    var location = current.Right.Back;
                    while (location != newLocation && legal)
                    {
                        if (location.CurrentColor != null)
                            legal = false;
                        else
                            location = location.Right.Back;
                    }
                }
                else
                {
                    var location = current.Left.Back;
                    while (location != newLocation && legal)
                    {
                        if (location.CurrentColor != null)
                            legal = false;
                        else
                            location = location.Left.Back;
                    }
                }
            }

            return legal;
        }
    }
}
