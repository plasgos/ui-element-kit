import React, { useCallback } from "react";
import ViewLink from "../add/navbar/view/ViewLink";
import ViewDivider from "../add/navbar/view/ViewDivider";
import ViewMenu from "../add/navbar/view/ViewMenu";

export const useRenderViewNavbar = ({
  id,
  isDragging,
  isResizing,
  focusedIndexSectionContent,
  containerRef,
  setSectionContentRef,
}) => {
  const renderViewNavbar = useCallback(
    (section, content, mobileView) => {
      if (content.name === "link") {
        return (
          <ViewLink
            isDragging={isDragging && content.id === id}
            section={section}
            content={content}
            isResizing={isResizing}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
            containerRef={containerRef}
            mobileView={mobileView}
          />
        );
      }

      if (content.name === "divider" && !mobileView?.value) {
        return (
          <ViewDivider
            isDragging={isDragging && content.id === id}
            section={section}
            content={content}
            isResizing={isResizing}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
          />
        );
      }

      if (content.name === "menu") {
        return (
          <ViewMenu
            isDragging={isDragging && content.id === id}
            section={section}
            content={content}
            isResizing={isResizing}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
            mobileView={mobileView}
          />
        );
      }

      return null;
    },
    [
      containerRef,
      focusedIndexSectionContent,
      id,
      isDragging,
      isResizing,
      setSectionContentRef,
    ]
  );

  return { renderViewNavbar };
};
