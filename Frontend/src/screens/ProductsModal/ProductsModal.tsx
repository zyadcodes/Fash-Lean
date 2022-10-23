import React from "react";
import { GetProductsResult } from "../../api/api";
import styles from "./styles.module.scss";
import classNames from "classnames";
import Modal from "react-awesome-modal";

export type ModalType = "shirts" | "pants";

interface ComponentProps {
  className?: string;
  isOpen: boolean;
  modalType: ModalType | undefined;
  products: GetProductsResult | undefined;
  shirtsText: string;
  pantsText: string;
  onClose: () => void;
}

const ProductsModal = (props: ComponentProps) => {
  const {
    className,
    isOpen,
    modalType,
    products,
    onClose,
    shirtsText,
    pantsText,
  } = props;

  return (
    <Modal
      visible={isOpen}
      width="300"
      height="300"
      effect="fadeInUp"
      onClickAway={onClose}
    >
      <div className={classNames(styles.ProductsModal, className)}>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "14px",
            marginBottom: "15px",
          }}
        >
          Buy Now
        </div>
        {products &&
          modalType &&
          products[modalType].map((eachProduct, i) => (
            <div key={i} className={styles.product}>
              <a href={eachProduct.link} className={styles.product__link}>
                {eachProduct.title === "Access Denied"
                  ? modalType === "shirts"
                    ? `${shirtsText
                        .toLowerCase()
                        .split(" ")
                        .map(
                          (s: string) =>
                            s.charAt(0).toUpperCase() + s.substring(1)
                        )
                        .join(" ")} ${i + 1}`
                    : `${pantsText
                        .toLowerCase()
                        .split(" ")
                        .map(
                          (s: string) =>
                            s.charAt(0).toUpperCase() + s.substring(1)
                        )
                        .join(" ")} ${i + 1}`
                  : eachProduct.title}
              </a>
            </div>
          ))}
      </div>
    </Modal>
  );
};

export { ProductsModal };
