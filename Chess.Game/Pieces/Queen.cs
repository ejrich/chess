using System;
using System.Collections.Generic;

namespace Chess.Game.Pieces
{
    public class Queen : IPiece
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

            var fileChange = Math.Abs((int) newLocation.File - (int) current.File);
            var rankChange = Math.Abs(newLocation.Rank - current.Rank);

            if ((fileChange > 0 && rankChange > 0) && fileChange != rankChange)
                return false;

            var legal = true;

            if (fileChange == 0 || rankChange == 0)
            {
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
            }
            else
            {
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
            }

            return legal;
        }
    }
}
