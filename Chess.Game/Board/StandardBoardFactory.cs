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
            _board = new ChessBoard
            {
                Squares = new Location[BoardSize][]
            };

            InitializeBoard();
            InitializePieces();

            return _board;
        }

        private void InitializeBoard()
        {
            for (var file = 1; file <= BoardSize; file++)
            {
                _board.Squares[file - 1] = new Location[BoardSize];
                for (var rank = 1; rank <= BoardSize; rank++)
                {
                    _board.Squares[file - 1][rank - 1] = new Location
                    {
                        Rank = rank,
                        File = (Files) file
                    };
                }
            }

            for (var file = 1; file <= BoardSize; file++)
            {
                for (var rank = 1; rank <= BoardSize; rank++)
                {
                    InitializeAdjacentSquares(file, rank);
                }
            }
        }

        private void InitializeAdjacentSquares(int file, int rank)
        {
            var square = _board.GetLocation((Files) file, rank);

            if (file > 1)
                square.Left = _board.GetLocation((Files) file - 1, rank);
            if (file < BoardSize)
                square.Right = _board.GetLocation((Files) file + 1, rank);
            if (rank > 1)
                square.Back = _board.GetLocation((Files) file, rank - 1);
            if (rank < BoardSize)
                square.Forward = _board.GetLocation((Files) file, rank + 1);
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
