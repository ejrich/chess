using System;
using Chess.Game.Pieces;

namespace Chess.Game.Board
{
    public class StandardBoardFactory : IBoardFactory
    {
        private const int BoardSize = 8;
        private Color _currentColor;
        private ChessBoard _board;

        public ChessBoard CreateBoard()
        {
            var squares = InitializeBoard();

            _board = new ChessBoard
            {
                Squares = squares
            };

            InitializePieces();

            return _board;
        }

        private static Location[,] InitializeBoard()
        {
            var squares = new Location[BoardSize, BoardSize];

            for (var rank = 1; rank <= BoardSize; rank++)
            {
                for (var file = 1; file <= BoardSize; file++)
                {
                    squares[rank - 1, file - 1] = new Location
                    {
                        Rank = rank,
                        File = file
                    };
                }
            }

            return squares;
        }

        private void InitializePieces()
        {
            _currentColor = Color.White;

            InitializeHomeRank(1);
            InitializePawns(2);

            _currentColor = Color.Black;

            InitializeHomeRank(8);
            InitializePawns(7);
        }

        private void SetSquare(IPiece piece, Files files, int rank)
        {
            piece.Color = _currentColor;

            _board.SetLocation(piece, files, rank);
        }

        private void InitializePawns(int rank)
        {
            foreach (Files file in Enum.GetValues(typeof(Files)))
            {
                SetSquare(new Pawn(), file, rank);
            }
        }

        private void InitializeHomeRank(int rank)
        {
            foreach (Files file in Enum.GetValues(typeof(Files)))
            {
                switch (file)
                {
                    case Files.a:
                    case Files.h:
                        SetSquare(new Rook(), file, rank);
                        break;
                    case Files.b:
                    case Files.g:
                        SetSquare(new Knight(), file, rank);
                        break;
                    case Files.c:
                    case Files.f:
                        SetSquare(new Bishop(), file, rank);
                        break;
                    case Files.d:
                        SetSquare(new Queen(), file, rank);
                        break;
                    case Files.e:
                        SetSquare(new King(), file, rank);
                        break;
                }
            }
        }
    }
}
