type dataType = {
  name: string;
  value: string;
  isSelected?: boolean;
};

export interface LanguageSwitcherProps {
  data: dataType[];
  defaultValue: string;
}
