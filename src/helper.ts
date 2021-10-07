import { Options } from "./interfaces";

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
