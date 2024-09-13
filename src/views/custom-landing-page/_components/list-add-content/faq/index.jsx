import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import React, { useCallback, useEffect, useState } from "react";
import BackgroundTab from "../../common/BackgroundTab";
import { IoAdd } from "react-icons/io5";
import { DraggableList } from "../../common/DraggableList";
import { createUniqueID } from "../../../../../lib/unique-id";
import { useMoveSection } from "../../../../../hooks/useMoveSection";
import { useRemoveSection } from "../../../../../hooks/useRemoveSection";
import SelectVariant from "../../common/SelectVariant";
import UpdateContent from "./UpdateContent";
import DesignTab from "./DesignTab";

const initialContents = [
  {
    id: "faq-1",
    title: "Kenyamanan adalah penjara kebebasan dan hambatan untuk berkembang",
    desc: "Jangan biarkan dirimu terlena pada nikmatnya kenyamanan! Mulailah lagi berkarya hari ini karena kamu tidak tahu siapa yang akan mengalahkanmu esok hari.",
  },
  {
    id: "faq-2",
    title: "Fokus Pada Masa Depan",
    desc: "Tanpa pernah kamu sadari, hidup berubah dengan cepat secepat kamu mengedipkan mata. Tanpa kamu sadari, ada waktu yang kamu gunakan dengan baik dan waktu yang kamu sia-siakan.",
  },
  {
    id: "faq-3",
    title: "Rahasia untuk maju adalah memulai",
    desc: "Kamu tidak akan pernah sukses jika kamu hanya duduk dan berangan-angan untuk sukses. Bangkitlah dari tempat dudukmu dan mulailah lakukan sesuatu!",
  },
  {
    id: "faq-4",
    title: "Kita lebih menikmati proses ketimbang hasilnya",
    desc: "Dalam hidup, kamu pasti menuntut hasil yang terbaik nan membanggakan. Hidup bukan hanya terletak pada hasil yang kamu terima, tapi hidup adalah sikap kamu terhadap semua proses kehidupan.",
  },
];

const optionVariant = [
  { group: "Plain", options: [{ id: "1", value: "simple", label: "Simple" }] },
  { group: "Kapsul", options: [{ id: "2", value: "simple", label: "Simple" }] },
  {
    group: "Buka / Tutup",
    options: [
      { id: "3", value: "thick", label: "Thick" },
      { id: "4", value: "clean", label: "Clean" },
    ],
  },
];

const flattenedOptions = optionVariant.flatMap((group) =>
  group.options.map((option) => ({
    ...option,
    group: group.group,
  }))
);

//styles template
const plainSimple = {
  colorTitle: "#424242",
  colorContent: "#757575",
  maxColumn: "tw-w-1/2",
  fontSize: 21,
};

const capsuleSimple = {
  colorTitle: "#424242",
  colorContent: "#757575",
  bgColor: "#ffffff",
  borderColor: "rgba(255,255,255,0)",
  maxColumn: "tw-w-1/2",
  shadow: "tw-shadow-md",
  fontSize: 21,
  rounded: 12,
};

const accordionThick = {
  colorTitle: "#424242",
  colorContent: "#424242",
  bgColor: "#F5F5F5",
  borderColor: "#757575",
  iconColor: "#424242",
  dividerColor: "#9E9E9E",
  bgContent: "#F5F5F5",
  shadow: "tw-shadow-md",
  fontSize: 18,
  distance: 18,
  borderWidth: 2,
  icon: "plus",
  isIconOnRight: true,
  iconSize: 18,
};

const accordionClean = {
  colorTitle: "#424242",
  colorContent: "#424242",
  bgColor: "#F5F5F5",
  borderColor: "#757575",
  iconColor: "#424242",
  dividerColor: "#9E9E9E",
  bgContent: "#F5F5F5",
  shadow: "tw-shadow",
  fontSize: 18,
  distance: 18,
  borderWidth: 1,
  icon: "plus",
  isIconOnRight: true,
  iconSize: 16,
};

