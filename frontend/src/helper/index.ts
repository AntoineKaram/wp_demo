export const scrollToTop = (id?: string) => () => {
  const doc = document.getElementById(id || 'root-outlet');
  if (doc) {
    doc.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

export const toTitleCase = (input: string): string => {
  return input
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
