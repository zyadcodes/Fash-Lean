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
  const [hasGenerated, setHasGenated] = useState(false);

  // Return types from API
  const [products, setProducts] = useState<GetProductsResult>();

  console.log(products);

  return (
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
          <img src={image as string} className={styles.image} />
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
            }
          }}
          hidden
        />
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

            const base64Image = await imageToBase64(image as File);

            const newImage = await generateImage({
              shirt: shirtText,
              pants: pantsText,
              image: base64Image,
            });

            const products = await getProducts({
              shirt: shirtText,
              pants: pantsText,
            });

            setImage(newImage.result);
            setProducts(products);

            setTimeout(() => {
              setHasGenated(true);
              setIsLoading(false);
            }, 5000);
          }}
        />
      </div>
    </div>
  );
};

export { Main };
