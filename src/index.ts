import { SetOptions, CreateMap, ResizeMap, MoveSnake } from "./helper";
import { Options, Data, MapPart, Coordinate } from "./interfaces";

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
  createGame(ID: string): string[] {
    if (!ID) throw new Error("You need to specify an Id!");
    const mapparts: MapPart[] = CreateMap(this.options);

    const data: Data = ({
      ID,
      score: 0,
      game_map: [ ...mapparts ],
      snake_parts: mapparts.filter((val: MapPart) => [this.options.snake_head, this.options.snake_tail].includes(val.part)).map((val: MapPart) => ({ x: val.  x, y: val.y })),
      createdAt: Date.now()
    });
 
    this.database.push(data);

    return ResizeMap(this.options, mapparts);
  }
  moveSnake(ID: string, newCoordinate: Coordinate): string[] | Data {
    if (!ID) throw new Error("You need to specify an Id!");
    if (!newCoordinate) throw new Error("You need to specify a Coordinate!");
    const result: Data = MoveSnake(this.options, newCoordinate, this.getData(ID) as Data);
    
    if (result.end) {
      this.endGame(ID);

      return result;
    } else {
      const dataIndex = this.database.findIndex((d: Data) => d.ID === ID);

      this.database[dataIndex] = result;

      return ResizeMap(this.options, result.game_map);
    }
  }
  getData(ID: string): Data | undefined {
    if (!ID) throw new Error("You need to specify an Id!");
    const res = this.database.find((d: Data) => d.ID === ID);

    return res;
  }
  endGame(ID: string): boolean {
    if (!ID) throw new Error("You need to specify an Id!");
    if (!this.getData(ID)) return false;
   
    this.database = this.database.filter((d: Data) => d.ID !== ID);

    return true;
  }
}
export default SnakeGame;
