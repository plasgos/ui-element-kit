import React, { useCallback } from "react";
import ViewArrowMoved from "../view/ViewArrowMoved";
import ViewButtonUpdate from "../view/ViewButtonUpdate";
import ViewCallToAction from "../view/ViewCallToAction";
import ViewColumnTextAndImage from "../view/ViewColumnTextAndImage";
import ViewCountDown from "../view/ViewCountdown";
import ViewEmptySpace from "../view/ViewEmptySpace";
import ViewFAQ from "../view/ViewFAQ";
import ViewFloatingButton from "../view/ViewFloatingButton";
import ViewFloatingButtonCircle from "../view/ViewFloatingButtonCircle";
import ViewFloatingContent from "../view/ViewFloatingContent";
import ViewFormActivity from "../view/ViewFormActivity";
import ViewFormCheckout from "../view/ViewFormCheckout";
import ViewFrames from "../view/ViewFrames";
import ViewImage from "../view/ViewImage";
import ViewImageText from "../view/ViewImageText";
import ViewLine from "../view/ViewLine";
import ViewListFeature from "../view/ViewListFeature";
import ViewListImages from "../view/ViewListImages";
import ViewMultiColumn from "../view/ViewMultiColumn";
import ViewPopUp from "../view/ViewPopUp";
import ViewQuote from "../view/ViewQuote";
import ViewSalesNotif from "../view/ViewSalesNotif";
import ViewScrollTraget from "../view/ViewScrollTraget";
import ViewSliderImage from "../view/ViewSliderImage";
import ViewStockCounter from "../view/ViewStockCounter";
import ViewTestimony from "../view/ViewTestimony";
import ViewText from "../view/ViewText";
import ViewVideo from "../view/ViewVideo";
import ViewVideoText from "../view/ViewVideoText";
import ViewTabs from "../view/ViewTabs";

export function useRenderViewSections({
  id,
  setPreviewSection,
  setPreviewFloatingSection,
  isDragging,
  isResizing,
  setRef,
  focusedIndex,
  focusedIndexSectionContent,
  isPreview,
  dimensions,
  containerRef,
  setSectionContentRef,
  setColumnRef,
  focusedIndexColumn,
  pageSetting,
}) {
  const renderViewSections = useCallback(
    (section) => {
      if (section.name === "text") {
        return (
          <ViewText
            isDragging={isDragging && section.id === id}
            section={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "column-text-and-image") {
        return (
          <ViewColumnTextAndImage
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
            isPreview={isPreview}
            width={dimensions.width}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
          />
        );
      }

      if (section.name === "empty-space") {
        return (
          <ViewEmptySpace
            isDragging={isDragging && section.id === id}
            width={dimensions.width}
            content={section.content}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "list-images") {
        return (
          <ViewListImages
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            width={dimensions.width}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
            isPreview={isPreview}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
          />
        );
      }

      if (section.name === "scroll-target") {
        return (
          <ViewScrollTraget
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "button") {
        return (
          <ViewButtonUpdate
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
          />
        );
      }

      if (section.name === "testimony") {
        return (
          <ViewTestimony
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            width={dimensions.width}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
            isPreview={isPreview}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
          />
        );
      }

      if (section.name === "line") {
        return (
          <ViewLine
            isDragging={isDragging && section.id === id}
            content={section.content}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "list-feature") {
        return (
          <ViewListFeature
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "quote") {
        return (
          <ViewQuote
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "faq") {
        return (
          <ViewFAQ
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
            isPreview={isPreview}
            width={dimensions.width}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
          />
        );
      }

      if (section.name === "form-checkout") {
        return (
          <ViewFormCheckout
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
            setPreviewSection={setPreviewSection}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
          />
        );
      }

      if (section.name === "floating-button") {
        return (
          <ViewFloatingButton
            containerRef={containerRef}
            content={section}
            isResizing={isResizing}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
            width={dimensions.width}
          />
        );
      }

      if (section.name === "floating-button-circle") {
        return (
          <ViewFloatingButtonCircle
            containerRef={containerRef}
            content={section}
            isResizing={isResizing}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
          />
        );
      }

      if (section.name === "image") {
        return (
          <ViewImage
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "image-text") {
        return (
          <ViewImageText
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
            isPreview={isPreview}
            width={dimensions.width}
          />
        );
      }

      if (section.name === "multi-column") {
        return (
          <ViewMultiColumn
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
            width={dimensions.width}
            isPreview={isPreview}
            setPreviewSection={setPreviewSection}
            setColumnRef={setColumnRef}
            focusedIndexColumn={focusedIndexColumn}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
            pageSetting={pageSetting}
          />
        );
      }

      if (section.name === "tabs") {
        return (
          <ViewTabs
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
            width={dimensions.width}
            isPreview={isPreview}
            setPreviewSection={setPreviewSection}
            setColumnRef={setColumnRef}
            focusedIndexColumn={focusedIndexColumn}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
            pageSetting={pageSetting}
          />
        );
      }

      if (section.name === "video") {
        return (
          <ViewVideo
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "video-text") {
        return (
          <ViewVideoText
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
            isPreview={isPreview}
            width={dimensions.width}
          />
        );
      }

      if (section.name === "call-to-action") {
        return (
          <ViewCallToAction
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "form-activity") {
        return (
          <ViewFormActivity
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "countdown") {
        return (
          <ViewCountDown
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "frames") {
        return (
          <ViewFrames
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
            isPreview={isPreview}
            width={dimensions.width}
            setPreviewSection={setPreviewSection}
            setColumnRef={setColumnRef}
            focusedIndexColumn={focusedIndexColumn}
          />
        );
      }

      if (section.name === "stock-counter") {
        return (
          <ViewStockCounter
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "popup") {
        return (
          <ViewPopUp
            containerRef={containerRef}
            content={section}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
            setPreviewFloatingSection={setPreviewFloatingSection}
            setPreviewSection={setPreviewSection}
            isPreview={isPreview}
            width={dimensions.width}
            setColumnRef={setColumnRef}
            focusedIndexColumn={focusedIndexColumn}
          />
        );
      }

      if (section.name === "floating-content") {
        return (
          <ViewFloatingContent
            containerRef={containerRef}
            content={section}
            isResizing={isResizing}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
            setPreviewFloatingSection={setPreviewFloatingSection}
            setPreviewSection={setPreviewSection}
            isPreview={isPreview}
            width={dimensions.width}
            setColumnRef={setColumnRef}
            focusedIndexColumn={focusedIndexColumn}
          />
        );
      }

      if (section.name === "sales-notification") {
        return (
          <ViewSalesNotif
            content={section}
            setPreviewFloatingSection={setPreviewFloatingSection}
          />
        );
      }

      if (section.name === "arrow-moved") {
        return (
          <ViewArrowMoved
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "slider-image") {
        return (
          <ViewSliderImage
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
            width={dimensions.width}
            pageSetting={pageSetting}
          />
        );
      }

      return null;
    },
    [
      containerRef,
      dimensions.width,
      focusedIndex,
      focusedIndexColumn,
      focusedIndexSectionContent,
      id,
      isDragging,
      isPreview,
      isResizing,
      pageSetting,
      setColumnRef,
      setPreviewFloatingSection,
      setPreviewSection,
      setRef,
      setSectionContentRef,
    ]
  );

  return { renderViewSections };
}
