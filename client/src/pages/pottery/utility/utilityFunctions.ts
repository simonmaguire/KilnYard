export const formatPotNameForCard = (name: string) => {
  if (name.length > 19) {
    name = name.slice(0, 19);
    name += "...";
  }

  return name;
};
