import React, { useRef, useState } from "react";
import { Button, TextInput } from "../../components";
import { FaTshirt } from "react-icons/fa";
import { GiUnderwearShorts } from "react-icons/gi";
import { AiFillCamera } from "react-icons/ai";
import classnames from "classnames";
import { LoadingOverlay } from "../LoadingOverlay/LoadingOverlay";
import { saveAs } from "file-saver";

import styles from "./styles.module.scss";
import { generateImage, getProducts, GetProductsResult } from "../../api/api";
import { imageToBase64 } from "../../utils";
import { ParticlesBackground, ModalType, ProductsModal } from "../";

const Main = () => {
  // Ref for selecting an image
  const imageSelectRef = useRef<HTMLInputElement>(null);

  // State variables for inputs
  const [image, setImage] = useState<File | string>();
  const [shirtText, setShirtText] = useState("");
  const [pantsText, setPantsText] = useState("");
  const [isShirtInputFocused, setIsShirtInputFocused] = useState(false);
  const [isPantsInputFocused, setIsPantsInputFocused] = useState(false);

  // State variables controlling state of generation
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Return types from API
  const [products, setProducts] = useState<GetProductsResult>();

  // Modal state managemet
  const [isProductsModalVisible, setIsProductsModalVisible] = useState<
    boolean | ModalType
  >(false);

  return (
    <>
      <ParticlesBackground />
      <ProductsModal
        isOpen={isProductsModalVisible !== false}
        modalType={isProductsModalVisible as ModalType}
        products={products as GetProductsResult}
        onClose={() => setIsProductsModalVisible(false)}
      />
      <div className={styles.Main}>
        <LoadingOverlay isOpen={isLoading} />
        <div
          className={styles.imageContainer}
          onClick={() => {
            if (imageSelectRef.current) {
              imageSelectRef.current.click();
            }
          }}
        >
          {hasGenerated ? (
            <img
              src={`data:image/png;base64,${image as string}`}
              className={classnames(styles.image, styles.image__generated)}
            />
          ) : image ? (
            <img
              src={URL.createObjectURL(image as File)}
              className={styles.image}
            />
          ) : (
            <AiFillCamera size={40} />
          )}

          <input
            ref={imageSelectRef}
            type="file"
            onChange={(event) => {
              if (event.target.files && event.target.files.length > 0) {
                setImage(event.target.files[0]);
                setPantsText("");
                setShirtText("");
                setHasGenerated(false)
              }
            }}
            hidden
          />
          {hasGenerated && (
            <div className={styles.overlayButtons}>
              <div
                className={styles.overlayButtons__button}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProductsModalVisible("shirts");
                }}
              >
                <FaTshirt size={25} />
              </div>
              <div
                className={styles.overlayButtons__button}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProductsModalVisible("pants");
                }}
              >
                <GiUnderwearShorts size={25} />
              </div>
            </div>
          )}
        </div>
        <div className={styles.input}>
          <FaTshirt
            className={classnames({
              [styles.input__icon_focused]: isShirtInputFocused,
              [styles.input__icon_unfocused]: !isShirtInputFocused,
            })}
            size={30}
            style={{
              marginRight: "15px",
            }}
          />
          <TextInput
            className={classnames({
              [styles.input__focused]: isShirtInputFocused,
              [styles.input__unfocused]: !isShirtInputFocused,
            })}
            placeholder="Blue nike shirt..."
            value={shirtText}
            onChangeText={setShirtText}
            onChangeFocus={setIsShirtInputFocused}
          />
        </div>
        <div className={styles.input}>
          <GiUnderwearShorts
            className={classnames({
              [styles.input__icon_focused]: isPantsInputFocused,
              [styles.input__icon_unfocused]: !isPantsInputFocused,
            })}
            size={30}
            style={{
              marginRight: "15px",
            }}
          />
          <TextInput
            className={classnames({
              [styles.input__focused]: isPantsInputFocused,
              [styles.input__unfocused]: !isPantsInputFocused,
            })}
            placeholder="Grey puma sweatpants..."
            value={pantsText}
            onChangeText={setPantsText}
            onChangeFocus={setIsPantsInputFocused}
          />
        </div>
        <div className={styles.buttons}>
          {hasGenerated && (
            <Button
              className={styles.buttons__share}
              text={"Share"}
              onClick={() => {
                if (image) {
                  saveAs(image as string, (image as File).name);
                }
              }}
            />
          )}
          <Button
            className={classnames(styles.buttons__generate, {
              [styles.buttons__generate__lone]: !hasGenerated,
            })}
            text={"Generate"}
            onClick={async () => {
              setIsLoading(true);

              let base64Image = await imageToBase64(image as File);
              base64Image = base64Image.substring(
                base64Image.indexOf("data:image/png;base64,") +
                  "data:image/png;base64,".length
              );

              const [newImage, products] = await Promise.all([
                generateImage({
                  shirt: shirtText,
                  pants: pantsText,
                  image: base64Image,
                }),
                getProducts({
                  shirt: shirtText,
                  pants: pantsText,
                }),
              ]);

              setImage(newImage.result);
              setProducts(products);

              setHasGenerated(true);
              setIsLoading(false);
            }}
          />
        </div>
      </div>
    </>
  );
};

export { Main };
