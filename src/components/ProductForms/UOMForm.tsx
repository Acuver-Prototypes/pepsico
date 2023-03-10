import React, { useState } from "react";
import {
  DeepRequired,
  FieldErrorsImpl,
  UseFormRegister,
} from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { ProductForm, VmiObj } from "../../types";
import Input from "../FormComponents/Input";
import SubmitBtn from "../FormComponents/SubmitBtn";
import ProductTabButtons from "../ProductTabButtons/ProductTabButtons";

interface Props {
  errors: FieldErrorsImpl<DeepRequired<ProductForm>>;
  isValid: boolean;
  register: UseFormRegister<ProductForm>;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  isSubmitting: boolean;
  showButtons?: boolean;
  disabled?: boolean;
}

const UOMForm = ({
  isValid,
  errors,
  setCurrentTab,
  register,
  isSubmitting,
  showButtons = true,
  disabled = false,
}: Props) => {
  const [editing, setEditing] = useState<number | null>(null);

  const onSubmit = (data: VmiObj) => {};

  const intl = useIntl();

  return (
    <div className="vmi-form max-w-3xl">
      <div className="form-components mb-4 grid grid-cols-2 gap-4">
        <Input
          label={intl.formatMessage({
            id: "uomCode",
            defaultMessage: "UOM Code",
          })}
          id="uomCode"
          name="uomCode"
          error={errors?.uomCode?.message || null}
          register={register}
          placeholder=""
          disabled={disabled}
        />
        <Input
          label={intl.formatMessage({
            id: "netWeight",
            defaultMessage: "Net Weight",
          })}
          id="netWeight"
          name="netWeight"
          error={errors?.netWeight?.message || null}
          register={register}
          placeholder=""
          disabled={disabled}
        />
        <Input
          label={intl.formatMessage({
            id: "grossWeight",
            defaultMessage: "Gross Weight",
          })}
          id="grossWeight"
          name="grossWeight"
          error={errors?.grossWeight?.message || null}
          register={register}
          placeholder=""
          disabled={disabled}
        />
        <Input
          label={intl.formatMessage({
            id: "weightUnit",
            defaultMessage: "Weight Unit",
          })}
          id="weightUnit"
          name="weightUnit"
          error={errors?.weightUnit?.message || null}
          register={register}
          placeholder=""
          disabled={disabled}
        />
      </div>

      {showButtons && (
        <ProductTabButtons>
          <button
            onClick={() => setCurrentTab(0)}
            type="button"
            className="btn btn-gray"
          >
            <FormattedMessage id="back" defaultMessage={"Back"} />
          </button>
          <SubmitBtn
            classes="w-48"
            translateId="addProduct"
            disabled={Object.keys(errors).length > 0}
            isSubmitting={isSubmitting}
            text={"Add Product"}
          />
        </ProductTabButtons>
      )}
    </div>
  );
};

export default UOMForm;
