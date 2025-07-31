export const API_PATH = {
  ORDER: '/api/order',
  LOGIN: '/api/login',
  PRODUCT_SUMMARY: (id: number | string) => `/api/products/${id}/summary`,
} as const;
