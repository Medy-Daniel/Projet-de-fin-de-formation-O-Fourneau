// Remove accents from a string
const removeAccents = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
// Return a string with and URL format
export default function slugifyStr(str: string) {
  const strLowCase: string = str.toLocaleLowerCase();
  const strNoSpace: string = strLowCase.replaceAll(' ', '_');
  return removeAccents(strNoSpace);
}
