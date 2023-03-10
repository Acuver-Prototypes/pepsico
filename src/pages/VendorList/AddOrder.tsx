import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AddProductFormType, OrderForm } from "../../types";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import useToast from "../../hooks/useToast";
import AddProductForm from "../../components/AddProductForm/AddProductForm";
import { FormattedMessage, useIntl } from "react-intl";

const AddOrder = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showSuccess, showError } = useToast();

  const navigate = useNavigate();

  const intl = useIntl();

  const schema = Yup.object({
    products: Yup.array<OrderForm>()
      .of(
        Yup.object({
          productCode: Yup.string().required(
            intl.formatMessage({
              id: "productCodeIsRequired",
              defaultMessage: "Product Code is required",
            })
          ),
          productBarcode: Yup.string().required(
            intl.formatMessage({
              id: "barcodeIsRequired",
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
        })
      )
      .length(
        1,
        intl.formatMessage({
          id: "addAtleastOneProduct",
          defaultMessage: "Add atleast one product",
        })
      ),
  });

  const {
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<AddProductFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      products: [],
    },
  });

  const onSubmit = (data: AddProductFormType) => {
    navigate("/salesOrder");

    showSuccess(
      intl.formatMessage({
        id: "productHasBeenAdded",
        defaultMessage: "Products has been added",
      })
    );
  };

  return (
    <form className="add-order page">
      <div className="header bg-white h-14 shadow rounded p-2 flex items-center justify-between mb-6 sticky top-14">
        <div className="left flex items-center gap-x-3">
          <button type="button" onClick={() => navigate(-1)}>
            <FiArrowLeft size={18} className="text-primary" />
          </button>
          <h1 className="text-base font-bold">
            <FormattedMessage id="addProduct" defaultMessage={"Add Product"} />
          </h1>
        </div>

        <button
          type="button"
          className="btn btn-primary w-288 h-11"
          disabled={Object.keys(errors).length > 0}
          onClick={() => {
            if (!isValid) {
              showError(
                errors?.products?.message ||
                  intl.formatMessage({
                    id: "addAtleastOneProduct",
                    defaultMessage: "Add atleast one product",
                  })
              );
            } else {
              handleSubmit(onSubmit)();
            }
          }}
        >
          <FormattedMessage id="submitOrder" defaultMessage={"Submit Order"} />
        </button>
      </div>

      <AddProductForm {...{ control }} />
    </form>
  );
};

export default AddOrder;
