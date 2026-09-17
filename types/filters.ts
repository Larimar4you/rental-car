export interface FiltersResponse {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
}