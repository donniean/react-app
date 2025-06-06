import { Box, LoadingOverlay } from '@mantine/core';

export function AppLoader() {
  return (
    <Box className="relative h-screen w-screen">
      <LoadingOverlay visible />
    </Box>
  );
}
