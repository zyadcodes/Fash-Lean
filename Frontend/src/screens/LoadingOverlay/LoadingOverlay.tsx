import React, { CSSProperties, useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ReactLoading from "react-loading";
import styles from "./styles.module.scss";

interface ComponentProps {
  className?: string;
  isOpen: boolean;
}

const LoadingOverlay = (props: ComponentProps) => {
  const { className, isOpen } = props;

  const rotatingText = [
    "Generating photo.",
    "Generating photo..",
    "Generating photo...",
    "Fetching products.",
    "Fetching products..",
    "Fetching products...",
    "Replacing pixels.",
    "Replacing pixels..",
    "Replacing pixels...",
  ];

  const [hasIncrmented, setHasIncremented] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (hasIncrmented) {
        setCurrentIndex((prevIndex) => {
          if (prevIndex === rotatingText.length - 1) {
            return 0;
          } else {
            return prevIndex + 1;
          }
        });
      } else {
        setHasIncremented(true);
      }
    }, 1000);
  }, [currentIndex, hasIncrmented]);

  const modalStyles: { [key: string]: CSSProperties } = {
    modal: {
      backgroundColor: "transparent",
      boxShadow: "none",
      display: "flex",
      flexDirection: "column",
      overflow: "none",
      width: "100%",
      padding: "0",
      margin: "0",
      height: "100vh",
      minWidth: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    overlay: {
      backgroundColor: "#1cccc",
      padding: 0,
    },
    closeIcon: {
      fill: "#fff",
    },
  };

  return (
    <div className={className}>
      <Modal
        styles={modalStyles}
        open={isOpen}
        animationDuration={1000}
        showCloseIcon={false}
        onClose={() => {}}
      >
        <ReactLoading type={"spin"} color={"#f63690"} height={50} width={50} />
        <div className={styles.rotatingText}>{rotatingText[currentIndex]}</div>
      </Modal>
    </div>
  );
};

export { LoadingOverlay };
