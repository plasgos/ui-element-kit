import React, { useEffect, useState } from "react";
import { formatPrice } from "../../../lib/format-price";
import { CButton, CSwitch } from "@coreui/react";
import { RiErrorWarningFill } from "react-icons/ri";
import { GoQuestion } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { setBilledByReceiverBeforeCustomCod } from "../../../redux/modules/packages/actions/actions";

export const Summary = ({ customCod, setCustomCod }) => {
  const packages = useSelector((state) => state.packages);
  const { selectedExpedtion } = packages;
  const [isChecked, setIsChecked] = useState(false);
  const [insuranceFee, setInsuranceFee] = useState(0);
  const [codFee, setCodFee] = useState(0);
  const [countInsuranceFee, setCountInsuranceFee] = useState(0);

  const dispatch = useDispatch();

  const toggleSwitch = () => {
    setIsChecked((prev) => !prev);
    setCountInsuranceFee((prev) => (prev === insuranceFee ? 0 : insuranceFee));
  };

  useEffect(() => {
    const billedByReceiver =
      selectedExpedtion.cost + countInsuranceFee + codFee + packages.item_value;
    if (customCod && customCod < billedByReceiver) {
      dispatch(setBilledByReceiverBeforeCustomCod(billedByReceiver));
      setCustomCod(null);
    }
  }, [
    customCod,
    countInsuranceFee,
    codFee,
    packages.item_value,
    selectedExpedtion.cost,
    setCustomCod,
    dispatch,
  ]);

  useEffect(() => {
    if (selectedExpedtion.setting !== undefined) {
      const countInsurance =
        selectedExpedtion.setting.insurance_fee * packages.item_value * 100 +
          selectedExpedtion.setting.insurance_add_cost || 0;

      setInsuranceFee(countInsurance);
    }
  }, [selectedExpedtion, selectedExpedtion.setting, packages]);

  useEffect(() => {
    if (selectedExpedtion.setting !== undefined) {
      const insuranse = countInsuranceFee ? countInsuranceFee : 0;

      const codFee =
        selectedExpedtion.setting?.cod_fee *
          (packages.item_value + selectedExpedtion.cost + insuranse) || 0;

      if (codFee === 0) {
        setCodFee(0);
      } else if (codFee <= 3000) {
        setCodFee(3000);
      } else {
        setCodFee(codFee);
      }
    }
  }, [
    selectedExpedtion,
    selectedExpedtion.setting,
    selectedExpedtion.cost,
    countInsuranceFee,
    packages,
  ]);

  return (
    <div className="mb-3">
      <div className="pt-3 card p-3 shadow-sm">
        <div className="card shadow-sm p-3 ">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="font-weight-bold mb-1">Asuransi</div>
              <div className="text-success">
                Biaya Asuransi {insuranceFee ? formatPrice(insuranceFee) : 0}
              </div>
            </div>
            <div>
              <CSwitch
                shape="pill"
                color="primary"
                checked={isChecked}
                onChange={toggleSwitch}
              />
            </div>
          </div>
        </div>

        <div style={{ gap: 10 }} className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-muted">Layanan</div>
            <div className="font-weight-bold">{selectedExpedtion.name}</div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="text-muted">Ongkir</div>
            <div className="font-weight-bold mb-2 text-success">
              {/* <span
                style={{ textDecoration: "line-through" }}
                className="text-decoration-line-through text-danger mr-1"
              >
                {formatPrice(12000)}
              </span>{" "} */}
              <span>
                {selectedExpedtion.cost
                  ? formatPrice(selectedExpedtion.cost)
                  : 0}
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="text-muted">Biaya Asuransi</div>
            <div className="font-weight-bold">
              {isChecked ? formatPrice(insuranceFee || 0) : 0}
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="text-muted">COD Fee</div>
            <div className="font-weight-bold">
              {codFee ? formatPrice(codFee) : 0}
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="text-muted">Nilai Barang</div>
            <div className="font-weight-bold">
              {packages.item_value ? formatPrice(packages.item_value) : 0}
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className=" font-weight-bold text-primary">
              Ditagih ke Penerima
            </div>
            <div className="font-weight-bold text-primary">
              {customCod
                ? formatPrice(+customCod)
                : packages.item_value && selectedExpedtion.cost
                ? formatPrice(
                    selectedExpedtion.cost +
                      countInsuranceFee +
                      codFee +
                      packages.item_value
                  )
                : 0}
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="font-weight-bold text-success">
              Estimasi Pencairan
            </div>
            <div className="d-flex align-items-center">
              <div className="font-weight-bold text-success">
                {customCod
                  ? formatPrice(
                      customCod -
                        codFee -
                        countInsuranceFee -
                        selectedExpedtion.cost
                    )
                  : formatPrice(packages.item_value)}
              </div>
              <GoQuestion className="ml-2 text-success" />
            </div>
          </div>

          <div className="">
            <div
              style={{ backgroundColor: "#D7E3FF", gap: 15 }}
              className="d-flex justify-content-between align-items-center rounded p-2"
            >
              <div
                className="d-flex  align-items-center"
                style={{ color: "#2D61AC" }}
              >
                <RiErrorWarningFill size={18} />
                <span className="ml-2">Syarat & Ketentuan</span>
              </div>
              <div style={{ color: "#2D61AC" }}>Details</div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-end">
        <CButton className="btn-outline-primary">Batal</CButton>
        <CButton className="ml-3" color="primary">
          Kirim
        </CButton>
      </div>
    </div>
  );
};
