import { useState } from "react";
import { FiGlobe } from "react-icons/fi";
import { useLanguage } from "../../contexts/LanguageContext";
import useOutSideClose from "../../hooks/useOutSideClose";
import { ALL_LANGUAGES } from "../../types/constants";

const LanguageSelector = () => {
  const [showOptions, setShowOptions] = useState(false);

  const ref = useOutSideClose(() => setShowOptions(false));

  const { locale, changeLanguage } = useLanguage();

  const handleChangeLanguage = (l: string) => {
    changeLanguage(l, true);

    setShowOptions(false);
  };

  return (
    <div
      className="language-selector relative flex items-center justify-center text-sm"
      ref={ref}
    >
      <button
        onClick={() => setShowOptions(!showOptions)}
        className={`${
          showOptions ? "active" : ""
        } text-primary_black icon-button`}
      >
        <FiGlobe size={18} />
      </button>

      {showOptions && (
        <div
          className="absolute -right-2 z-40 bg-white rounded-xl shadow-lg top-10"
          style={{
            minWidth: "150px",
          }}
        >
          <ul className="flex flex-col font-base">
            {Object.values(ALL_LANGUAGES).map((l) => (
              <li
                key={l}
                onClick={() => handleChangeLanguage(l)}
                className={`${
                  locale === l ? "bg-blue-200" : "hover:bg-blue-200"
                } first:rounded-t-xl cursor-pointer px-4 py-2 last:rounded-b-xl`}
              >
                {l}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
