import { useRouteError } from 'react-router';

interface RouteErrorType {
  message?: string;
  statusText?: string;
}

export function RouteError() {
  const error = useRouteError() as RouteErrorType;

  return (
    <div>
      <p>{error.statusText ?? error.message}</p>
    </div>
  );
}
