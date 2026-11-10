export function Alert({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div role="alert" className="mb-4 p-3 rounded-lg text-xs bg-red-900/30 border border-red-800 text-red-300">
      {message}
    </div>
  );
}
