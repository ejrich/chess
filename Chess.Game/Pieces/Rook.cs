using System;
using System.Collections.Generic;
using System.Linq;

namespace Chess.Game.Pieces
{
    public class Rook : IPiece
    {
        public Color Color { get; set; }

        public IList<Location> GetLegalMoves(Files file, int rank)
        {
            var legalMoves = Enumerable.Range(1, 8).Where(_ => _ != rank).Select(_ => new Location
            {
                File = file,
                Rank = _
            }).ToList();

            var horizontalMoves = Enum.GetValues(typeof(Files)).Cast<Files>().Where(_ => _ != file)
                .Select(_ => new Location
                {
                    File = _,
                    Rank = rank
                }).ToList();

            legalMoves.AddRange(horizontalMoves);

            return legalMoves;
        }
    }
}
