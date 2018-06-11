using System.Collections.Generic;
using Chess.Game.Pieces;

namespace Chess.Game
{
    public class Player
    {
        public IList<IPiece> Pieces { get; set; }
    }
}
