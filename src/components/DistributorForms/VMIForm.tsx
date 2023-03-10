import React, { useState } from "react";
import { Control, useFieldArray, useForm } from "react-hook-form";
import { DistributorForm, TruckObj, VmiObj } from "../../types";
import Input from "../FormComponents/Input";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiEdit, FiMinus } from "react-icons/fi";
import SubmitBtn from "../FormComponents/SubmitBtn";
import DistributorTabButtons from "../DistributorTabButtons.tsx/DistributorTabButtons";
import { FormattedMessage, useIntl } from "react-intl";

interface Props {
  isValid: boolean;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  control: Control<DistributorForm, object>;
  isSubmitting: boolean;
  showButtons?: boolean;
  disabled?: boolean;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}

const schema = Yup.object({
  productCode: Yup.string(),
  productDescription: Yup.string(),
  safetyStock: Yup.string(),
  uom: Yup.string(),
  ads: Yup.string(),
  skuType: Yup.string(),
  seasonalityFactor: Yup.string(),
});

const VMIForm = ({
  isValid,
  setCurrentTab,
  control,
  isSubmitting,
  showButtons = true,
  disabled = false,
  setIsEditing
}: Props) => {
  const [editing, setEditing] = useState<number | null>(null);

  const intl = useIntl();

  const {
    register,
    reset,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<VmiObj>({
    resolver: yupResolver(schema),
    defaultValues: {
      productCode: "",
      productDescription: "",
      safetyStock: "",
      uom: "",
      ads: "",
      skuType: "",
      seasonalityFactor: "",
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "vmis",
  });

  const onSubmit = (data: VmiObj) => {
    append(data);

    reset();
  };

  return (
    <div className="vmi-form w-full">
      <div className="vmi-form w-full mb-12">
        <div className="form-components mb-8 grid grid-cols-4 gap-4">
          <Input
            label={intl.formatMessage({
              id: "productCodeFull",
              defaultMessage: "Product Code",
            })}
            id="productCode"
            name="productCode"
            error={errors?.productCode?.message || null}
            register={register}
            placeholder=""
            disabled={disabled}
          />
          <Input
            label={intl.formatMessage({
              id: "productDescription",
              defaultMessage: "Product Description",
            })}
            id="productDescription"
            name="productDescription"
            error={errors?.productDescription?.message || null}
            register={register}
            placeholder=""
            disabled={disabled}
          />
          <Input
            label={intl.formatMessage({
              id: "safetyStock",
              defaultMessage: "Safety Stock",
            })}
            id="safetyStock"
            name="safetyStock"
            error={errors?.safetyStock?.message || null}
            register={register}
            placeholder=""
            disabled={disabled}
          />
          <Input
            label={intl.formatMessage({
              id: "uom",
              defaultMessage: "UOM",
            })}
            id="uom"
            name="uom"
            error={errors?.uom?.message || null}
            register={register}
            placeholder=""
            disabled={disabled}
          />
          <Input
            label={intl.formatMessage({
              id: "ads",
              defaultMessage: "ADS",
            })}
            id="ads"
            name="ads"
            error={errors?.ads?.message || null}
            register={register}
            placeholder=""
            disabled={disabled}
          />
          <Input
            label={intl.formatMessage({
              id: "skuType",
              defaultMessage: "SKU type",
            })}
            id="skuType"
            name="skuType"
            error={errors?.skuType?.message || null}
            register={register}
            placeholder=""
            disabled={disabled}
          />
          <Input
            label={intl.formatMessage({
              id: "seasonalityFactor",
              defaultMessage: "Seasonality Factor",
            })}
            id="seasonalityFactor"
            name="seasonalityFactor"
            error={errors?.seasonalityFactor?.message || null}
            register={register}
            placeholder=""
            disabled={disabled}
          />
        </div>

        <div className="form-buttons flex items-center justify-center">
          {editing !== null ? (
            <div className="btns flex items-center gap-x-4">
              <button
                type="button"
                className="btn btn-gray w-44"
                onClick={() => {
                  setEditing(null);
                  reset({
                    productCode: "",
                    productDescription: "",
                    safetyStock: "",
                    uom: "",
                    ads: "",
                    skuType: "",
                    seasonalityFactor: "",
                  });
                }}
              >
                <FormattedMessage id="cancel" defaultMessage={"Cancel"} />
              </button>
              <button
                type="button"
                className="btn btn-primary w-44 h-10"
                disabled={Object.keys(errors).length > 0}
                onClick={() => {
                  update(editing, getValues());
                  setEditing(null);
                  reset({
                    productCode: "",
                    productDescription: "",
                    safetyStock: "",
                    uom: "",
                    ads: "",
                    skuType: "",
                    seasonalityFactor: "",
                  });
                }}
              >
                <FormattedMessage id="save" defaultMessage={"Save"} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-primary w-44 h-10"
              disabled={Object.keys(errors).length > 0}
              onClick={() => handleSubmit(onSubmit)()}
            >
              <FormattedMessage id="add" defaultMessage={"Add"} />
            </button>
          )}
        </div>
      </div>

      <table className="table mb-12">
        <thead>
          <tr>
            <th>
              <FormattedMessage
                id="productCodeFull"
                defaultMessage={"Product Code"}
              />
            </th>
            <th>
              <FormattedMessage
                id="productDescription"
                defaultMessage={"Product Description"}
              />
            </th>
            <th>
              <FormattedMessage
                id="safetyStock"
                defaultMessage={"Safety Stock"}
              />
            </th>
            <th>
              {" "}
              <FormattedMessage id="uom" defaultMessage={"UOM"} />
            </th>
            <th>
              {" "}
              <FormattedMessage id="ads" defaultMessage={"ADS"} />
            </th>
            <th>
              {" "}
              <FormattedMessage id="skuType" defaultMessage={"SKU type"} />
            </th>
            <th>
              {" "}
              <FormattedMessage
                id="seasonalityFactor"
                defaultMessage={"Seasonality Factor"}
              />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {fields.map((item, i) => {
            return (
              <tr key={item.id}>
                <td>{item.productCode}</td> <td>{item.productDescription}</td>
                <td>{item.safetyStock}</td>
                <td>{item.uom}</td>
                <td>{item.ads}</td>
                <td>{item.skuType}</td>
                <td>{item.seasonalityFactor}</td>
                <td className="flex items-center gap-x-2">
                  <button
                    type="button"
                    className="btn btn-primary p-2"
                    onClick={() => {
                      setEditing(i);
                      reset(item);

                      setIsEditing && setIsEditing(true)
                    }}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="btn bg-red-400 p-2"
                    type="button"
                    onClick={() => remove(i)}
                  >
                    <FiMinus />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showButtons && (
        <DistributorTabButtons>
          <button
            onClick={() => setCurrentTab(2)}
            type="button"
            className="btn btn-gray"
          >
            <FormattedMessage id="back" defaultMessage={"Back"} />
          </button>
          <SubmitBtn
            classes="w-36"
            translateId="addDistributor"
            disabled={Object.keys(errors).length > 0}
            isSubmitting={isSubmitting}
            text={"Add Distributor"}
          />
        </DistributorTabButtons>
      )}
    </div>
  );
};

export default VMIForm;
