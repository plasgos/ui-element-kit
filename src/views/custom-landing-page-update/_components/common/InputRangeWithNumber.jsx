// import React from "react";
// import { CRow, CCol } from "@coreui/react";

// const InputRangeWithNumber = ({
//   label,
//   value,
//   min = 10,
//   max = 1200,
//   onChange,
//   onBlur,
// }) => {
//   const handleChange = (e) => {
//     const newValue = Number(e.target.value);
//     onChange(newValue);
//   };

//   return (
//     <CRow className="align-items-center mb-3 p-0 ">
//       <CCol md={12} className="mb-2">
//         <label className="mb-0 font-xs">{label}</label>
//       </CCol>
//       <CCol md={3}>
//         <div className="input-group flex-nowrap">
//           <input
//             type="number"
//             value={value !== 0 ? value : ""}
//             className="form-control text-center"
//             placeholder="0"
//             onChange={handleChange}
//             onBlur={onBlur}
//           />
//         </div>
//       </CCol>
//       <CCol md={8} className="p-0">
//         <div style={{ gap: 10 }} className="d-flex align-items-center">
//           <div className="text-secondary">{min}</div>
//           <input
//             style={{ cursor: "pointer", flexGrow: 1 }}
//             type="range"
//             className="form-range"
//             id="rangeInput"
//             min={min}
//             max={max}
//             value={value}
//             onChange={handleChange}
//           />
//           <div className="text-secondary">{max}</div>
//         </div>
//       </CCol>
//     </CRow>
//   );
// };

// export default InputRangeWithNumber;

import React from "react";

const InputRangeWithNumber = ({
  label,
  value,
  min = 10,
  max = 1200,
  onChange,
  onBlur,
}) => {
  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
  };

  return (
    <div className="row align-items-center mb-3" style={{ margin: 0 }}>
      <div className="col-md-12 mb-2">
        <label className="mb-0 font-xs">{label}</label>
      </div>
      <div className="col-md-3 pl-0 pr-2">
        <div className="input-group flex-nowrap">
          <input
            type="number"
            value={value !== 0 ? value : ""}
            className="form-control text-center"
            placeholder="0"
            onChange={handleChange}
            onBlur={onBlur}
            style={{ textAlign: "center" }}
          />
        </div>
      </div>
      <div className="col-md-9 p-0">
        <div className="d-flex align-items-center" style={{ gap: "10px" }}>
          <div className="text-secondary">{min}</div>
          <input
            type="range"
            className="form-range"
            id="rangeInput"
            min={min}
            max={max}
            value={value}
            onChange={handleChange}
            style={{ cursor: "pointer", flexGrow: 1 }}
          />
          <div className="text-secondary">{max}</div>
        </div>
      </div>
    </div>
  );
};

export default InputRangeWithNumber;