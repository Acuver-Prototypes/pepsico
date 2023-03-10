import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ProductForm } from "../../types";
import SubmitBtn from "../../components/FormComponents/SubmitBtn";
import { FiArrowLeft } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import { FormattedMessage, useIntl } from "react-intl";
import GeneralForm from "../../components/ProductForms/GeneralForm";
import UOMForm from "../../components/ProductForms/UOMForm";

const ProductDetails = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state }: any = useLocation();
  const [isEditing, setIsEditing] = useState(state?.edit ? true : false);

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
    defaultValues: {
      productCode: "320010350",
      eanNumber: "8858998593057",
      desc1: "abc 12xl",
      desc2: "7UP 1.45L PET 12X",
      handheldDesc: "7UP 1.45L",
      status: {
        label: "Active",
        value: "active",
      },
      type: "Selling",
      baseUOM: "CV",
      salesUnit: "",
      allowableInPromotion: true,
      parentProduct: "",
      materialType: "ZFIN - ZFIN",
      materialGroup: "NORM - NORM",
      materialTaxGroup: "CSDPET1450 - CSD PET 1450 ML.",
      dummyGlass: false,
      competitorGlass: false,
      glAccount: "",
      convToPallet: "44.00",
      convToLayer: "11 CT",
      cubicMeter: "0.033",

      uomCode: "CT",
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
        id: "productHasBeenUpdated",
        defaultMessage: "Product has been updated",
      })
    );
  };

  const getCurrentContent = (currentTab: number) => {
    if (currentTab === 0) {
      return (
        <GeneralForm
          {...{
            control,
            isDirty,
            errors,
            isValid,
            register,
            setCurrentTab,
            disabled: !isEditing,
            showButtons: false,
          }}
        />
      );
    } else if (currentTab === 1) {
      return (
        <UOMForm
          {...{
            errors,
            isSubmitting,
            isValid,
            register,
            setCurrentTab,
            disabled: !isEditing,
            showButtons: false,
          }}
        />
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-product page">
      <div className="header bg-white h-14 shadow rounded p-2 flex items-center justify-between mb-6 sticky top-14 z-10">
        <div className="left flex items-center gap-x-3">
          <button type="button" onClick={() => navigate(-1)}>
            <FiArrowLeft size={18} className="text-primary" />
          </button>
          <h1 className="text-base font-bold">
            <FormattedMessage
              id="productDetail"
              defaultMessage={"Product Detail"}
            />
          </h1>
        </div>

        {isEditing ? (
          <div className="flex items-center gap-x-2">
            <button
              className="btn btn-gray"
              onClick={() => {
                reset();
                setIsEditing(false);
              }}
            >
              <FormattedMessage id="cancel" defaultMessage={"Cancel"} />
            </button>
            <SubmitBtn
              translateId="update"
              classes="w-28"
              disabled={Object.keys(errors).length > 0 || !isDirty}
              isSubmitting={isSubmitting}
              text={"Update"}
            />
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsEditing(true)}
          >
            <FormattedMessage id="edit" defaultMessage={"Edit"} />
          </button>
        )}
      </div>

      <div
        className="tabs sticky top-28 bg-white h-12 border-b text-sm mb-6 shadow flex justify-between"
        style={{
          zIndex: 8,
        }}
      >
        <div className="left">
          <button
            onClick={() => setCurrentTab(0)}
            type="button"
            role="tab"
            className={`${
              currentTab === 0
                ? "active border-b-2 border-primary text-primary"
                : "text-gray-500"
            } h-12 font-semibold px-3 cursor-pointer disabled:cursor-default`}
          >
            <FormattedMessage id="general" defaultMessage={"General"} />
          </button>
          <button
            onClick={() => setCurrentTab(1)}
            type="button"
            role="tab"
            className={`${
              currentTab === 1
                ? "active border-b-2 border-primary text-primary"
                : "text-gray-500"
            } h-12 font-semibold px-3 cursor-pointer disabled:cursor-default`}
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
  );
};

export default ProductDetails;
