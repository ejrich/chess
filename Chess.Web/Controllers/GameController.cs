using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Chess.Contracts;
using Chess.Game.Board;
using Microsoft.AspNetCore.Mvc;

namespace Chess.Web.Controllers
{
    [Route("api/[controller]")]
    public class GameController : Controller
    {
        private readonly IBoardFactory _boardFactory;
        private readonly IMapper _mapper;

        public GameController(IBoardFactory boardFactory, IMapper mapper)
        {
            _boardFactory = boardFactory;
            _mapper = mapper;
        }

        [HttpGet]
        public Board LoadGame()
        {
            var chessBoard = _boardFactory.CreateBoard();

            var board = _mapper.Map<Board>(chessBoard);

            return board;
        }
    }
}
