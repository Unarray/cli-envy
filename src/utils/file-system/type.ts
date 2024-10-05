type FileInformation = {
  isFile: true;
  extension: string;
  name: string;
}

type DirInformation = {
  isFile: false;
  name: string;
}

export type EntityInformation = {
  absolutePath: string;
  relativePath: string;
} & (FileInformation | DirInformation)