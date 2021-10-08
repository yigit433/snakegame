# Snakegame
You can make Snake game in a simple way. Don't forget to review [documentation](https://sherlockyigit.github.io/snakegame) to use the module. If you have any questions, you can come to the [discord server](https://discord.gg/YdHRnsc).

# Default Config
```json
{
  "snake_head": "🟩",
  "snake_tail": "🟩",
  "background": "🟫",
  "food": "🥝",
  "width": 10,
  "height": 1
}
```
# Example 
## Node 
```js
let SnakeGame = require("@yigitsh/snakegame").default;
SnakeGame = new SnakeGame();
// If you just want to edit certain settings, you can enter the name of the setting you want to edit and do it, you don't need to type the entire config directly there
```
