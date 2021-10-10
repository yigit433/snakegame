import { Options, MapPart, Coordinate, Data } from "./interfaces";

export const SetOptions = ((defOptions: Options | any, newOptions: Options | any): Options => {
  const _newOptions: [string, string|number|boolean][] = Object.keys(newOptions).map((val:string) => (
    [ val, newOptions[val] ]
  ));
  const out: Options | any = defOptions;

  for (let i: number = 0; _newOptions.length > i; i += 1) {
    if (!defOptions.hasOwnProperty(_newOptions[i][0])) continue;
    else if ((typeof defOptions[_newOptions[i][0]]) !== typeof _newOptions[i][1]) continue;    

    out[_newOptions[i][0]] = _newOptions[i][1];
  } 

  return out;
});
export const CreateMap = ((options: Options): MapPart[] => {
  const out: MapPart[] | [] = Array(options.height * options.width).fill({
    part: options.background,
    x: 0,
    y: options.height - 1
  }).map((d: MapPart, i: number): MapPart => ({
    ...d,
    x: i % options.width,
    y: i % options.height === (options.height - 1) ? d.y-- : d.y
  }));
  const snake_index: number = Math.floor(Math.random() * out.length);
  
  out[snake_index].part = options.snake_head;
  
  const filtered_snake: MapPart[] | [] = out.filter((val: MapPart) => (
    !(val.x == out[snake_index].x && out[snake_index].y == out[snake_index].y)
  ));

  let food_index: number = Math.floor(Math.random() * filtered_snake.length);
  food_index = out.findIndex((val: MapPart) => val.x == filtered_snake[food_index].x && val.y == filtered_snake[food_index].y);
 
  out[food_index].part = options.food;

  return out;
});
export const ResizeMap = ((options: Options, parts: MapPart[]): string[] => {
  const out: string[] = [];

  while(parts.length) {
    out.push(parts.splice(0, options.width).map((val: MapPart):string => val.part).join(""));
  } 

  return out;
});
export const MoveSnake = ((options: Options, newCoordinate: Coordinate, data: Data): Data => {
  const nlocation_index: number = data.game_map.findIndex((map: MapPart) => map.x == newCoordinate.x && map.y == newCoordinate.y);
  if (nlocation_index == -1) {
    data.fail = true;
    data.reason = "No valid coordinate has been entered.";
  } else if (data.snake_parts.some((val: Coordinate) => val.x == newCoordinate.x && val.y == newCoordinate.y)) {
    data.end = true;
    data.reason = "You hit yourself.";

    return data;
  }  

  for (let i = 0; data.snake_parts.length > i; i += 1) {
    const currentCoordinate: number = data.game_map.findIndex((val: MapPart) => val.x === data.snake_parts[i].x && val.y === data.snake_parts[i].y);
  
    
    data.game_map[currentCoordinate].part = options.background;
  }
  data.snake_parts.unshift(newCoordinate);

  if (data.game_map[nlocation_index].part === options.food) {
    data.score++;
    
    const filtered_snake: MapPart[] = data.game_map.filter((d: MapPart) => data.snake_parts.some((coordinate: Coordinate) => (
      !((coordinate.x === d.x) && (coordinate.y === d.y)) 
    ))); 
    let food_index: number = Math.floor(Math.random() * filtered_snake.length);
    food_index = data.game_map.findIndex((d: MapPart) => (
      filtered_snake[food_index].x == d.x && filtered_snake[food_index].y == d.y
    ));

    data.game_map[food_index].part = options.food;
  } else data.snake_parts.pop();

  for (let i = 0; data.snake_parts.length > i; i += 1) {
    const currentCoordinate: number = data.game_map.findIndex((val: MapPart) => val.x === data.snake_parts[i].x && val.y === data.snake_parts[i].y);

    if (i == 0) {
      data.game_map[currentCoordinate].part = options.snake_head;
    } else {
      data.game_map[currentCoordinate].part = options.snake_tail;
    }
  } 

  return data;
})
