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
  onClose: () => void;
}

const ProductsModal = (props: ComponentProps) => {
  const { className, isOpen, modalType, products, onClose } = props;

  return (
    <Modal
      visible={isOpen}
      width="300"
      height="350"
      effect="fadeInUp"
      onClickAway={onClose}
    >
      <div className={classNames(styles.ProductsModal, className)}>
        {products &&
          modalType &&
          products[modalType].map((eachProduct, i) => (
            <div key={i} className={styles.product}>
              <a href={eachProduct.link} className={styles.product__link}>
                {eachProduct.title}
              </a>
            </div>
          ))}
      </div>
    </Modal>
  );
};

export { ProductsModal };