const FAQ = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
}) => {
  const [activeTab, setActiveTab] = useState("faqs");
  const [isAddContent, setIsAddContent] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [isSelectVariant, setIsSelectVariant] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(
    flattenedOptions.find(
      (option) => option.id === currentSection?.variant?.id
    ) || flattenedOptions[2]
  );
  const [selectedContent, setSelectedContent] = useState({});
  const [currentContentBeforeEdit, setCurrentContentBeforeEdit] = useState([]);
  const [setting, setSetting] = useState({});
  const [iconBeforeEdit, setIconBeforeEdit] = useState([]);
  const [previousIcon, setPreviousIcon] = useState("");
  const [isListIconVisible, setIsListIconVisible] = useState(false);

  const [currentVariant, setCurrentVariant] = useState({});
  const [imageUrl, setImageUrl] = useState(
    currentSection?.variant?.style?.image || ""
  );
  const [icon, setIcon] = useState(
    currentSection?.variant?.style?.icon || {
      prefix: "fas",
      iconName: "plus",
    }
  );
  const editSection = useCallback(
    (section) => {
      setCurrentContentBeforeEdit([...previewSection]);
      setSelectedContent(section);
      setIsEditingContent(true);
    },
    [previewSection]
  );

  const removeSection = useRemoveSection(setPreviewSection);
  const moveSection = useMoveSection(setPreviewSection);

  const renderSection = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section.content.map((contentItem, contentIndex) => (
            <DraggableList
              key={contentItem.id || contentIndex}
              index={contentIndex}
              id={contentItem.id}
              showInfoText={contentItem.title}
              moveSection={(dragIndex, hoverIndex) =>
                moveSection(section.name, dragIndex, hoverIndex)
              }
              editSection={() => editSection(contentItem)}
              removeSection={() => removeSection(section.id, contentIndex)}
            />
          ))}
        </div>
      );
    },
    [moveSection, editSection, removeSection]
  );

  const handleCancel = () => {
    if (isAddContent) {
      setIsAddContent(false);
      setIsEditingContent(false);
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          const contentIdToCheck = isEditingSection
            ? currentSection.id
            : setting.id;

          return section.id === contentIdToCheck
            ? {
                ...section,
                content: section.content.slice(0, -1),
              }
            : section;
        })
      );
    } else if (isSelectVariant) {
      setSelectedVariant(currentVariant);

      const style =
        currentVariant.id === "1"
          ? plainSimple
          : currentVariant.id === "2"
          ? capsuleSimple
          : currentVariant.id === "3"
          ? accordionThick
          : currentVariant.id === "4"
          ? accordionClean
          : {};

      setPreviewSection((arr) =>
        arr.map((item) => {
          const contentIdToCheck = isEditingSection
            ? currentSection.id
            : setting.id;

          return String(item.id) === contentIdToCheck
            ? {
                ...item,
                variant: {
                  ...currentVariant,
                  style,
                },
              }
            : item;
        })
      );
      setIsSelectVariant(false);
      setIsAddContent(false);
      setIsEditingContent(false);
    } else if (isListIconVisible) {
      setIsListIconVisible(false);
      if (imageUrl) {
        setIcon(null);
      } else {
        setIcon(previousIcon);
      }
      setPreviewSection([...iconBeforeEdit]);
    } else if (isEditingContent) {
      setPreviewSection([...currentContentBeforeEdit]);
      setIsAddContent(false);
      setIsEditingContent(false);
    } else if (isEditingSection) {
      setIsAddContent(false);
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      setIsAddContent(false);
      isShowContent(false);
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => section.id !== setting.id)
      );
    }
  };

  const handleConfirm = () => {
    if (
      isAddContent ||
      isEditingContent ||
      isSelectVariant ||
      isListIconVisible
    ) {
      setIsAddContent(false);
      setIsEditingContent(false);
      setIsSelectVariant(false);
      setIsListIconVisible(false);
    } else {
      isShowContent(false);
    }
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "faq",
      title: "FAQ Buka/Tutup",
      content: initialContents,
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
      },
      variant: {
        id: "3",
        group: "Buka / Tutup",
        name: "thick",
        style: {
          colorTitle: "#424242",
          colorContent: "#424242",
          bgColor: "#F5F5F5",
          borderColor: "#757575",
          iconColor: "#424242",
          dividerColor: "#9E9E9E",
          bgContent: "#F5F5F5",
          shadow: "tw-shadow-md",
          fontSize: 18,
          distance: 18,
          borderWidth: 2,
          icon: "plus",
          image: "",
          isIconOnRight: true,
          iconSize: 18,
        },
      },
    };

    setPreviewSection((prevSections) => [...prevSections, payload]);
    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditingSection) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

  const openVariants = () => {
    setIsSelectVariant(true);
    setCurrentVariant(selectedVariant);
  };

  const handleVariantChange = (group, option) => {
    const style =
      option.id === "1"
        ? plainSimple
        : option.id === "2"
        ? capsuleSimple
        : option.id === "3"
        ? accordionThick
        : option.id === "4"
        ? accordionClean
        : {};

    setSelectedVariant({ ...option, group });
    setPreviewSection((arr) =>
      arr.map((item) => {
        const contentIdToCheck = isEditingSection
          ? currentSection.id
          : setting.id;

        return String(item.id) === contentIdToCheck
          ? {
              ...item,
              variant: {
                ...item.variant,
                group,
                id: option.id,
                name: option.value,
                style,
              },
            }
          : item;
      })
    );

    if (!isEditingSection) {
      setSetting((prev) => ({
        ...prev,
        variant: {
          ...prev.variant,
          group,
          id: option.id,
          name: option.value,
          style,
        },
      }));
    }
  };

  return (
    <div>
      <CRow>
        <CCol>
          <div style={{ height: 400 }}>
            <div className="d-flex justify-content-end align-items-center border-bottom p-2">
              <div>
                <CButton
                  onClick={handleCancel}
                  color="primary"
                  variant="outline"
                  className="mx-2"
                >
                  Batal
                </CButton>

                <CButton onClick={handleConfirm} color="primary">
                  Selesai
                </CButton>
              </div>
            </div>

            {isAddContent ? (
              <CTabs>
                <CTabContent
                  style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
                  className="pt-3"
                >
                  <UpdateContent
                    idSection={
                      isEditingSection ? currentSection.id : setting.id
                    }
                    currentContent={initialContents}
                    setPreviewSection={setPreviewSection}
                  />
                </CTabContent>
              </CTabs>
            ) : isEditingContent ? (
              <CTabs>
                <CTabContent
                  style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
                  className="pt-3"
                >
                  <UpdateContent
                    idSection={
                      isEditingSection ? currentSection.id : setting.id
                    }
                    currentContent={selectedContent}
                    setPreviewSection={setPreviewSection}
                    isEditingContent={true}
                  />
                </CTabContent>
              </CTabs>
            ) : isSelectVariant ? (
              <SelectVariant
                optionVariant={optionVariant}
                selectedVariant={selectedVariant}
                onChangeVariant={handleVariantChange}
              />
            ) : (
              <CTabs activeTab={activeTab}>
                <CNav variant="tabs">
                  <CNavItem onClick={() => setActiveTab("faqs")}>
                    <CNavLink data-tab="faqs">Konten</CNavLink>
                  </CNavItem>
                  <CNavItem onClick={() => setActiveTab("desain")}>
                    <CNavLink data-tab="desain">Desain</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="background">Background</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent
                  style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
                  className="pt-3"
                >
                  <CTabPane className="p-1" data-tab="faqs">
                    {!isAddContent && !isEditingContent && (
                      <>
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
                            <div className="mr-3">{selectedVariant.group}</div>
                            <CButton onClick={openVariants} color="primary">
                              Ubah
                            </CButton>
                          </div>
                        </div>

                        <div>
                          {previewSection
                            .filter((section) =>
                              isEditingSection
                                ? section.id === currentSection.id
                                : section.id === setting.id
                            )
                            .map((section, i) => renderSection(section, i))}
                        </div>
                        <CCard
                          style={{ cursor: "pointer" }}
                          onClick={() => setIsAddContent(true)}
                        >
                          <CCardBody className="p-1">
                            <div className="d-flex align-items-center ">
                              <IoAdd
                                style={{
                                  cursor: "pointer",
                                  margin: "0px 10px 0px 6px",
                                }}
                                size={18}
                              />

                              <div>Tambah Konten</div>
                            </div>
                          </CCardBody>
                        </CCard>
                      </>
                    )}
                  </CTabPane>
                  <CTabPane
                    style={{ overflowX: "hidden" }}
                    className="p-1"
                    data-tab="desain"
                  >
                    {!isListIconVisible && (
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
                          <div className="mr-3">{selectedVariant.group}</div>
                          <CButton
                            onClick={() => setIsSelectVariant(true)}
                            color="primary"
                          >
                            Ubah
                          </CButton>
                        </div>
                      </div>
                    )}
                    {Object.keys(isEditingSection ? currentSection : setting)
                      .length > 0 ? (
                      <DesignTab
                        previewSection={previewSection}
                        currentSection={
                          isEditingSection ? currentSection : setting
                        }
                        setPreviewSection={setPreviewSection}
                        isEditingSection={isEditingSection}
                        variant={selectedVariant.id}
                        setIconBeforeEdit={(value) => setIconBeforeEdit(value)}
                        isListIconVisible={isListIconVisible}
                        setIsListIconVisible={setIsListIconVisible}
                        imageUrl={imageUrl}
                        setImageUrl={setImageUrl}
                        icon={icon}
                        setIcon={setIcon}
                        setPreviousIcon={setPreviousIcon}
                      />
                    ) : (
                      <div>Loading...</div>
                    )}
                  </CTabPane>

                  <CTabPane
                    style={{ overflowX: "hidden", height: "100%" }}
                    className="p-1"
                    data-tab="background"
                  >
                    <BackgroundTab
                      currentSection={
                        isEditingSection ? currentSection : setting
                      }
                      setPreviewSection={setPreviewSection}
                      type={isEditingSection ? "edit" : "add"}
                    />
                  </CTabPane>
                </CTabContent>
              </CTabs>
            )}
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default FAQ;
