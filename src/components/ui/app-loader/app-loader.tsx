export function AppLoader() {
  return (
    <div className="relative h-screen w-screen">
      <div className="absolute inset-0 grid place-items-center bg-black/20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-400 border-t-transparent" />
      </div>
    </div>
  );
}
