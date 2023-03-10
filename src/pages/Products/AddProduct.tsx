import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ProductForm } from "../../types";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import useToast from "../../hooks/useToast";
import GeneralForm from "../../components/ProductForms/GeneralForm";
import UOMForm from "../../components/ProductForms/UOMForm";
import { FormattedMessage, useIntl } from "react-intl";

const AddProduct = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showSuccess } = useToast();

  const navigate = useNavigate();

  const intl = useIntl();

  const schema = Yup.object({
    productCode: Yup.string().required(
      intl.formatMessage({
        id: "productCodeIsRequired",
        defaultMessage: "Product Code is required",
      })
    ),
    eanNumber: Yup.string().required(
      intl.formatMessage({
        id: "eanNoIsRequired",
        defaultMessage: "Ean No. is required",
      })
    ),
    desc1: Yup.string(),
    desc2: Yup.string(),
    handheldDesc: Yup.string(),
    status: Yup.object({
      label: Yup.string(),
      value: Yup.string(),
    }),
    type: Yup.string(),
    baseUOM: Yup.string(),
    salesUnit: Yup.string(),
    allowableInPromotion: Yup.boolean(),
    parentProduct: Yup.string(),
    materialType: Yup.string(),
    materialGroup: Yup.string(),
    materialTaxGroup: Yup.string(),
    dummyGlass: Yup.boolean(),
    competitorGlass: Yup.boolean(),
    glAccount: Yup.string(),
    convToPallet: Yup.string().required(
      intl.formatMessage({
        id: "thisFieldIsRequired",
        defaultMessage: "This field is required",
      })
    ),
    convToLayer: Yup.string().required(
      intl.formatMessage({
        id: "thisFieldIsRequired",
        defaultMessage: "This field is required",
      })
    ),
    cubicMeter: Yup.string().required(
      intl.formatMessage({
        id: "thisFieldIsRequired",
        defaultMessage: "This field is required",
      })
    ),

    uomCode: Yup.string(),
    netWeight: Yup.string(),
    grossWeight: Yup.string(),
    weightUnit: Yup.string(),
  });

  const [currentTab, setCurrentTab] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm<ProductForm>({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      productCode: "",
      eanNumber: "",
      desc1: "",
      desc2: "",
      handheldDesc: "",
      status: {
        label: "Active",
        value: "active",
      },
      type: "",
      baseUOM: "",
      salesUnit: "",
      allowableInPromotion: false,
      parentProduct: "",
      materialType: "",
      materialGroup: "",
      materialTaxGroup: "",
      dummyGlass: false,
      competitorGlass: false,
      glAccount: "",
      convToPallet: "",
      convToLayer: "",
      cubicMeter: "",

      uomCode: "",
      netWeight: "",
      grossWeight: "",
      weightUnit: "",
    },
  });

  const onSubmit = (data: ProductForm) => {
    console.log(data);

    navigate("/products");

    showSuccess(
      intl.formatMessage({
        id: "productHasBeenAdded",
        defaultMessage: "Product has been added",
      })
    );
  };

  const getCurrentContent = (currentTab: number) => {
    if (currentTab === 0) {
      return (
        <GeneralForm
          {...{ errors, isValid, register, isDirty, setCurrentTab, control }}
        />
      );
    } else if (currentTab === 1) {
      return (
        <UOMForm
          {...{
            control,
            isValid,
            setCurrentTab,
            errors,
            isSubmitting,
            register,
          }}
        />
      );
    }
  };

  return (
    <div className="add-product page">
      <div className="header bg-white h-14 shadow rounded p-2 flex items-center justify-between mb-6 sticky top-14 z-10">
        <div className="left flex items-center gap-x-3">
          <button type="button" onClick={() => navigate(-1)}>
            <FiArrowLeft size={18} className="text-primary" />
          </button>
          <h1 className="text-base font-bold">
            <FormattedMessage id="addProduct" defaultMessage={"Add Product"} />
          </h1>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="form w-full">
        <div
          className="tabs sticky top-28 bg-white h-12 border-b text-sm mb-6 shadow flex justify-between"
          style={{
            zIndex: 8,
          }}
        >
          <div className="left">
            <button
              disabled={true}
              // onClick={() => setCurrentTab(0)}
              type="button"
              role="tab"
              className={`${
                currentTab === 0
                  ? "active border-b-2 border-primary text-primary"
                  : "text-gray-500"
              } h-12 font-semibold px-3 cursor-default`}
            >
              <FormattedMessage id="general" defaultMessage={"General"} />
            </button>
            <button
              disabled={true}
              // onClick={() => setCurrentTab(1)}
              type="button"
              role="tab"
              className={`${
                currentTab === 1
                  ? "active border-b-2 border-primary text-primary"
                  : "text-gray-500"
              } h-12 font-semibold px-3 cursor-default`}
            >
              <FormattedMessage id="uom" defaultMessage={"UOM"} />
            </button>
          </div>

          <div
            id="product-tab-portal"
            className="flex items-center gap-x-2 mr-2"
          ></div>
        </div>

        {getCurrentContent(currentTab)}
      </form>
    </div>
  );
};

export default AddProduct;
