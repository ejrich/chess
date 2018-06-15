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

            game.TakeTurn(new Location {File = Files.a, Rank = 1}, new Location {File = Files.a, Rank = 4});
        }
    }
}
