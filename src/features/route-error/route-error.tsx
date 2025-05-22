import { useRouteError } from 'react-router';

interface RouteErrorType {
  statusText?: string;
  message?: string;
}

export function RouteError() {
  const error = useRouteError() as RouteErrorType;

  return (
    <div>
      <p>{error.statusText ?? error.message}</p>
    </div>
  );
}
