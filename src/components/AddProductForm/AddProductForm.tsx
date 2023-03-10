import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../FormComponents/Input";
import {
  Control,
  useFieldArray,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { AddProductFormType, OrderForm, ProductForm } from "../../types";
import { FiEdit, FiMinus } from "react-icons/fi";
import { FormattedMessage, useIntl } from "react-intl";

interface Props {
  control: Control<AddProductFormType, object>;
}

const AddProductForm = ({ control }: Props) => {
  const [editing, setEditing] = useState<number | null>(null);

  const intl = useIntl();

  const schema = Yup.object({
    productCode: Yup.string().required(
      intl.formatMessage({
        id: "productCodeIsRequired",
        defaultMessage: "Product Code is required",
      })
    ),
    productBarcode: Yup.string().required(
      intl.formatMessage({
        id: "barCodeIsRequired",
        defaultMessage: "Barcode is required",
      })
    ),
    description: Yup.string(),
    moqType: Yup.string(),
    moq: Yup.string(),
    suggestedOrder: Yup.string(),
    allocation: Yup.string(),
    orderQty: Yup.string(),
    weight: Yup.string(),
    volume: Yup.string(),
    pallet: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm<OrderForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      productCode: "",
      productBarcode: "",
      description: "",
      moqType: "",
      moq: "",
      suggestedOrder: "",
      allocation: "",
      orderQty: "",
      weight: "",
      volume: "",
      pallet: "",
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "products",
  });

  const onSubmit = (data: OrderForm) => {
    append(data);

    reset();
  };

  return (
    <div className="add-product-form w-full">
      <div className="form-components mb-8 grid grid-cols-3 gap-4">
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
          required={true}
        />
        <Input
          label={intl.formatMessage({
            id: "barcode",
            defaultMessage: "Barcode",
          })}
          id="productBarcode"
          name="productBarcode"
          error={errors?.productBarcode?.message || null}
          register={register}
          placeholder=""
          required={true}
        />
        <Input
          label={intl.formatMessage({
            id: "description",
            defaultMessage: "Description",
          })}
          id="description"
          name="description"
          error={errors?.description?.message || null}
          register={register}
          placeholder=""
        />
        <Input
          label={intl.formatMessage({
            id: "moqType",
            defaultMessage: "MOQ Type",
          })}
          id="moqType"
          name="moqType"
          error={errors?.moqType?.message || null}
          register={register}
          placeholder=""
        />
        <Input
          label={intl.formatMessage({
            id: "moq",
            defaultMessage: "MOQ",
          })}
          id="moq"
          name="moq"
          error={errors?.moq?.message || null}
          register={register}
          placeholder=""
        />

        <Input
          label={intl.formatMessage({
            id: "suggestedOrder",
            defaultMessage: "Suggested Order",
          })}
          id="suggestedOrder"
          name="suggestedOrder"
          error={errors?.suggestedOrder?.message || null}
          register={register}
          placeholder=""
        />

        <Input
          label={intl.formatMessage({
            id: "allocation",
            defaultMessage: "Allocation",
          })}
          id="allocation"
          name="allocation"
          error={errors?.allocation?.message || null}
          register={register}
          placeholder=""
        />
        <Input
          label={intl.formatMessage({
            id: "orderQty",
            defaultMessage: "Order Qty",
          })}
          id="orderQty"
          name="orderQty"
          error={errors?.orderQty?.message || null}
          register={register}
          placeholder=""
        />
        <Input
          label={intl.formatMessage({
            id: "weight",
            defaultMessage: "Weight",
          })}
          id="weight"
          name="weight"
          error={errors?.weight?.message || null}
          register={register}
          placeholder=""
        />
        <Input
          label={intl.formatMessage({
            id: "volume",
            defaultMessage: "Volume",
          })}
          id="volume"
          name="volume"
          error={errors?.volume?.message || null}
          register={register}
          placeholder=""
        />
        <Input
          label={intl.formatMessage({
            id: "pallet",
            defaultMessage: "Pallet",
          })}
          id="pallet"
          name="pallet"
          error={errors?.pallet?.message || null}
          register={register}
          placeholder=""
        />
      </div>

      <div className="form-buttons flex items-center justify-center mb-12">
        {editing !== null ? (
          <div className="btns flex items-center gap-x-4">
            <button
              type="button"
              className="btn btn-gray w-44"
              onClick={() => {
                setEditing(null);
                reset({
                  productCode: "",
                  productBarcode: "",
                  description: "",
                  moqType: "",
                  moq: "",
                  suggestedOrder: "",
                  allocation: "",
                  orderQty: "",
                  weight: "",
                  volume: "",
                  pallet: "",
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
                  productBarcode: "",
                  description: "",
                  moqType: "",
                  moq: "",
                  suggestedOrder: "",
                  allocation: "",
                  orderQty: "",
                  weight: "",
                  volume: "",
                  pallet: "",
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
            <FormattedMessage id="addProduct" defaultMessage={"Add Product"} />
          </button>
        )}
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
              {" "}
              <FormattedMessage id="barcode" defaultMessage={"Barcode"} />
            </th>
            <th>
              <FormattedMessage
                id="description"
                defaultMessage={"Description"}
              />
            </th>
            <th>
              <FormattedMessage id="moqType" defaultMessage={"MOQ Type"} />
            </th>
            <th>
              <FormattedMessage id="moq" defaultMessage={"MOQ"} />
            </th>
            <th>
              {" "}
              <FormattedMessage
                id="suggestedOrder"
                defaultMessage={"Suggested Order"}
              />
            </th>
            <th>
              {" "}
              <FormattedMessage id="allocation" defaultMessage={"Allocation"} />
            </th>
            <th>
              <FormattedMessage id="orderQty" defaultMessage={"Order Qty"} />
            </th>
            <th>
              {" "}
              <FormattedMessage id="weight" defaultMessage={"Weight"} />
            </th>
            <th>
              {" "}
              <FormattedMessage id="volume" defaultMessage={"Volume"} />
            </th>
            <th>
              {" "}
              <FormattedMessage id="pallet" defaultMessage={"Pallet"} />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {fields.map((item, i) => {
            return (
              <tr key={item.id}>
                <td>{item.productCode}</td>
                <td>{item.productBarcode}</td>
                <td>{item.description}</td>
                <td>{item.moqType}</td>
                <td>{item.moq}</td>
                <td>{item.suggestedOrder}</td>
                <td>{item.allocation}</td>
                <td>{item.orderQty}</td>
                <td>{item.weight}</td>
                <td>{item.volume}</td>
                <td>{item.pallet}</td>
                <td className="flex items-center gap-x-2">
                  <button
                    type="button"
                    className="btn btn-primary p-2"
                    onClick={() => {
                      setEditing(i);
                      reset(item);
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
    </div>
  );
};

export default AddProductForm;
