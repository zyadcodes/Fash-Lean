const callAPI = async (endpoint: string, params: Record<string, any>) => {
  const endpointUrl = `https://backend-73pobafroq-wl.a.run.app${endpoint}`;

  const response = await fetch(endpointUrl, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  return json;
};

interface GenerateParams {
  shirt: string;
  pants: string;
  image: string;
}

export interface GenerateResult {
  result: string;
}

export const generateImage = async (
  params: GenerateParams
): Promise<GenerateResult> => {
  const result = await callAPI("/generate", params);

  return result as GenerateResult;
};

interface GetProductsParams {
  shirt: string;
  pants: string;
}

export interface GetProductsResult {
  [key: string]: {
    title: string;
    image: string;
    link: string;
  }[];
}

export const getProducts = async (
  params: GetProductsParams
): Promise<GetProductsResult> => {
  const result = await callAPI("/get_products", params);

  return result as GetProductsResult;
};
