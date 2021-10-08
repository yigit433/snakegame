import { Options, MapPart } from "./interfaces";

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
