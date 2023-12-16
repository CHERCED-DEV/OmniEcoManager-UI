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