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
  }).map((d: MapPart, i: number, arr: MapPart[] | []) => {
    let part: string = options.background;
 
    if (!arr.some((_part: MapPart) => (_part.part === options.snake_head) || (_part.part === options.food))) {
      part = arr.some((_part: MapPart) => (_part.part === options.snake_head)) ? options.food : options.snake_head; 
    }

    return ({
      part,
      x: i % options.width,
      y: i % options.height === (options.height - 1) ? d.y-- : d.y
    });
  });

  return out;
});
