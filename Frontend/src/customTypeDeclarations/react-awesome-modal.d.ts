// types/react-awesome-modal/index.d.ts
/// <reference types="node" />

type Transition = "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight";

/**
 * @typedef ModalProps
 *
 */
interface SelectVirtualizedProps {
  /**
   * @property {string}
   */
  visible?: boolaen;

  /**
   * @property {string}
   */
  effect?: Transition;

  /**
   * @property {string}
   */
  width?: string;

  /**
   * @property {string}
   */
  height?: string;

  /**
   * @property {Function}
   */
  onClickAway?: (any) => void;
}

declare module "react-awesome-modal" {
  import React from "react";

  class Modal extends React.Component<ModalProps> {}
  export default Modal;
}
