import React, { useEffect, useState } from "react";
import SelectOptions from "../../../../../common/SelectOptions";
import { shadowOptions } from "../../../../../SelectOptions";
import InputRangeWithNumber from "../../../../../common/InputRangeWithNumber";

const imagePositionOptions = [
  { value: "left", label: "Kiri" },
  { value: "right", label: "Kanan" },
];

const Page = ({
  setPreviewSection,
  currentSection,
  selectedVariant,
  sectionId,
}) => {
  const [shadow, setShadow] = useState(undefined);

  const [width, setWidth] = useState(
    currentSection?.variant?.style?.width || 26
  );

  const [rounded, setRounded] = useState(
    currentSection?.variant?.style?.rounded || 0
  );

  const [distance, setDistance] = useState(
    currentSection?.variant?.style?.distance || 0
  );

  const [rotation, setRotation] = useState(
    currentSection?.variant?.style?.rotation || 0
  );

  const [imagePosition, setImagePosition] = useState(
    imagePositionOptions.find(
      (opt) =>
        opt.value === currentSection?.variant?.style?.imagePosition ||
        imagePositionOptions[0]
    )
  );

  useEffect(() => {
    const currentShadowOption = shadowOptions.find(
      (opt) => opt.value === currentSection?.variant?.style?.shadow
    );
    if (currentShadowOption) {
      setShadow(currentShadowOption);
    }

    const currentImagePostion = imagePositionOptions.find(
      (opt) => opt.value === currentSection?.variant?.style?.imagePosition
    );

    if (currentImagePostion) {
      setImagePosition(currentImagePostion);
    }
  }, [currentSection]);

  const handleSetValueWhenBlurWrapperStyle = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "width") {
      setWidth(newValue);
    } else if (key === "rotation") {
      setRotation(newValue);
    } else if (key === "rounded") {
      setRounded(newValue);
    } else if (key === "distance") {
      setDistance(newValue);
    }
    handleChangeVariantStyle(key, newValue);
  };

  const handleChangeVariantStyle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.map((content) =>
                content.id === currentSection.id
                  ? {
                      ...content,
                      variant: {
                        ...content.variant,
                        style: {
                          ...content.variant.style,
                          [key]: value,
                        },
                      },
                    }
                  : content
              ),
            }
          : section
      )
    );
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <div style={{ gap: 10 }} className="d-flex align-items-center">
        <SelectOptions
          label="Posisi Gambar"
          options={imagePositionOptions}
          onChange={(selectedOption) => {
            setImagePosition(selectedOption);
            handleChangeVariantStyle("imagePosition", selectedOption.value);
          }}
          value={imagePosition}
          width="50"
        />

        <SelectOptions
          label="Bayangan"
          options={shadowOptions}
          onChange={(selectedOption) => {
            setShadow(selectedOption);
            handleChangeVariantStyle("shadow", selectedOption.value);
          }}
          value={shadow}
          width="50"
        />
      </div>

      <InputRangeWithNumber
        label="Ukuran Gambar"
        value={width}
        onChange={(newValue) => {
          setWidth(newValue);
          handleChangeVariantStyle("width", newValue);
        }}
        min={0}
        max={90}
        onBlur={() => handleSetValueWhenBlurWrapperStyle(width, 0, 90, "width")}
      />

      {selectedVariant.group === "Page" && (
        <InputRangeWithNumber
          label="Melingkar"
          value={rounded}
          onChange={(newValue) => {
            setRounded(newValue);
            handleChangeVariantStyle("rounded", newValue);
          }}
          min={0}
          max={100}
          onBlur={() =>
            handleSetValueWhenBlurWrapperStyle(rounded, 0, 100, "rounded")
          }
        />
      )}

      <InputRangeWithNumber
        label="Jarak"
        value={distance}
        onChange={(newValue) => {
          setDistance(newValue);
          handleChangeVariantStyle("distance", newValue);
        }}
        min={0}
        max={100}
        onBlur={() =>
          handleSetValueWhenBlurWrapperStyle(distance, 0, 100, "distance")
        }
      />

      <InputRangeWithNumber
        label="Rotasi"
        value={rotation}
        onChange={(newValue) => {
          setRotation(newValue);
          handleChangeVariantStyle("rotation", newValue);
        }}
        min={-90}
        max={90}
        onBlur={() =>
          handleSetValueWhenBlurWrapperStyle(rotation, -90, 90, "rotation")
        }
      />
    </div>
  );
};

export default Page;
