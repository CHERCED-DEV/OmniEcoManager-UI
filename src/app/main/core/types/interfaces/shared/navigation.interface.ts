export interface RoutesMenuNavConfig {
  path: string;
  label: string;
  children: [
    {
      path: string;
      label: string;
    }
  ] | undefined
}

export interface NodeMenuNavConfig {
  path: string,
  children: RoutesMenuNavConfig[];
}