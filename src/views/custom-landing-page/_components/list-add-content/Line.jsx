import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { createUniqueID } from "../../../../lib/unique-id";
import { FaCheck, FaGripLines } from "react-icons/fa6";
import ColorPicker from "../common/ColorPicker";
import InputRangeWithNumber from "../common/InputRangeWithNumber";
import Checkbox from "../common/Checkbox";

const Line = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditing = false,
  sectionBeforeEdit,
  currentSection,
}) => {
  const [variantLine, setVariantLine] = useState("Stripe - Barber");
  const [isEditDesign, setIsEditDesign] = useState(false);
  const [designBeforeEdit, setDesignBeforeEdit] = useState("");
  const [setting, setSetting] = useState({});
  const [height, setHeight] = useState(
    isEditing ? currentSection?.content?.height : 10
  );
  const [width1, setWidth1] = useState(
    isEditing ? currentSection?.content?.width1 : 40
  );
  const [width2, setWidth2] = useState(
    isEditing ? currentSection?.content?.width2 : 20
  );
  const [distance, setDistance] = useState(
    isEditing ? currentSection?.content?.distance : 10
  );
  const [isFlip, setIsFlip] = useState(
    isEditing ? currentSection?.content?.isFlip : false
  );
  const [isFloating, setIsFloating] = useState(
    isEditing ? currentSection?.content?.isFloating : false
  );
  const [color1, setColor1] = useState(
    isEditing ? currentSection?.content?.color1 : "#F44336"
  );
  const [color2, setColor2] = useState(
    isEditing ? currentSection?.content?.color2 : "#2196F3"
  );

  const handleChangeColor1 = (color) => {
    setColor1(color);
    if (isEditing) {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection.id
            ? {
                ...item,
                content: {
                  ...item.content,
                  color1: color,
                },
              }
            : item
        )
      );
    } else {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === setting.id
            ? {
                ...item,
                content: {
                  ...item.content,
                  color1: color,
                },
              }
            : item
        )
      );
    }
  };

  const handleChangeColor2 = (color) => {
    setColor2(color);
    if (isEditing) {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection.id
            ? {
                ...item,
                content: {
                  ...item.content,
                  color2: color,
                },
              }
            : item
        )
      );
    } else {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === setting.id
            ? {
                ...item,
                content: {
                  ...item.content,
                  color2: color,
                },
              }
            : item
        )
      );
    }
  };

  const handleChangeFlip = (value) => {
    setIsFlip(value);
    if (isEditing) {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection.id
            ? {
                ...item,
                content: {
                  ...item.content,
                  isFlip: value,
                },
              }
            : item
        )
      );
    } else {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === setting.id
            ? {
                ...item,
                content: {
                  ...item.content,
                  isFlip: value,
                },
              }
            : item
        )
      );
    }
  };

  const handleChangeFloating = (value) => {
    setIsFloating(value);

    if (isEditing) {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection.id
            ? {
                ...item,
                content: {
                  ...item.content,
                  isFloating: value,
                },
              }
            : item
        )
      );
    } else {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === setting.id
            ? {
                ...item,
                content: {
                  ...item.content,
                  isFloating: value,
                },
              }
            : item
        )
      );
    }
  };

  const handleUpdateValue = (key, value) => {
    if (isEditing) {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection.id
            ? {
                ...item,
                content: {
                  ...item.content,
                  [key]: value,
                },
              }
            : item
        )
      );
    } else {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === setting.id
            ? {
                ...item,
                content: {
                  ...item.content,
                  [key]: value,
                },
              }
            : item
        )
      );
    }
  };

  const handleSetValueWhenBlurValue = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "height") {
      setHeight(newValue);
    } else if (key === "width1") {
      setWidth1(newValue);
    } else if (key === "width2") {
      setWidth2(newValue);
    } else if (key === "distance") {
      setDistance(newValue);
    }
    handleUpdateValue(key, newValue);
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "line",
      title: "Garis",
      icon: <FaGripLines size={24} />,
      content: {
        height,
        width1,
        width2,
        distance,
        isFlip,
        isFloating,
        color1,
        color2,
        variant: variantLine,
      },
    };

    setPreviewSection((prevSections) => [...prevSections, payload]);
    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditing) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  const handelCancel = () => {
    if (isEditing) {
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else if (isEditDesign) {
      setIsEditDesign(false);
      setVariantLine(designBeforeEdit);
    } else {
      isShowContent(false);
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => section.id !== setting.id)
      );
    }
  };

  const handelConfirm = () => {
    if (isEditDesign) {
      setIsEditDesign(false);
    } else {
      isShowContent(false);
    }
  };

  const handleEditDesign = () => {
    setIsEditDesign(true);
    setDesignBeforeEdit(variantLine);
  };

  const handleChangeDesign = (value) => {
    setVariantLine(value);

    if (isEditing) {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection.id
            ? {
                ...item,
                content: {
                  ...item.content,
                  variant: value,
                },
              }
            : item
        )
      );
    } else {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === setting.id
            ? {
                ...item,
                content: {
                  ...item.content,
                  variant: value,
                },
              }
            : item
        )
      );
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-end align-items-center border-bottom p-2">
        <div>
          <CButton
            onClick={handelCancel}
            color="primary"
            variant="outline"
            className="mx-2"
          >
            Batal
          </CButton>

          <CButton onClick={handelConfirm} color="primary">
            Selesai
          </CButton>
        </div>
      </div>

      {isEditDesign ? (
        <CCard className="my-3 p-2">
          <div style={{ fontSize: 12 }} className="mb-2 italic">
            Variant
          </div>
          <div style={{ gap: 10 }} className="d-flex align-items-center ">
            <CButton
              onClick={() => handleChangeDesign("Basic")}
              color="primary"
              // variant="ghost"
              variant={variantLine === "Basic" ? "outline" : "ghost"}
            >
              <div className="d-flex align-items-center">
                <div>Basic</div>

                {variantLine === "Basic" && (
                  <FaCheck
                    size={16}
                    color="#13CC48"
                    style={{ marginLeft: 10 }}
                  />
                )}
              </div>
            </CButton>

            <CButton
              onClick={() => handleChangeDesign("Stripe - Barber")}
              color="primary"
              // variant="ghost"
              variant={
                variantLine ||
                currentSection.content?.variant === "Stripe - Barber"
                  ? "outline"
                  : "ghost"
              }
            >
              <div className="d-flex align-items-center">
                <div>Stripe - Barber</div>

                {(variantLine || currentSection.content?.variant) ===
                  "Stripe - Barber" && (
                  <FaCheck
                    size={16}
                    color="#13CC48"
                    style={{ marginLeft: 10 }}
                  />
                )}
              </div>
            </CButton>
          </div>
        </CCard>
      ) : (
        <div>
          <div className="mb-3">
            <div style={{ fontSize: 12 }} className="mt-3">
              Desain
            </div>
            <div className="d-flex align-items-center">
              <div className="mr-2">{variantLine}</div>

              <CButton onClick={handleEditDesign} color="primary">
                Ubah
              </CButton>
            </div>
          </div>

          <div style={{ gap: 10 }} className="d-flex align-items-center my-3">
            <ColorPicker
              initialColor={color1}
              label="Garis"
              onChange={handleChangeColor1}
              bottom={"80px"}
              type="rgba"
            />

            <ColorPicker
              initialColor={color2}
              label="Garis B"
              onChange={handleChangeColor2}
              bottom={"80px"}
              type="rgba"
            />
          </div>

          <InputRangeWithNumber
            label="Tinggi"
            value={height}
            onChange={(newValue) => {
              setHeight(newValue);
              handleUpdateValue("height", newValue);
            }}
            min={1}
            max={100}
            onBlur={() => handleSetValueWhenBlurValue(height, 1, 100, "height")}
          />

          <InputRangeWithNumber
            label="Lebar 1"
            value={width1}
            onChange={(newValue) => {
              setWidth1(newValue);
              handleUpdateValue("width1", newValue);
            }}
            min={1}
            max={100}
            onBlur={() => handleSetValueWhenBlurValue(width1, 1, 100, "width1")}
          />

          <InputRangeWithNumber
            label="Lebar 2"
            value={width2}
            onChange={(newValue) => {
              setWidth2(newValue);
              handleUpdateValue("width2", newValue);
            }}
            min={1}
            max={100}
            onBlur={() => handleSetValueWhenBlurValue(width2, 1, 100, "width2")}
          />

          <InputRangeWithNumber
            label="Jarak"
            value={distance}
            onChange={(newValue) => {
              setDistance(newValue);
              handleUpdateValue("distance", newValue);
            }}
            min={0}
            max={100}
            onBlur={() =>
              handleSetValueWhenBlurValue(distance, 0, 100, "distance")
            }
          />

          <div style={{ gap: 10 }} className="d-flex align-items-center my-3">
            <Checkbox
              label="Terbalik"
              id="isFlip"
              checked={isFlip}
              onChange={(e) => handleChangeFlip(e.target.checked)}
            />

            <Checkbox
              label="Floating"
              id="isFloating"
              checked={isFloating}
              onChange={(e) => handleChangeFloating(e.target.checked)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Line;
