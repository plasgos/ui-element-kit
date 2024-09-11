import React, { useEffect, useState } from "react";
import { CInput, CSpinner } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useFontAwesomeIconPack } from "../../../../hooks/useFontAwesomePack";

const IconPicker = ({ value, onChange }) => {
  const [searchText, setSearchText] = useState("");
  const iconPack = useFontAwesomeIconPack();

  const [uniqueIcons, setUniqueIcons] = useState([]);

  useEffect(() => {
    if (iconPack) {
      const uniqueIconMap = new Map();
      iconPack.forEach((icon) => {
        if (!uniqueIconMap.has(icon.iconName)) {
          uniqueIconMap.set(icon.iconName, icon);
        }
      });
      setUniqueIcons(Array.from(uniqueIconMap.values()));
    }
  }, [iconPack]);

  if (!iconPack) {
    return <CSpinner color="primary" />;
  }

  const iconsFiltered = uniqueIcons.filter((icon) => {
    return icon.iconName.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div>
      <div placement="bottom">
        <div className="iconPicker__popoverContainer">
          <div className="iconPicker__popoverHeader">
            <CInput
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
              append={<FontAwesomeIcon icon={["fas", "search"]} />}
            />
          </div>
          <div className="iconPicker__iconsContainer">
            {iconsFiltered.map((icon) => (
              <div className="iconPicker__iconWrapper" key={icon.iconName}>
                <button
                  className={`iconPicker__iconItem ${
                    icon.iconName === value ? "selected" : ""
                  }`}
                  title={icon.iconName}
                  onClick={() => onChange?.(icon.iconName)}
                >
                  <FontAwesomeIcon icon={icon} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconPicker;