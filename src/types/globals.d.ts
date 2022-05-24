declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.svg?svgr' {
  import { FunctionComponent, SVGProps } from 'react';

  const ReactComponent: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string }
  >;

  export default ReactComponent;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.woff';

declare module '*.woff2';

declare module '*.eot';

declare module '*.ttf';

declare module '*.otf';

// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
declare let __webpack_public_path__: string;

interface GlobalConfig {
  publicPath: string;
  client: {
    documentTitle: string | number;
  };
  backend: {
    api: {
      origin?: string; // development only
      basePath: string;
    };
    websocket: {
      origin?: string; // development only
      basePath: string;
    };
  };
  server: {
    port: string | number;
    proxy: Record<string, string>;
  };
  builder: {
    generateSourcemap: boolean; // production
  };
}

declare const GLOBAL_CONFIG: GlobalConfig;
