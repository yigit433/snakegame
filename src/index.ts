import { SetOptions, CreateMap, ResizeMap } from "./helper";
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
  database: Data[];
  constructor(options: Options | any = defaultOptions) {
    this.options = SetOptions(defaultOptions, options);

    this.database = [];
  }
  createGame(ID: string) {
    if (!ID) throw new Error("You need to specify an Id!");
    const mapparts: MapPart[] = CreateMap(this.options);

    const data: Data = ({
      ID,
      score: 0,
      game_map: mapparts,
      snake_parts: mapparts.filter((val: MapPart) => [this.options.snake_head, this.options.snake_tail].includes(val.part)).map((val: MapPart) => ({ x: val.  x, y: val.y })),
      createdAt: Date.now()
    });
 
    this.database.push(data);

    return ResizeMap(this.options, mapparts);
  }
}
export default SnakeGame;
