import { DateObject } from "react-multi-date-picker";
import { ALL_ROLES } from "./constants";
import { ToastTypes } from "./enums";

export interface DailyAllocationObj {
  distributorCode: string;
  shipToCode: string;
  skuCode: string;
  productId: string;
  startDate: string;
  endDate: string;
  allocationQuantity: number;
}

export interface UserObj {
  username: string;
  role: typeof ALL_ROLES.ADMIN;
  email: string;
}

// top title object
export interface TranslateObj {
  defaultMessage: string;
  id: string;
}

export interface ShipToObj {
  shipToDescription: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  address5: string;
  pinCode: string;
  contactPerson: string;
  contactNo: string;
  defaultWarehouse: string;
  holidays: Date[];
}

export interface TruckObj {
  truckType: string;
  truckDescription: string;
  truckTypeDescription: string;
  volumeContainer: string;
  palletsPerTruck: string;
  weightContainer: string;
  palletUpperLimit: string;
  palletLowerLimit: string;
}

export interface VmiObj {
  productCode: string;
  productDescription: string;
  safetyStock: string;
  uom: string;
  ads: string;
  skuType: string;
  seasonalityFactor: string;
}

export interface DistributorForm {
  code: string;
  name: string;
  shipToCode: string;
  customerName: string;
  priority: string;
  shelfLife: string;
  leadTime: string;
  targetDays: string;
  shipTos: ShipToObj[];
  trucks: TruckObj[];
  vmis: VmiObj[];
}

export interface ProductForm {
  productCode: string;
  eanNumber: string;
  desc1: string;
  desc2: string;
  handheldDesc: string;
  status: OptionObj;
  type: string;
  baseUOM: string;
  salesUnit: string;
  allowableInPromotion: boolean;
  parentProduct: string;
  materialType: string;
  materialGroup: string;
  materialTaxGroup: string;
  dummyGlass: boolean;
  competitorGlass: boolean;
  glAccount: string;
  convToPallet: string;
  convToLayer: string;
  cubicMeter: string;
  uomCode: string;
  netWeight: string;
  grossWeight: string;
  weightUnit: string;
}

export interface OptionObj {
  label: string;
  value: string;
}

export interface OrderForm {
  productCode: string;
  productBarcode: "";
  description: "";
  moqType: "";
  moq: "";
  suggestedOrder: "";
  allocation: "";
  orderQty: "";
  weight: "";
  volume: "";
  pallet: "";
}

export interface AddProductFormType {
  products: OrderForm[];
}

export interface ProductMappingForm {
  distCode: string;
  shipToCode: string;
  prdCode: string;
  prdCodeOld1: string;
  prdCodeOld2: string;
  prdCodeOld3: string;
  prdCodeOld4: string;
  prdCodeOld5: string;
  active: boolean;
}
