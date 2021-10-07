import { SetOptions } from "./helper";
import { Options, Data } from "./interfaces";

const defaultOptions: Options = ({
  snake_head: '🟩',
  snake_tail: '🟩',
  background: '🟫',
  food: '🥝',
  width: 10,
  height: 10,
});

class SnakeGame {
  options: Options;
  database: Data[] | [];
  constructor(options: Options = defaultOptions) {
    this.options = SetOptions(defaultOptions, options);

    this.database = [];
  }
}
export default SnakeGame;
