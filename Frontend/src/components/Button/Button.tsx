import React, { useState, ReactElement } from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";

interface ComponentProps {
  className?: string;
  text: string;
  onClick: () => void;
}

const Button = (props: ComponentProps) => {
  const { className, text, onClick } = props;

  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      className={classNames(styles.Button, className, {
        [styles.Button__clicked]: isClicked,
      })}
      onClick={() => {
        onClick();

        setIsClicked(true);
        setTimeout(() => {
          setIsClicked(false);
        }, 150);
      }}
    >
      {text}
    </div>
  );
};

export { Button };
