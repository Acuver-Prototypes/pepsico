import React from "react";
import {
  Control,
  DeepRequired,
  FieldErrorsImpl,
  UseFormRegister,
} from "react-hook-form";
import ReactSelect from "../FormComponents/ReactSelect";
import { ProductForm } from "../../types";
import Input from "../FormComponents/Input";
import ToggleButton from "../FormComponents/ToggleButton";
import ProductTabButtons from "../ProductTabButtons/ProductTabButtons";
import { hasError } from "../../utils";
import { FormattedMessage, useIntl } from "react-intl";

interface Props {
  errors: FieldErrorsImpl<DeepRequired<ProductForm>>;
  register: UseFormRegister<ProductForm>;
  isValid: boolean;
  isDirty: boolean;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  control: Control<ProductForm, object>;
  showButtons?: boolean;
  disabled?: boolean;
}

const GeneralForm = ({
  errors,
  register,
  isValid,
  setCurrentTab,
  isDirty,
  control,
  disabled = false,
  showButtons = true,
}: Props) => {
  const intl = useIntl();

  return (
    <div className="general-form max-full">
      <div className="form-components mb-4 grid grid-cols-3 gap-4">
        <Input
          label={intl.formatMessage({
            id: "productCodeFull",
            defaultMessage: "Product Code",
          })}
          id="productCode"
          name="productCode"
          error={(errors?.productCode?.message, null)}
          register={register}
          placeholder=""
          required={true}
          disabled={disabled}
        />
        <Input
          label={intl.formatMessage({
            id: "eanNumber",
            defaultMessage: "EAN Number",
          })}
          id="eanNumber"
          name="eanNumber"
          error={(errors?.eanNumber?.message, null)}
          register={register}
          placeholder=""
          required={true}
          disabled={disabled}
        />
        <ReactSelect
          label={intl.formatMessage({
            id: "status",
            defaultMessage: "Status",
          })}
          id="status"
          name="status"
          error={null}
          control={control}
          options={[
            { label: "Active", value: "active" },
            { label: "InActive", value: "inActive" },
          ]}
          placeholder=""
          disabled={disabled}
        />

        <Input
          label={intl.formatMessage({
            id: "desc1",
            defaultMessage: "Desc 1",
          })}
          id="desc1"
          name="desc1"
          error={(errors?.desc1?.message, null)}
          register={register}
          placeholder=""
          disabled={disabled}
        />
        <Input
          label={intl.formatMessage({
            id: "desc2",
            defaultMessage: "Desc 2",
          })}
          id="desc2"
          name="desc2"
          error={(errors?.desc2?.message, null)}
          register={register}
          placeholder=""
          disabled={disabled}
        />

        <Input
          label={intl.formatMessage({
            id: "handheldDesc",
            defaultMessage: "Handheld Desc",
          })}
          id="handheldDesc"
          name="handheldDesc"
          error={(errors?.handheldDesc?.message, null)}
          register={register}
          placeholder=""
          disabled={disabled}
        />

        <Input
          label={intl.formatMessage({
            id: "type",
            defaultMessage: "Type",
          })}
          id="type"
          name="type"
          error={(errors?.type?.message, null)}
          register={register}
          placeholder=""
          disabled={disabled}
        />
        <Input
          label={intl.formatMessage({
            id: "baseUOM",
            defaultMessage: "Base UOM",
          })}
          id="baseUOM"
          name="baseUOM"
          error={(errors?.baseUOM?.message, null)}
          register={register}
          placeholder=""
          disabled={disabled}
        />
        <Input
          label={intl.formatMessage({
            id: "salesUnit",
            defaultMessage: "Sales Unit",
          })}
          id="salesUnit"
          name="salesUnit"
          error={(errors?.salesUnit?.message, null)}
          register={register}
          placeholder=""
          disabled={disabled}
        />

        <Input
          label={intl.formatMessage({
            id: "parentProduct",
            defaultMessage: "Parent Product",
          })}
          id="parentProduct"
          name="parentProduct"
          error={(errors?.parentProduct?.message, null)}
          register={register}
          placeholder=""
          disabled={disabled}
        />
        <Input
          label={intl.formatMessage({
            id: "materialType",
            defaultMessage: "Material Type",
          })}
          id="materialType"
          name="materialType"
          error={(errors?.materialType?.message, null)}
          register={register}
          placeholder=""
          disabled={disabled}
        />
        <Input
          label={intl.formatMessage({
            id: "materialGroup",
            defaultMessage: "Material Group",
          })}
          id="materialGroup"
          name="materialGroup"
          error={(errors?.materialGroup?.message, null)}
          register={register}
          placeholder=""
          disabled={disabled}
        />
        <Input
          label={intl.formatMessage({
            id: "materialTaxGroup",
            defaultMessage: "Material Tax Group",
          })}
          id="materialTaxGroup"
          name="materialTaxGroup"
          error={(errors?.materialTaxGroup?.message, null)}
          register={register}
          placeholder=""
          disabled={disabled}
        />

        <Input
          label={intl.formatMessage({
            id: "glAccount",
            defaultMessage: "GL Account",
          })}
          id="glAccount"
          name="glAccount"
          error={(errors?.glAccount?.message, null)}
          register={register}
          placeholder=""
          disabled={disabled}
        />

        <Input
          label={intl.formatMessage({
            id: "uomToPallet",
            defaultMessage: "Convert from Smallest UOM to Pallet",
          })}
          id="convToPallet"
          name="convToPallet"
          error={(errors?.convToPallet?.message, null)}
          register={register}
          placeholder=""
          required={true}
          disabled={disabled}
        />
        <Input
          label={intl.formatMessage({
            id: "uomToLayer",
            defaultMessage: "Convert from Smallest UOM to Layer",
          })}
          id="convToLayer"
          name="convToLayer"
          error={(errors?.convToLayer?.message, null)}
          register={register}
          placeholder=""
          required={true}
          disabled={disabled}
        />
        <Input
          label={intl.formatMessage({
            id: "cubicMeter",
            defaultMessage: "Cubic Meter (m3)",
          })}
          id="cubicMeter"
          name="cubicMeter"
          error={(errors?.cubicMeter?.message, null)}
          register={register}
          placeholder=""
          required={true}
          disabled={disabled}
        />
      </div>

      <div className="toggle-buttons flex items-center mb-12 justify-between">
        <ToggleButton
          label={intl.formatMessage({
            id: "allowableInPromotion",
            defaultMessage: "Allowable In Promotion",
          })}
          id="allowableInPromotion"
          name="allowableInPromotion"
          control={control}
          disabled={disabled}
        />
        <ToggleButton
          label={intl.formatMessage({
            id: "dummyGlass",
            defaultMessage: "Dummy Glass",
          })}
          id="dummyGlass"
          name="dummyGlass"
          control={control}
          disabled={disabled}
        />
        <ToggleButton
          label={intl.formatMessage({
            id: "competitorGlass",
            defaultMessage: "Competitor Glass",
          })}
          id="competitorGlass"
          name="competitorGlass"
          control={control}
          disabled={disabled}
        />
      </div>

      {showButtons && (
        <ProductTabButtons>
          <button
            disabled={!isValid}
            className="btn btn-primary"
            onClick={() => setCurrentTab(1)}
          >
            <FormattedMessage id="next" defaultMessage={"Next"} />
          </button>
        </ProductTabButtons>
      )}
    </div>
  );
};

export default GeneralForm;
