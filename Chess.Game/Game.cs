using Chess.Game.Pieces;

namespace Chess.Game
{
    public class Game
    {
        private readonly int _boardSize = 8;
        private readonly Location[,] _board;

        public Game()
        {
            _board = new Location[_boardSize,_boardSize];

            InitializeBoard();
            InitializePieces();
        }

        private void InitializeBoard()
        {
            for (var rank = 1; rank <= _boardSize; rank++)
            {
                for (var file = 1; file <= _boardSize; file++)
                {
                    _board[rank - 1, file - 1] = new Location
                    {
                        Rank = rank,
                        File = file
                    };
                }
            }
        }

        private void InitializePieces()
        {
            var rank = 1;
            for (var file = 1; file <= _boardSize; file++)
            {
                _board[rank, file - 1].Piece = new Pawn
                {
                    Color = Color.White
                };
            }

            rank = 6;
            for (var file = 1; file <= _boardSize; file++)
            {
                _board[rank, file - 1].Piece = new Pawn
                {
                    Color = Color.Black
                };
            }

            rank = 0;
            for (var file = 1; file <= _boardSize; file++)
            {
                if (file % 7 == 1)
                {
                    _board[rank, file - 1].Piece = new Rook
                    {
                        Color = Color.White
                    };
                }
                if (file % 7 == 1)
                {
                    _board[rank, file - 1].Piece = new Knight
                    {
                        Color = Color.White
                    };
                }
            }

            rank = 7;
            for (var file = 1; file <= _boardSize; file++)
            {
                if (file % 7 == 1)
                {
                    _board[rank, file - 1].Piece = new Rook
                    {
                        Color = Color.White
                    };
                }
            }
        }

        public Player White { get; set; }
        public Player Black { get; set; }
        public Color Turn { get; set; }

        public void TakeTurn(IPiece piece, Location location)
        {
            
        }
    }
}
