export default function generateInitials(
  name: string | undefined,
  surname: string | undefined,
) {
  if (!name || !surname) return "";
  return name.slice(0, 1).toUpperCase() + surname.slice(0, 1).toUpperCase();
}
