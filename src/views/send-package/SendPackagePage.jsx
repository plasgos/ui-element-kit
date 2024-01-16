import React from "react";
import { CRow, CCol } from "@coreui/react";
import { SenderDetails } from "./_components/SenderDetails";
import { ReceiverDetails } from "./_components/ReceiverDetails";
import { DeliveryAndPayment } from "./_components/DeliveryAndPayment";
import { ItemDetails } from "./_components/ItemDetails";

const SendPackagePage = () => {
  return (
    <div>
      <h4 className="font-weight-bold">Kirim Paket</h4>
      <CRow>
        <CCol md="7">
          <SenderDetails />
          <ReceiverDetails />
          <ItemDetails />
        </CCol>
        <CCol md="5">
        <DeliveryAndPayment />

        </CCol>
      </CRow>
    </div>
  );
};

export default SendPackagePage;
