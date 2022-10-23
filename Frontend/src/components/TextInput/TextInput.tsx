import React from "react";
import classnames from "classnames";

import styles from "./styles.module.scss";

interface ComponentProps {
  className?: string;
  placeholder: string;
  value: string;
  onChangeFocus: (focusState: boolean) => void;
  onChangeText: (newText: string) => void;
}

const TextInput = (props: ComponentProps) => {
  const { className, placeholder, value, onChangeText, onChangeFocus } = props;

  return (
    <input
      className={classnames(styles.TextInput, className)}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChangeText(event.target.value)}
      onFocus={() => onChangeFocus(true)}
      onBlur={() => onChangeFocus(false)}
    />
  );
};

export { TextInput };
