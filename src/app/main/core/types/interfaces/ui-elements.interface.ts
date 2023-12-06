export interface AccordionConfig {
  heading: string;
  content: string;
  expanded: boolean;
  accordion_id: string;
}

export interface ButtonConfig {
  button_id: string;
  button_class: "primary" | "secundary" | "page";
  type: "button" | "submit" | "reset";
  label: string;
}
