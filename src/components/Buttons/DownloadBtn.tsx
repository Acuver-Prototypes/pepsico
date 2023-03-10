import React from "react";
import { FiDownloadCloud } from "react-icons/fi";
import { useIntl } from "react-intl";
import useToast from "../../hooks/useToast";
import UtilityBtn from "../UtilityBtn/UtilityBtn";

const DownloadBtn = () => {
  const { showSuccess } = useToast();

  const intl = useIntl();

  return (
    <UtilityBtn
      Icon={FiDownloadCloud}
      label={intl.formatMessage({
        id: "downloadCSV",
        defaultMessage: "Download CSV",
      })}
      uniqueId="downloadBtn"
      classes="btn btn-success-outline gap-x-0"
      onClick={() =>
        showSuccess(
          intl.formatMessage({
            id: "downloadSuccessfully",
            defaultMessage: "Downloaded successfully",
          })
        )
      }
    />
  );
};

export default DownloadBtn;
