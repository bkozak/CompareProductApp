export interface CastoramaProduct {
    entity_id: number;
    sku: string;
    name: string;
  image: string;
  small_image: string;
    type: string;
    stock: number;
  promo_status: boolean;
  available: number;
    availability_date: number;
    free_delivery: boolean;
  price_tag_unit: string;
  label_product_catalog: string;
  label_product_date_from: string;
  label_product_date_to: string;
  url: string;
  only_in_store: boolean;
  not_saleable_separately: boolean;
  brand: string;
  }
