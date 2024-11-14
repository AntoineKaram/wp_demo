export const scrollToTop = (id?: string) => () => {
  const doc = document.getElementById(id || "root-outlet");
  if (doc) {
    doc.scrollTo({ top: 0, behavior: "smooth" });
  }
};
