namespace Chess.Contracts
{
    public class Location
    {
        public int File { get; set; }
        public int Rank { get; set; }
        public Piece Piece { get; set; }
    }
}
