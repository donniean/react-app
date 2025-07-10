import { LoadingOverlay } from '@mantine/core';

export function AppLoader() {
  return (
    <div className="relative h-screen w-screen">
      <LoadingOverlay visible />
    </div>
  );
}
