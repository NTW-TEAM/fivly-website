export const accessToText = (access: number): string => {
  switch (access) {
    case -1:
      return "Hérite";
    case 0:
      return "Aucun";
    case 1:
      return "Lecture";
    case 2:
      return "Lecture/Écriture";
    case 3:
      return "Gérer";
    default:
      return "Inconnu";
  }
};

