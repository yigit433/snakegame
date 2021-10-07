import { SetOptions, CreateMap } from "./helper";
import { Options, Data, MapPart } from "./interfaces";

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
  constructor(options: Options | any = defaultOptions) {
    this.options = SetOptions(defaultOptions, options);

    this.database = [];
  }
  createGame(ID: string) {
    if (!ID) throw new Error("You need to specify an Id!");
    const mapparts: MapPart[] = CreateMap(this.options);

    return mapparts
  }
}
export default SnakeGame;
