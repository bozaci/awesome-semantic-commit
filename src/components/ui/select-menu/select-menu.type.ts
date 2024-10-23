export type optionsType = {
  name: string;
  value: string;
  isSelected?: boolean;
};

export interface SelectMenuProps {
  options: optionsType[];
  setOptions: any;
}
