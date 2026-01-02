export enum FulfillmentModel {
  RETAIL = 'RETAIL',
  FBM = 'FBM',
  RETAIL_VQ = 'RETAIL-VQ',
  FBS_DO = 'FBS-DO',
  FBS_PU = 'FBS-PU',
  DS = 'DS',
}

export const FULFILLMENT_MODEL_OPTIONS = [
  { label: 'Retail', value: FulfillmentModel.RETAIL },
  { label: 'FBM', value: FulfillmentModel.FBM },
  { label: 'Retail-VQ', value: FulfillmentModel.RETAIL_VQ },
  { label: 'FBS-DO', value: FulfillmentModel.FBS_DO },
  { label: 'FBS-PU', value: FulfillmentModel.FBS_PU },
  { label: 'DS', value: FulfillmentModel.DS },
] as const;
