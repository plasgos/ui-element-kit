import React, { useCallback, useEffect, useState } from "react";
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

import { IoAdd } from "react-icons/io5";
import { createUniqueID } from "../../../../../lib/unique-id";
import SelectOptions from "../../common/SelectOptions";
import { FaStar } from "react-icons/fa6";
import profilePicture from "../../../../../assets/profile.jpg";
import AddTestimony from "./AddTestimony";
import EditTestimony from "./EditTestimony";
import DesignTab from "./DesignTab";
import { columnTestimonyOptions } from "../../SelectOptions";
import AddShape from "./AddShape";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";
import EditShape from "./EditShape";
import BackgroundTab from "./BackgroundTab";
import { DraggableList } from "../../common/DraggableList";

const contents = [
  {
    id: "testi-1",
    name: "John Smith",
    image: profilePicture,
    content: "Super bagus sekali barangnya",
  },
  {
    id: "testi-2",
    name: "Mozart",
    image: profilePicture,
    content: "Senang sekali memakai produk ini",
  },
  {
    id: "testi-3",
    name: "Alexander the Great",
    image: profilePicture,
    content: "Pasti akan beli lagi",
  },
];

const ListTestimonyControl = ({
  previewSection,
  setPreviewSection,
  isShowContent,
}) => {
  const [isAddContent, setIsAddContent] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddShape, setIsAddShape] = useState(false);
  const [isEditingShape, setIsEditingShape] = useState(false);
  const [selectedSection, setSelectedSection] = useState({});
  const [selectedSectionShape, setSelectedSectionShape] = useState({});
  const [sectionBeforeEdit, setSectionBeforeEdit] = useState([]);
  const [activeTab, setActiveTab] = useState("konten");

  const [selectedColumnTestimony, setSelectedColumnTestimony] = useState(
    columnTestimonyOptions[2]
  );

  const [setting, setSetting] = useState({});

  const [paddingTop, setPaddingTop] = useState(0);
  const [paddingBottom, setPaddingBottom] = useState(0);

  const handleChangeColumnTestimony = (selectedOptionValue) => {
    setSelectedColumnTestimony(selectedOptionValue);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === setting.id
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                column: selectedOptionValue.value,
              },
            }
          : item
      )
    );
  };

  const handelCancel = () => {
    if (isAddContent) {
      setIsAddContent(false);
      setIsEditing(false);
      setPreviewSection((prevSections) =>
        prevSections.map((section) =>
          section.id === setting.id
            ? {
                ...section,
                content: section.content.slice(0, -1),
              }
            : section
        )
      );
      setActiveTab("konten");
    } else if (isAddShape) {
      setIsAddShape(false);
      setIsEditingShape(false);
      setPreviewSection((prevSections) =>
        prevSections.map((section) =>
          section.id === setting.id
            ? {
                ...section,
                shape: section.shape.slice(0, -1),
              }
            : section
        )
      );
      setActiveTab("tirai");
    } else if (isEditing) {
      setPreviewSection([...sectionBeforeEdit]);
      setIsAddContent(false);
      setIsEditing(false);
      setActiveTab("konten");
    } else if (isEditingShape) {
      setPreviewSection([...sectionBeforeEdit]);
      setIsAddShape(false);
      setIsEditingShape(false);
      setActiveTab("tirai");
    } else {
      setIsAddContent(false);
      setActiveTab("konten");
      isShowContent(false);
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => section.id !== setting.id)
      );
    }
  };

  const handelConfirm = () => {
    if (isAddContent || isEditing) {
      setIsAddContent(false);
      setIsEditing(false);
      setActiveTab("konten");
    } else if (isAddShape || isEditingShape) {
      setIsAddShape(false);
      setIsEditingShape(false);
      setActiveTab("tirai");
    } else {
      isShowContent(false);
    }
  };

  const handleAddContent = () => {
    setIsAddContent(true);
  };

  const moveSection = useCallback(
    (dragIndex, hoverIndex) => {
      setPreviewSection((prevSections) => {
        return prevSections.map((section) => {
          if (section.name === "testimony") {
            const updatedContent = [...section.content];
            const draggedItem = updatedContent[dragIndex];
            updatedContent.splice(dragIndex, 1);
            updatedContent.splice(hoverIndex, 0, draggedItem);
            return { ...section, content: updatedContent };
          }
          return section;
        });
      });

      return () => {};
    },
    [setPreviewSection]
  );

  const moveSectionShape = useCallback(
    (dragIndex, hoverIndex) => {
      setPreviewSection((prevSections) => {
        return prevSections.map((section) => {
          if (section.name === "testimony") {
            const updatedContent = [...section.shape];
            const draggedItem = updatedContent[dragIndex];
            updatedContent.splice(dragIndex, 1);
            updatedContent.splice(hoverIndex, 0, draggedItem);
            return { ...section, shape: updatedContent };
          }
          return section;
        });
      });

      return () => {};
    },
    [setPreviewSection]
  );

  const onAddContent = () => {
    let uniqueId = createUniqueID(previewSection);

    let payload = {
      id: uniqueId,
      name: "testimony",
      title: "Testimoni / Review",
      content: contents,
      shape: [],
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
      cardStyle: {
        bgColor: "#FFFFFF",
        starColor: "#FDD835",
        borderColor: "#EEEEEE",
        shadowCard: "tw-shadow",
      },
      profileStyle: {
        colorName: "#000000",
        fontSizeName: 18,
        fontStyle: "tw-font-semibold tw-italic",
        distanceName: 8,
        shadowImageName: "tw-shadow",
        borderPictColor: "#BDBDBD",
        imageSize: 40,
        borderRadiusImage: 70,
        borderWidthImage: 1,
      },
      contentStyle: {
        textAlign: "tw-text-left",
        fontSize: "tw-text-sm",
        distanceContent: 16,
      },
      starStyle: {
        icon: <FaStar />,
        amount: 5,
        size: 18,
        marginX: 4,
        margin: 6,
        position: "bottom-name",
      },
      wrapperStyle: {
        jusctifyContent: "tw-justify-center",
        flexDirection: "tw-flex-row",
        layout: "1",
        column: "tw-w-1/3",
        paddingX: 8,
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: 12,
        borderWidth: 2,
      },
    };

    setPreviewSection((prevSections) => [...prevSections, payload]);

    setSetting(payload);
  };

  useEffect(() => {
    onAddContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editSection = useCallback(
    (section) => {
      setSectionBeforeEdit([...previewSection]);
      setSelectedSection(section);
      setIsEditing(true);
    },
    [previewSection]
  );

  const editSectionShape = useCallback(
    (section) => {
      setSectionBeforeEdit([...previewSection]);
      setSelectedSectionShape(section);
      setIsEditingShape(true);
    },
    [previewSection]
  );

  const removeSection = useCallback(
    (sectionId, contentIndex) => {
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              content: section.content.filter((_, i) => i !== contentIndex),
            };
          }
          return section;
        })
      );
    },
    [setPreviewSection]
  );

  const removeSectionShape = useCallback(
    (sectionId, contentIndex) => {
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              shape: section.shape.filter((_, i) => i !== contentIndex),
            };
          }
          return section;
        })
      );
    },
    [setPreviewSection]
  );

  const renderSection = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section.content.map((contentItem, contentIndex) => (
            <DraggableList
              key={contentItem.id || contentIndex}
              index={contentIndex}
              id={contentItem.id}
              showInfoText={contentItem.name}
              moveSection={moveSection}
              editSection={() => editSection(contentItem)}
              removeSection={() => removeSection(section.id, contentIndex)}
            />
          ))}
        </div>
      );
    },
    [moveSection, editSection, removeSection]
  );

  const renderSectionShape = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section.shape.map((contentItem, contentIndex) => (
            <DraggableList
              key={contentItem.id || contentIndex}
              index={contentIndex}
              id={contentItem.id}
              showInfoText={`Tirai ${contentItem.position?.label}`}
              moveSection={moveSectionShape}
              editSection={() => editSectionShape(contentItem)}
              removeSection={() => removeSectionShape(section.id, contentIndex)}
            />
          ))}
        </div>
      );
    },
    [editSectionShape, moveSectionShape, removeSectionShape]
  );

  const handleUpdateSectionWrapperStyle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === setting.id
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                [key]: value,
              },
            }
          : item
      )
    );
  };

  const handleSetValueWhenBlurWrapperStyle = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "paddingTop") {
      setPaddingTop(newValue);
    } else if (key === "paddingBottom") {
      setPaddingBottom(newValue);
    }
    handleUpdateSectionWrapperStyle(key, newValue);
  };

  return (
    <div>
      <CRow>
        <CCol>
          <div style={{ height: 400 }}>
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

            {isAddContent ? (
              <CTabs>
                <CTabContent
                  style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
                  className="pt-3"
                >
                  <AddTestimony
                    idSection={setting.id}
                    sections={contents}
                    setPreviewSection={setPreviewSection}
                  />
                </CTabContent>
              </CTabs>
            ) : isEditing ? (
              <CTabs>
                <CTabContent
                  style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
                  className="pt-3"
                >
                  <EditTestimony
                    idSection={setting.id}
                    selectedSectionToEdit={selectedSection}
                    setPreviewSection={setPreviewSection}
                  />
                </CTabContent>
              </CTabs>
            ) : isAddShape ? (
              <CTabs>
                <CTabContent
                  style={{
                    height: 340,
                    paddingRight: 5,
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                  className="pt-3"
                >
                  <AddShape
                    idSection={setting.id}
                    exitingShape={[]}
                    setPreviewSection={setPreviewSection}
                  />
                </CTabContent>
              </CTabs>
            ) : isEditingShape ? (
              <CTabs>
                <CTabContent
                  style={{
                    height: 340,
                    paddingRight: 5,
                    overflowY: "auto",
                  }}
                  className="pt-3"
                >
                  <EditShape
                    idSection={setting.id}
                    selectedSectionToEdit={selectedSectionShape}
                    setPreviewSection={setPreviewSection}
                  />
                </CTabContent>
              </CTabs>
            ) : (
              <CTabs activeTab={activeTab}>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="konten">Konten</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="desain">Desain</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="tirai">Tirai</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="wadah">Wadah</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent
                  style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
                  className="pt-3"
                >
                  <CTabPane className="p-1" data-tab="konten">
                    {!isAddContent && !isEditing && (
                      <>
                        <div
                          style={{ gap: 10 }}
                          className="d-flex align-items-center "
                        >
                          <SelectOptions
                            label="Kolom"
                            options={columnTestimonyOptions}
                            onChange={handleChangeColumnTestimony}
                            value={selectedColumnTestimony}
                            width="50"
                          />
                        </div>
                        <div>
                          {previewSection
                            .filter((section) => section.id === setting.id)
                            .map((section, i) => renderSection(section, i))}
                        </div>
                        <CCard
                          style={{ cursor: "pointer" }}
                          onClick={handleAddContent}
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
                    {Object.keys(setting).length > 0 ? (
                      <DesignTab
                        currentSection={setting}
                        setPreviewSection={setPreviewSection}
                        selectedColum={selectedColumnTestimony}
                        setSelectedColum={(value) =>
                          setSelectedColumnTestimony(value)
                        }
                        paddingTop={paddingTop}
                        setPaddingTop={(value) => setPaddingTop(value)}
                        paddingBottom={paddingBottom}
                        setPaddingBottom={(value) => setPaddingBottom(value)}
                      />
                    ) : (
                      <div>Loading...</div>
                    )}
                  </CTabPane>

                  <CTabPane
                    style={{ overflowX: "hidden" }}
                    className="p-1"
                    data-tab="tirai"
                  >
                    <div>
                      <InputRangeWithNumber
                        label="Ruang Pengisi Atas"
                        value={paddingTop}
                        onChange={(newValue) => {
                          setPaddingTop(newValue);
                          handleUpdateSectionWrapperStyle(
                            "paddingTop",
                            newValue
                          );
                        }}
                        min={0}
                        max={120}
                        onBlur={() =>
                          handleSetValueWhenBlurWrapperStyle(
                            paddingTop,
                            0,
                            120,
                            "paddingTop"
                          )
                        }
                      />
                      <InputRangeWithNumber
                        label="Ruang Pengisi Bawah"
                        value={paddingBottom}
                        onChange={(newValue) => {
                          setPaddingBottom(newValue);
                          handleUpdateSectionWrapperStyle(
                            "paddingBottom",
                            newValue
                          );
                        }}
                        min={0}
                        max={120}
                        onBlur={() =>
                          handleSetValueWhenBlurWrapperStyle(
                            paddingBottom,
                            0,
                            120,
                            "paddingBottom"
                          )
                        }
                      />
                    </div>

                    <div>
                      {!isAddShape && !isEditingShape && (
                        <>
                          <div>
                            {previewSection
                              .filter((section) => section.id === setting.id)
                              .map((section, i) =>
                                renderSectionShape(section, i)
                              )}
                          </div>

                          <CCard
                            style={{ cursor: "pointer" }}
                            onClick={() => setIsAddShape(true)}
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
                    </div>
                  </CTabPane>

                  <CTabPane
                    style={{ overflowX: "hidden", height: "100%" }}
                    className="p-1"
                    data-tab="wadah"
                  >
                    <BackgroundTab
                      currentSection={setting}
                      setPreviewSection={setPreviewSection}
                      type="add"
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

export default ListTestimonyControl;
