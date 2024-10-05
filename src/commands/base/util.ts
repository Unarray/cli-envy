import type { EntityInformation } from "#/utils/file-system/type";


export const sortEntities = (entities: EntityInformation[]): EntityInformation[] => {
  return [...entities].sort((a, b) => {
    if (a.isFile === false && b.isFile === true) return -1;
    if (a.isFile === true && b.isFile === false) return 1;

    return a.name.localeCompare(b.name);
  });
};