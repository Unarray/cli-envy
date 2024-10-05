import { styleText } from "#/utils/style-text";


export const colors = {
  primary: (text) => {
    return styleText(["white"], text);
  },
  secondary: (text) => {
    return styleText(["dim"], text);
  },
  accent: (text) => {
    return styleText(["cyan"], text);
  },
  link: (text) => {
    return styleText(["blue", "underline"], text);
  },
  disabled: (text) => {
    return styleText(["black"], text);
  },
  error: (text) => {
    return styleText(["redBright"], text);
  },
  warn: (text) => {
    return styleText(["yellowBright"], text);
  },
  success: (text) => {
    return styleText(["greenBright"], text);
  }
} as const satisfies Record<string, (text: string) => string>;

export const logger = {
  text: (text: string) => {
    console.log(colors.primary(text));
  },
  error: (text: string) => {
    console.log(colors.error(`❌ ${text}`));
  },
  warn: (text: string) => {
    console.log(colors.warn(`⚠ ${text}`));
  },
  success: (text: string) => {
    console.log(colors.success(`✔ ${text}`));
  }
} as const;