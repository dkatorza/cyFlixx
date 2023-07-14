declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module 'valtio' {
  function useSnapshot<T extends object>(p: T): T;
  export function proxy<T extends object>(initialObject: T): T;
}
