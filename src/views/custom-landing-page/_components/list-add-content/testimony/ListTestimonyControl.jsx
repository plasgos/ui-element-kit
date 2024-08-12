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
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import { TestimonyList } from "./TestimonyList";
import { FaStar } from "react-icons/fa6";
import profilePicture from "../../../../../assets/profile.jpg";
import AddTestimony from "./AddTestimony";
import EditTestimony from "./EditTestimony";
import DesignTab from "./DesignTab";
import { columnTestimonyOptions } from "../../SelectOptions";

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
    content: "Senang sekali memakai produk in",
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
  const [selectedSection, setSelectedSection] = useState({});
  const [sectionBeforeEdit, setSectionBeforeEdit] = useState([]);

  const [selectedColumnTestimony, setSelectedColumnTestimony] = useState(
    columnTestimonyOptions[2]
  );

  const [setting, setSetting] = useState({});

  const handleChangeColumnTestimony = (selectedOptionValue) => {
    setSelectedColumnTestimony(selectedOptionValue);
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
    } else if (isEditing) {
      setPreviewSection([...sectionBeforeEdit]);
      setIsAddContent(false);
      setIsEditing(false);
    } else {
      setIsAddContent(false);
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

  const onAddContent = () => {
    let uniqueId = createUniqueID(previewSection);

    let payload = {
      id: uniqueId,
      name: "testimony",
      title: "Testimoni / Review",
      icon: <BsFillChatSquareQuoteFill size={20} />,
      content: contents,
      cardStyle: {
        bgColor: "#FFFFFF",
        starColor: "#FDD835",
        borderColor: "#EEEEEE",
        shadowCard: "tw-shadow",
      },
      profileStyle: {
        colorName: "",
        fontSizeName: 18,
        paddingBottomName: 8,
        shadowImageName: "tw-shadow",
        borderPictColor: "#BDBDBD",
        imageSize: 80,
        borderRadius: 70,
        borderWidth: 1,
      },
      contentStyle: {
        textAlign: "center",
        fontSize: 14,
        paddingBottom: 16,
      },
      startStyle: {
        icon: <FaStar />,
        amount: 5,
        starColor: "#FDD835",
        size: 18,
        marginX: 4,
        margin: 0,
        position: "top-name",
      },
      wrapperStyle: {
        jusctifyContent: "tw-justify-center",
        flexDirection: "tw-flex-row",
        layout: "8",
        column: "tw-w-1/3",
        paddingX: 8,
        paddingTop: 4,
        padingBotom: 0,
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

  const renderSection = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section.content.map((contentItem, contentIndex) => (
            <TestimonyList
              key={contentItem.id || contentIndex}
              index={contentIndex}
              id={contentItem.id}
              section={contentItem}
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
            ) : (
              <CTabs activeTab="konten">
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="konten">Konten</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="desain">Desain</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent
                  style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
                  className="pt-3"
                >
                  <CTabPane className="p-1" data-tab="konten">
                    {isAddContent && (
                      <AddTestimony
                        idSection={setting.id}
                        sections={contents}
                        setPreviewSection={setPreviewSection}
                      />
                    )}

                    {/* {isEditing && (
                    <EditButton
                      idSection={setting.id}
                      selectedSectionToEdit={selectedSection}
                      setPreviewSection={setPreviewSection}
                    />
                  )} */}

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
                  <CTabPane className="p-1" data-tab="desain">
                    {Object.keys(setting).length > 0 ? (
                      <DesignTab
                        currentSection={setting}
                        setPreviewSection={setPreviewSection}
                      />
                    ) : (
                      <div>Loading...</div>
                    )}
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
