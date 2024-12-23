import { CButton, CTabContent, CTabPane, CTabs } from "@coreui/react";
import React, { useEffect, useState } from "react";

import { createUniqueID } from "../../../../../lib/unique-id";

import BackgroundTab from "../../common/BackgroundTab";
import SelectVariant from "../../common/SelectVariant";
import UpdateContent from "./UpdateContent";

import handPointing from "../../../../../assets/pointing-down.png";
import Confirmation from "../../common/Confirmation";
import NavTabsCustom from "../../common/NavTabsCustom";

const optionVariant = [
  {
    group: "Panah",
    options: [{ id: "1", value: "arrow", label: "Panah" }],
  },
  {
    group: "Gambar",
    options: [{ id: "2", value: "image", label: "Gambar" }],
  },
];
const flattenedOptions = optionVariant.flatMap((group) =>
  group.options.map((option) => ({
    ...option,
    group: group.group,
  }))
);

const ArrowMoved = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
  isMultiColumn,
}) => {
  const [isSelectVariant, setIsSelectVariant] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(
    flattenedOptions.find(
      (option) => option.value === currentSection?.variant
    ) || flattenedOptions[0]
  );
  const [currentVariant, setCurrentVariant] = useState({});
  const [setting, setSetting] = useState({});
  const [selectedCurrentSection, setSelectedCurrentSection] = useState({});

  useEffect(() => {
    const section = previewSection.find((section) => section.id === setting.id);

    if (section) {
      setSelectedCurrentSection(section);
    }
  }, [previewSection, setting.id]);

  const handleCancel = () => {
    if (isSelectVariant) {
      setSelectedVariant(currentVariant);

      const style = styleMap[currentVariant.id] || {};

      setIsSelectVariant(false);

      setPreviewSection((arr) =>
        arr.map((item) => {
          const contentIdToCheck = isEditingSection
            ? currentSection.id
            : setting.id;

          return String(item.id) === contentIdToCheck
            ? {
                ...item,
                variant: currentVariant.value,
                wrapperStyle: {
                  ...item.wrapperStyle,
                  ...style,
                },
              }
            : item;
        })
      );
    } else if (!isEditingSection) {
      isShowContent(false);
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => {
          const contentIdToCheck = isEditingSection
            ? currentSection.id
            : setting.id;

          return section.id !== contentIdToCheck;
        })
      );
    } else if (isEditingSection) {
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      isShowContent(false);
    }
  };

  const handleConfirm = () => {
    if (isSelectVariant) {
      setIsSelectVariant(false);
    } else {
      isShowContent(false);
    }
  };

  const onAddContent = () => {
    let uniqueId = createUniqueID(previewSection);

    const id = isMultiColumn
      ? `multi-column-${uniqueId}`
      : `parent-${uniqueId}`;

    let payload = {
      id,
      name: "arrow-moved",
      title: "Panah Bergerak",
      content: {},
      wrapperStyle: {
        outlineColor: "#000000",
        fillColor: "#FF0000",
        position: "bottom",
        ammount: 3,
        rotation: 20,
        borderWidth: 4,
        distanceX: 10,
        distanceY: -25,
        size: 80,
        image: handPointing,
      },
      variant: "arrow",
      background: {
        bgType: undefined,
        bgColor: "",
        bgImage: "",
        blur: 0,
        opacity: 0,
        paddingY: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingType: "equal",
        direction: "to right",
        fromColor: "",
        toColor: "",
        isRevert: false,
        pattern: "",
      },
    };

    setPreviewSection((prevSections) => [...prevSections, payload]);
    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditingSection) {
      onAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

  const openVariants = () => {
    setIsSelectVariant(true);
    setCurrentVariant(selectedVariant);
  };

  const styleMap = {
    1: {
      image: handPointing,
    },
    2: {
      image: handPointing,
    },
  };

  const handleVariantChange = (group, option) => {
    const style = styleMap[option.id] || {};

    setSelectedVariant({ ...option, group });
    setPreviewSection((arr) =>
      arr.map((item) => {
        const contentIdToCheck = isEditingSection
          ? currentSection.id
          : setting.id;

        return String(item.id) === contentIdToCheck
          ? {
              ...item,
              variant: option.value,
              wrapperStyle: {
                ...item.wrapperStyle,
                ...style,
              },
            }
          : item;
      })
    );

    if (!isEditingSection) {
      setSelectedCurrentSection((prev) => ({
        ...prev,
        variant: option.value,
        wrapperStyle: {
          ...prev.wrapperStyle,
          ...style,
        },
      }));
    }
  };

  const tabsData = [
    { value: "image", label: "Gambar" },
    { value: "background", label: "Background" },
  ];

  return (
    <div>
      <Confirmation handleCancel={handleCancel} handleConfirm={handleConfirm} />

      {isSelectVariant ? (
        <SelectVariant
          optionVariant={optionVariant}
          selectedVariant={selectedVariant}
          onChangeVariant={handleVariantChange}
        />
      ) : (
        <CTabs activeTab="image">
          <NavTabsCustom tabs={tabsData} />

          <CTabContent
            style={{ overflowY: "auto", height: "calc(100vh - 110px)" }}
            className="p-3"
          >
            <CTabPane className="p-1" data-tab="image">
              <div
                style={{
                  boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.1)",
                }}
                className="mb-3 border-bottom pb-3"
              >
                <div style={{ fontSize: 12 }} className="mb-2">
                  Desain
                </div>
                <div className="d-flex align-items-center">
                  <div className="mr-3">{selectedVariant.label}</div>
                  <CButton onClick={openVariants} color="primary">
                    Ubah
                  </CButton>
                </div>
              </div>

              <UpdateContent
                setPreviewSection={setPreviewSection}
                currentSection={
                  isEditingSection ? currentSection : selectedCurrentSection
                }
              />
            </CTabPane>

            <CTabPane className="p-1" data-tab="background">
              <BackgroundTab
                currentSection={isEditingSection ? currentSection : setting}
                setPreviewSection={setPreviewSection}
                type={isEditingSection ? "edit" : "add"}
              />
            </CTabPane>
          </CTabContent>
        </CTabs>
      )}
    </div>
  );
};

export default ArrowMoved;
