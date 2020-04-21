using System;
using System.Collections.Generic;

namespace Chess.Game.Pieces
{
    public class Rook : IPiece
    {
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

            if (current.File != newLocation.File && current.Rank != newLocation.Rank)
                return false;

            var legal = true;

            if (current.File != newLocation.File)
            {
                if (newLocation.File > current.File)
                {
                    var location = current.Right;
                    while (location != newLocation && legal)
                    {
                        if (location.CurrentColor != null)
                            legal = false;
                        else
                            location = location.Right;
                    }
                }
                else
                {
                    var location = current.Left;
                    while (location != newLocation && legal)
                    {
                        if (location.CurrentColor != null)
                            legal = false;
                        else
                            location = location.Left;
                    }
                }
            }
            else
            {
                if (newLocation.Rank > current.Rank)
                {
                    var location = current.Forward;
                    while (location != newLocation && legal)
                    {
                        if (location.CurrentColor != null)
                            legal = false;
                        else
                            location = location.Forward;
                    }
                }
                else
                {
                    var location = current.Back;
                    while (location != newLocation && legal)
                    {
                        if (location.CurrentColor != null)
                            legal = false;
                        else
                            location = location.Back;
                    }
                }
            }

            return legal;
        }
    }
}
