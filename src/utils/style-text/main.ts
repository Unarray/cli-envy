import type { Format } from "./type";
import { styleText as st } from "util";


export const styleText = (format: Format | Format[], text: string): string => {
  if (Array.isArray(format) === false) return st(format, text);

  for (const style of format) {
    text = st(style, text);
  }

  return text;
};