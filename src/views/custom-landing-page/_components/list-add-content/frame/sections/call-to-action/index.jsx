import {
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import BackgroundTabFrame from "../../common/BackgroundTabFrame";
import { addNewSection } from "../../helper/addNewSection";
import { cancelNewSection } from "../../helper/cancelNewSection";
import UpdateContent from "./UpdateContent";

const CallToAction = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
  sectionId,
}) => {
  const [setting, setSetting] = useState({});

  const [selectedCurrentSection, setSelectedCurrentSection] = useState({});

  useEffect(() => {
    if (!isEditingSection) {
      let section = previewSection.find((section) => section.id === sectionId);

      if (section) {
        let sectionFrame = section.content.find(
          (sectionItem) => sectionItem.id === setting.id
        );

        if (sectionFrame) {
          setSelectedCurrentSection(sectionFrame);
        }
      }
    }
  }, [previewSection, setting.id, isEditingSection, sectionId]);

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "call-to-action",
      title: "Call To Action",
      content: [
        {
          id: createUniqueID([]),
          textButton: "Start Free Trial",
          isGhostVariant: false,
          textColorButton: "#ffffff",
          buttonColor: "#2196F3",
          textColor: "#000000",
          text: "Signup for free trial now!",
          fontSize: "tw-text-base",
          align: "tw-justify-center",
          target: {},
        },
      ],
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

    addNewSection(setPreviewSection, sectionId, payload);
    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditingSection) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

  const handleCancel = () => {
    if (isEditingSection) {
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      isShowContent(false);
      cancelNewSection(setPreviewSection, sectionId, setting.id);
    }
  };

  const handleConfirm = () => {
    isShowContent(false);
  };

  return (
    <div>
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

      <CTabs activeTab="konten">
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink data-tab="konten">Konten</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="background">Background</CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent
          style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
          className="pt-3"
        >
          <CTabPane data-tab="konten">
            <div>
              <UpdateContent
                sectionId={sectionId}
                setPreviewSection={setPreviewSection}
                currentSection={
                  isEditingSection ? currentSection : selectedCurrentSection
                }
                currentContent={
                  isEditingSection
                    ? currentSection?.content?.[0]
                    : selectedCurrentSection?.content?.[0]
                }
                isEditingContent={isEditingSection}
              />
            </div>
          </CTabPane>

          <CTabPane
            style={{ overflowX: "hidden", height: "100%" }}
            className="p-1"
            data-tab="background"
          >
            <BackgroundTabFrame
              sectionId={sectionId}
              currentSection={isEditingSection ? currentSection : setting}
              setPreviewSection={setPreviewSection}
              type={isEditingSection ? "edit" : "add"}
            />
          </CTabPane>
        </CTabContent>
      </CTabs>
    </div>
  );
};

export default CallToAction;
