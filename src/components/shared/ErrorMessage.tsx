export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="mt-1 text-xs text-red-400" role="alert">
      {message}
    </div>
  );
}
