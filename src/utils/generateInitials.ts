export default function generateInitials(
  name: string | undefined,
  surname: string | undefined,
) {
  if (!name || !surname) return "";
  return (
    name.trim().slice(0, 1).toUpperCase() +
    surname.trim().slice(0, 1).toUpperCase()
  );
}
