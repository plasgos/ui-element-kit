import React from "react";

import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CInput,
  CLabel,
} from "@coreui/react";

import { FaRegCircleQuestion } from "react-icons/fa6";

export const FilterSection = () => {
  return (
    <div
      style={{ gap: 10 }}
      className="d-flex flex-wrap align-items-center   shadow-sm p-3 mt-3"
    >
      <div style={{ flexGrow: 1 }}>
        <CLabel className="font-weight-bold">Cari</CLabel>
        <CInput type="text" />
      </div>
      <div style={{ width: 200 }}>
        <CLabel className="font-weight-bold">Tanggal</CLabel>
        <CInput type="text" />
      </div>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="font-weight-bold">Tipe Tanggal</div>
          <FaRegCircleQuestion />
        </div>
        <CDropdown className="mt-2">
          <CDropdownToggle
            style={{ width: 200 }}
            caret
            className="border d-flex justify-content-between align-items-center"
          >
            Paket Dibuat
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem style={{ cursor: "pointer" }} header>
              Header
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </div>
      <div>
        <div className="font-weight-bold">jenis Paket</div>
        <CDropdown className="mt-2">
          <CDropdownToggle
            style={{ width: 200 }}
            caret
            className="border d-flex justify-content-between align-items-center"
          >
            Semua(COD/Non COD)
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem style={{ cursor: "pointer" }} header>
              Header
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </div>
      <div>
        <div className="font-weight-bold">Ekspedisi</div>
        <CDropdown className="mt-2">
          <CDropdownToggle
            style={{ width: 200 }}
            caret
            className="border d-flex justify-content-between align-items-center"
          >
            Semua
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem style={{ cursor: "pointer" }} header>
              Header
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </div>
    </div>
  );
};
