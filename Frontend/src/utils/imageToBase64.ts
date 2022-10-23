export const imageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    let baseURL;
    // Make new FileReader
    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL as string);
    };
  });
};
