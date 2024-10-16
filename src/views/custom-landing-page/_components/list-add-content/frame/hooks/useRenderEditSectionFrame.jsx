import React, { useCallback } from "react";
import Text from "../sections/text";
import EmptySpace from "../sections/empty-space";
import ColumnTextAndImages from "../sections/colum-text-and-image";
import ListImages from "../sections/list-images";
import ScrollTarget from "../sections/scroll-target";
import Line from "../sections/line";
import Quote from "../sections/quote";
import ListFeature from "../sections/list-feature";
import CallToAction from "../sections/call-to-action";
import Video from "../sections/video";
import VideoText from "../sections/video-text";
import Image from "../sections/image";

export function useRenderEditSectionFrame({
  previewSection,
  setPreviewSection,
  currentSectionBeforeEdit,
  selectedSection,
  setIsEditingContent,
}) {
  const renderEditSectionFrame = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section.content.map((content) => {
            if (
              selectedSection.name === "text" &&
              selectedSection.id === content.id
            ) {
              return (
                <Text
                  key={content.id}
                  currentSection={content}
                  previewSection={previewSection}
                  setPreviewSection={setPreviewSection}
                  sectionBeforeEdit={currentSectionBeforeEdit}
                  sectionId={section.id}
                  isEditingSection={true}
                  isShowContent={setIsEditingContent}
                />
              );
            }

            if (
              selectedSection.name === "empty-space" &&
              selectedSection.id === content.id
            ) {
              return (
                <EmptySpace
                  key={content.id}
                  currentSection={content}
                  previewSection={previewSection}
                  setPreviewSection={setPreviewSection}
                  sectionBeforeEdit={currentSectionBeforeEdit}
                  sectionId={section.id}
                  isEditingSection={true}
                  isShowContent={setIsEditingContent}
                />
              );
            }

            if (
              selectedSection.name === "column-text-and-image" &&
              selectedSection.id === content.id
            ) {
              return (
                <ColumnTextAndImages
                  key={content.id}
                  currentSection={content}
                  previewSection={previewSection}
                  setPreviewSection={setPreviewSection}
                  sectionBeforeEdit={currentSectionBeforeEdit}
                  sectionId={section.id}
                  isEditingSection={true}
                  isShowContent={setIsEditingContent}
                />
              );
            }

            if (
              selectedSection.name === "list-images" &&
              selectedSection.id === content.id
            ) {
              return (
                <ListImages
                  key={content.id}
                  currentSection={content}
                  previewSection={previewSection}
                  setPreviewSection={setPreviewSection}
                  sectionBeforeEdit={currentSectionBeforeEdit}
                  sectionId={section.id}
                  isEditingSection={true}
                  isShowContent={setIsEditingContent}
                />
              );
            }

            if (
              selectedSection.name === "scroll-target" &&
              selectedSection.id === content.id
            ) {
              return (
                <ScrollTarget
                  key={content.id}
                  currentSection={content}
                  previewSection={previewSection}
                  setPreviewSection={setPreviewSection}
                  sectionBeforeEdit={currentSectionBeforeEdit}
                  sectionId={section.id}
                  isEditingSection={true}
                  isShowContent={setIsEditingContent}
                />
              );
            }

            if (
              selectedSection.name === "line" &&
              selectedSection.id === content.id
            ) {
              return (
                <Line
                  key={content.id}
                  currentSection={content}
                  previewSection={previewSection}
                  setPreviewSection={setPreviewSection}
                  sectionBeforeEdit={currentSectionBeforeEdit}
                  sectionId={section.id}
                  isEditing={true}
                  isShowContent={setIsEditingContent}
                />
              );
            }

            if (
              selectedSection.name === "quote" &&
              selectedSection.id === content.id
            ) {
              return (
                <Quote
                  key={content.id}
                  currentSection={content}
                  previewSection={previewSection}
                  setPreviewSection={setPreviewSection}
                  sectionBeforeEdit={currentSectionBeforeEdit}
                  sectionId={section.id}
                  isEditing={true}
                  isShowContent={setIsEditingContent}
                />
              );
            }

            if (
              selectedSection.name === "list-feature" &&
              selectedSection.id === content.id
            ) {
              return (
                <ListFeature
                  key={content.id}
                  currentSection={content}
                  previewSection={previewSection}
                  setPreviewSection={setPreviewSection}
                  sectionBeforeEdit={currentSectionBeforeEdit}
                  sectionId={section.id}
                  isEditingSection={true}
                  isShowContent={setIsEditingContent}
                />
              );
            }

            if (
              selectedSection.name === "call-to-action" &&
              selectedSection.id === content.id
            ) {
              return (
                <CallToAction
                  key={content.id}
                  currentSection={content}
                  previewSection={previewSection}
                  setPreviewSection={setPreviewSection}
                  sectionBeforeEdit={currentSectionBeforeEdit}
                  sectionId={section.id}
                  isEditingSection={true}
                  isShowContent={setIsEditingContent}
                />
              );
            }

            if (
              selectedSection.name === "video" &&
              selectedSection.id === content.id
            ) {
              return (
                <Video
                  key={content.id}
                  currentSection={content}
                  previewSection={previewSection}
                  setPreviewSection={setPreviewSection}
                  sectionBeforeEdit={currentSectionBeforeEdit}
                  sectionId={section.id}
                  isEditingSection={true}
                  isShowContent={setIsEditingContent}
                />
              );
            }

            if (
              selectedSection.name === "video-text" &&
              selectedSection.id === content.id
            ) {
              return (
                <VideoText
                  key={content.id}
                  currentSection={content}
                  previewSection={previewSection}
                  setPreviewSection={setPreviewSection}
                  sectionBeforeEdit={currentSectionBeforeEdit}
                  sectionId={section.id}
                  isEditingSection={true}
                  isShowContent={setIsEditingContent}
                />
              );
            }

            if (
              selectedSection.name === "image" &&
              selectedSection.id === content.id
            ) {
              return (
                <Image
                  key={content.id}
                  currentSection={content}
                  previewSection={previewSection}
                  setPreviewSection={setPreviewSection}
                  sectionBeforeEdit={currentSectionBeforeEdit}
                  sectionId={section.id}
                  isEditingSection={true}
                  isShowContent={setIsEditingContent}
                />
              );
            }

            return null;
          })}
        </div>
      );
    },
    [
      currentSectionBeforeEdit,
      previewSection,
      selectedSection.id,
      selectedSection.name,
      setIsEditingContent,
      setPreviewSection,
    ]
  );

  return { renderEditSectionFrame };
}