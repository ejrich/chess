using AutoMapper;
using Chess.Contracts;
using Chess.Game;
using Chess.Game.Board;
using Chess.Game.Pieces;

namespace Chess.Web.AutoMapper
{
    public static class AutoMapperFactory
    {
        public static IMapper CreateMapper()
        {
            return new Mapper(new MapperConfiguration(cfg => {
                cfg.CreateMap<ChessBoard, Board>();
                cfg.CreateMap<IPiece, Piece>()
                    .ForMember(_ => _.Name, _ => _.MapFrom(piece => piece.GetType().Name));
                cfg.CreateMap<Game.Location, Contracts.Location>();
                cfg.CreateMap<Game.Color, Contracts.Color>();
            }));
        }
    }
}