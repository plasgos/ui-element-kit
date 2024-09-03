import React from "react";
import CheckboxFormCheckout from "../../../common/CheckboxFormCheckout";

const Vertical = ({ section, inputStyle, control }) => {
  return (
    <div className="tw-flex tw-flex-col tw-gap-y-2">
      {section?.options.map((opt) => (
        <div key={opt.id}>
          <CheckboxFormCheckout
            style={inputStyle}
            label={opt.label}
            name={`custom-${section.type}.${opt.id}.value`}
            control={control}
            rules={{
              required: section.isRequired ? "Harus Di isi" : false,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Vertical;
