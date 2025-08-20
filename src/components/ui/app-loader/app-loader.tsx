export function AppLoader() {
  return (
    <div className="relative h-screen w-screen">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    </div>
  );
}
