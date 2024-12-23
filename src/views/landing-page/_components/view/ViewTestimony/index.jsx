import React, { forwardRef } from "react";
import Layout8 from "./Layout8";
import Layout7 from "./Layout7";
import Layout6 from "./Layout6";
import Layout5 from "./Layout5";
import Layout4 from "./Layout4";
import Layout3 from "./Layout3";
import Layout2 from "./Layout2";
import Layout1 from "./Layout1";
import { useBackgroundStyles } from "../../../../../hooks/useBackgroundStyles";

const ViewTestimony = forwardRef(
  (
    {
      isPreview,
      width,
      isDragging,
      content,
      isResizing,
      isFocused,
      setSectionContentRef,
      focusedIndexSectionContent,
    },
    ref
  ) => {
    const stylesBg = useBackgroundStyles(content);

    return (
      <div
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          ...(isFocused && { border: "2px solid green" }),
          paddingTop: stylesBg.paddingTop,
          paddingBottom: stylesBg.paddingBottom,
          backgroundColor: content.background.bgColor || "",
          position: "relative",
          zIndex: 1,
        }}
        className={`tw-w-full tw-flex tw-flex-wrap ${
          content.wrapperStyle?.jusctifyContent
        } tw-items-center tw-p-4 
        ${
          isFocused &&
          "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20 "
        }`}
      >
        {content?.background?.bgImage ? (
          <div style={stylesBg.backgroundImgStyle}></div>
        ) : content?.background?.bgType === "gradient" ? (
          <div style={stylesBg.gradientStyle}></div>
        ) : content?.background?.bgType === "pattern" ? (
          <div style={stylesBg.backgroundPatternStyle}></div>
        ) : null}

        {content.background?.opacity ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor:
                content.background?.opacity < 0 ? "black" : "white",
              opacity: Math.abs(stylesBg.calculateOpacity),
            }}
          ></div>
        ) : null}
        {content?.content?.map((item, indexContent) => (
          <div
            ref={(el) => {
              if (setSectionContentRef) {
                setSectionContentRef(el, item.id);
              }
            }}
            style={{
              zIndex: 2,
              paddingLeft: content.wrapperStyle?.paddingX,
              paddingRight: content.wrapperStyle?.paddingX,
              paddingBottom: content.wrapperStyle?.paddingX
                ? `calc(${content.wrapperStyle.paddingX}px * 2)`
                : "0px",
              ...(focusedIndexSectionContent === item.id && {
                border: "2px solid green",
              }),
            }}
            key={item?.id}
            className={
              isPreview
                ? `${
                    width === "100%" || width >= 640
                      ? `${content?.wrapperStyle?.column}`
                      : "tw-w-full"
                  }  ${
                    focusedIndexSectionContent === item.id
                      ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20"
                      : ""
                  } `
                : `tw-w-full sm:${content.wrapperStyle?.column}  ${
                    focusedIndexSectionContent === item.id
                      ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20"
                      : ""
                  }   `
            }
          >
            {content.wrapperStyle?.layout === "1" && (
              <Layout1 content={content} item={item} />
            )}
            {content.wrapperStyle?.layout === "2" && (
              <Layout2 content={content} item={item} />
            )}

            {content.wrapperStyle?.layout === "3" && (
              <Layout3 content={content} item={item} />
            )}

            {content.wrapperStyle?.layout === "4" && (
              <Layout4 content={content} item={item} />
            )}
            {content.wrapperStyle?.layout === "5" && (
              <Layout5 content={content} item={item} />
            )}

            {content.wrapperStyle?.layout === "6" && (
              <Layout6 content={content} item={item} />
            )}

            {content.wrapperStyle?.layout === "7" && (
              <Layout7 content={content} item={item} />
            )}

            {content.wrapperStyle?.layout === "8" && (
              <Layout8 content={content} item={item} />
            )}
          </div>
        ))}
      </div>
    );
  }
);

export default ViewTestimony;
