using System;
using Chess.Game.Board;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Chess.Game.Tests
{
    [TestClass]
    public class GameTests
    {
        [TestMethod]
        public void TestMethod()
        {
            var game = new Game(new StandardBoardFactory());
            Console.WriteLine(game);

            game.TakeTurn(Files.d, 2, Files.d, 3);
            //game.TakeTurn(Files.a, 1, Files.a, 4);
            //game.TakeTurn(Files.a, 1, Files.a, 3);
            //game.TakeTurn(Files.a, 3, Files.a, 5);
            //game.TakeTurn(Files.a, 3, Files.d, 3);
            //game.TakeTurn(Files.d, 3, Files.b, 3);
            //game.TakeTurn(Files.b, 1, Files.c, 3);
            //game.TakeTurn(Files.c, 3, Files.c, 5);
            game.TakeTurn(Files.c, 1, Files.a, 3);
            game.TakeTurn(Files.c, 1, Files.g, 5);
        }
    }
}
