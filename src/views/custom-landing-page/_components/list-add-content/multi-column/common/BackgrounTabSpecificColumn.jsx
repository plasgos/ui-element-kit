import React, { useEffect, useState } from "react";
import imageDefault from "../../../../../../assets/bg.jpg";
import { CButton } from "@coreui/react";
import { backgroundType, PaddingYOptions } from "../../../SelectOptions";
import SelectOptions from "../../../common/SelectOptions";
import InputRangeWithNumber from "../../../common/InputRangeWithNumber";
import ColorPicker from "../../../common/ColorPicker";

const BackgrounTabSpecificColumn = ({
  currentSection: currentContent,
  setPreviewSection,
  sectionId,
  columnId,
  isSlidingOutColumn,
}) => {
  const [selectedBackgroundType, setSelectedBackgroundType] = useState(
    backgroundType[0]
  );

  const [selectedPadding, setSelectedPadding] = useState(PaddingYOptions[0]);

  const [paddingY, setPaddingY] = useState(
    currentContent.background?.paddingY || 0
  );
  const [paddingTop, setPaddingTop] = useState(
    currentContent.background?.paddingTop || 0
  );
  const [paddingBottom, setPaddingBottom] = useState(
    currentContent.background?.paddingBottom || 0
  );

  const [selectedBgColor, setSelectedBgColor] = useState(
    currentContent.background?.bgColor || "#EEEEEE"
  );

  const [imageUrl, setImageUrl] = useState(
    currentContent.background?.bgImage || imageDefault
  );
  const [blur, setBlur] = useState(currentContent.background?.blur || 0);
  const [opacity, setOpacity] = useState(
    currentContent.background?.opacity || 0
  );

  useEffect(() => {
    const currentBgTypeOption = backgroundType.find(
      (opt) => opt.value === currentContent.background?.bgType
    );
    if (currentBgTypeOption) {
      setSelectedBackgroundType(currentBgTypeOption);
    }

    const currentPaddingTypeOption = PaddingYOptions.find(
      (opt) => opt.value === currentContent.background?.paddingType
    );

    if (currentPaddingTypeOption) {
      setSelectedPadding(currentPaddingTypeOption);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backgroundType, PaddingYOptions, currentContent.background]);

  const defaultBgValues = {
    bgType: undefined,
    bgColor: "",
    bgImage: "",
    blur: 0,
    opacity: 0,
    paddingY: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingType: "equal",
  };

  const handleChangeValueOptions = (key, value) => {
    if (!value) {
      setPreviewSection((arr) =>
        arr.map((section) => {
          return String(section.id) === sectionId
            ? {
                ...section,
                column: section.column.map((column) =>
                  column.id === columnId
                    ? {
                        ...column,
                        background: defaultBgValues,
                      }
                    : column
                ),
              }
            : section;
        })
      );
    } else if (value !== "image") {
      setPreviewSection((arr) =>
        arr.map((section) => {
          return String(section.id) === sectionId
            ? {
                ...section,
                column: section.column.map((column) =>
                  column.id === columnId
                    ? {
                        ...column,
                        background: {
                          ...column.background,
                          bgImage: "",
                        },
                      }
                    : column
                ),
              }
            : section;
        })
      );
    }

    setPreviewSection((arr) =>
      arr.map((section) => {
        return String(section.id) === sectionId
          ? {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      background: {
                        ...column.background,
                        [key]: value,
                      },
                    }
                  : column
              ),
            }
          : section;
      })
    );
  };

  const handleChangePaddingOptions = (selectedOption) => {
    setSelectedPadding(selectedOption);
    if (selectedOption.value !== "equal") {
      setPaddingY(0);
      setPreviewSection((arr) =>
        arr.map((section) => {
          return String(section.id) === sectionId
            ? {
                ...section,
                column: section.column.map((column) =>
                  column.id === columnId
                    ? {
                        ...column,
                        background: {
                          ...column.background,
                          paddingY: 0,
                          paddingType: selectedOption.value,
                        },
                      }
                    : column
                ),
              }
            : section;
        })
      );
    } else {
      setPaddingTop(0);
      setPaddingBottom(0);
      setPreviewSection((arr) =>
        arr.map((section) => {
          return String(section.id) === sectionId
            ? {
                ...section,
                column: section.column.map((column) =>
                  column.id === columnId
                    ? {
                        ...column,
                        background: {
                          ...column.background,
                          paddingTop: 0,
                          paddingBottom: 0,
                          paddingType: selectedOption.value,
                        },
                      }
                    : column
                ),
              }
            : section;
        })
      );
    }
  };

  const handleUpdateBackground = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) => {
        return String(section.id) === sectionId
          ? {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      background: {
                        ...column.background,
                        [key]: value,
                      },
                    }
                  : column
              ),
            }
          : section;
      })
    );
  };

  const handleSetValueWhenBlurBackground = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "paddingY") {
      setPaddingY(newValue);
    } else if (key === "paddingTop") {
      setPaddingTop(newValue);
    } else if (key === "paddingBottom") {
      setPaddingBottom(newValue);
    } else if (key === "blur") {
      setBlur(newValue);
    } else if (key === "opacity") {
      setOpacity(newValue);
    }
    handleUpdateBackground(key, newValue);
  };

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();

    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImageUrl(imageUrl);
      };

      reader.readAsDataURL(file);
    };
  };

  useEffect(() => {
    // Update tempSections setelah imageUrl berubah

    if (selectedBackgroundType?.value === "image") {
      setPreviewSection((arr) =>
        arr.map((section) => {
          return String(section.id) === sectionId
            ? {
                ...section,
                column: section.column.map((column) =>
                  column.id === columnId
                    ? {
                        ...column,
                        background: {
                          ...column.background,
                          bgImage: imageUrl,
                          bgColor: "",
                        },
                      }
                    : column
                ),
              }
            : section;
        })
      );
    } else if (selectedBackgroundType?.value === "color") {
      setPreviewSection((arr) =>
        arr.map((section) => {
          return String(section.id) === sectionId
            ? {
                ...section,
                column: section.column.map((column) =>
                  column.id === columnId
                    ? {
                        ...column,
                        background: {
                          ...column.background,
                          bgColor: selectedBgColor,
                        },
                      }
                    : column
                ),
              }
            : section;
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl, selectedBackgroundType, selectedBgColor]);

  return (
    <div
      className={`animate__animated pb-4 ${
        isSlidingOutColumn ? "animate__fadeOutRight animate__fast" : ""
      }`}
    >
      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Tipe Background"
          options={backgroundType}
          onChange={(selectedOption) => {
            setSelectedBackgroundType(selectedOption);
            handleChangeValueOptions("bgType", selectedOption.value);
          }}
          value={selectedBackgroundType}
          width="50"
        />

        <SelectOptions
          label="Pengisi Atas dan Bawah"
          options={PaddingYOptions}
          onChange={(selectedOption) => {
            setSelectedPadding(selectedOption);
            handleChangePaddingOptions(selectedOption);
          }}
          value={selectedPadding}
          width="50"
        />
      </div>

      {selectedPadding?.value === "equal" ? (
        <InputRangeWithNumber
          label="Ruang Pengisi"
          value={paddingY}
          onChange={(newValue) => {
            setPaddingY(newValue);
            handleUpdateBackground("paddingY", newValue);
          }}
          min={0}
          max={200}
          onBlur={() =>
            handleSetValueWhenBlurBackground(paddingY, 0, 200, "paddingY")
          }
        />
      ) : (
        <div>
          <InputRangeWithNumber
            label="Ruang Pengisi Atas"
            value={paddingTop}
            onChange={(newValue) => {
              setPaddingTop(newValue);
              handleUpdateBackground("paddingTop", newValue);
            }}
            min={0}
            max={200}
            onBlur={() =>
              handleSetValueWhenBlurBackground(paddingTop, 0, 200, "paddingTop")
            }
          />
          <InputRangeWithNumber
            label="Ruang Pengisi Bawah"
            value={paddingBottom}
            onChange={(newValue) => {
              setPaddingBottom(newValue);
              handleUpdateBackground("paddingBottom", newValue);
            }}
            min={0}
            max={200}
            onBlur={() =>
              handleSetValueWhenBlurBackground(
                paddingBottom,
                0,
                200,
                "paddingBottom"
              )
            }
          />
        </div>
      )}

      {selectedBackgroundType?.value === "color" && (
        <div className="mb-2">
          <ColorPicker
            initialColor={selectedBgColor}
            label="Warna"
            onChange={(color) => {
              setSelectedBgColor(color);
              handleUpdateBackground("bgColor", color);
            }}
            top={"0"}
            right={"34px"}
            type="rgba"
          />
        </div>
      )}

      {selectedBackgroundType?.value === "image" && (
        <>
          <div className="mb-2">
            <div
              style={{
                backgroundColor: "#F5F5F5",
                width: "100%",
                overflow: "hidden",
              }}
              className="mx-auto mb-2"
            >
              <img
                style={{ objectFit: "contain", width: "100%", height: 100 }}
                src={imageUrl || imageDefault}
                alt="img"
              />
            </div>

            <CButton
              onClick={handleFileUpload}
              color="primary"
              variant="outline"
              className="btn-block"
            >
              Upload
            </CButton>
          </div>

          <InputRangeWithNumber
            label="Blur"
            value={blur}
            onChange={(newValue) => {
              setBlur(newValue);
              handleUpdateBackground("blur", newValue);
            }}
            min={0}
            max={40}
            onBlur={() => handleSetValueWhenBlurBackground(blur, 0, 40, "blur")}
          />

          <InputRangeWithNumber
            label="Opacity"
            value={opacity}
            onChange={(newValue) => {
              setOpacity(newValue);
              handleUpdateBackground("opacity", newValue);
            }}
            min={-50}
            max={50}
            onBlur={() =>
              handleSetValueWhenBlurBackground(opacity, -50, 50, "opacity")
            }
          />
        </>
      )}
    </div>
  );
};

export default BackgrounTabSpecificColumn;