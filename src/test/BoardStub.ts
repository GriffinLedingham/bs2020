export default {
  game: {
    id: "game-id-string"
  },
  turn: 4,
  board: {
    height: 20,
    width: 15,
    food: [
      {
        x: 1,
        y: 3
      }
    ],
    snakes: [
      {
        id: "snake-id-string",
        name: "Sneky Snek",
        health: 90,
        body: [
          {
            x: 1,
            y: 5
          },
          {
            x: 1,
            y: 6
          },
          {
            x: 1,
            y: 7
          },
          {
            x: 1,
            y: 8
          },
          {
            x: 1,
            y: 9
          }
        ]
      },
      {
        id: "snake-id-string-2",
        name: "Sneky Snek",
        health: 90,
        body: [
          {
            x: 7,
            y: 8
          },
          {
            x: 8,
            y: 8
          },
          {
            x: 9,
            y: 8
          }
        ]
      }
    ]
  },
  you: {
    id: "snake-id-string",
    name: "Sneky Snek",
    health: 90,
    body: [
      {
        x: 1,
        y: 5
      },
      {
        x: 1,
        y: 6
      },
      {
        x: 1,
        y: 7
      },
      {
        x: 1,
        y: 8
      },
      {
        x: 1,
        y: 9
      }
    ]
  }
};
