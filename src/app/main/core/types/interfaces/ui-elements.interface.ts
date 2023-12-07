export interface AccordionConfig {
  accordion_id: string;
  heading: string;
  content: string;
  expanded: boolean;
}

export interface ButtonConfig {
  button_id: string;
  button_class: "primary" | "secundary" | "page";
  type: "button" | "submit" | "reset";
  label: string;
}

export interface CheckboxConfig {
  checkbox_id: string;
  checked: boolean;
  label: string;
  type: 'radio' | 'checkbox';
  name: string;
}

export interface DataPickerConfig {
  datapicker_id: string;
  type: 'day' | 'week' | 'month' | 'date' | 'time' | 'datetime-local' | 'timestamp' | 'datetime';
  label: string;

}
