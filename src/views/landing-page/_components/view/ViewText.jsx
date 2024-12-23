import React, { forwardRef } from "react";
import useAnimatedVisibility from "../../../../hooks/useAnimatedVisibility";
import { useBackgroundStyles } from "../../../../hooks/useBackgroundStyles";

const ViewText = forwardRef(
  ({ isDragging, isResizing, section, isFocused }, ref) => {
    const stylesBg = useBackgroundStyles(section);

    const { elementRef, getClassName, duration } =
      useAnimatedVisibility(section);

    return (
      <div
        key={section.id}
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          ...(isFocused && {
            border: "2px solid green",
          }),
          paddingTop: stylesBg.paddingTop,
          paddingBottom: stylesBg.paddingBottom,
          backgroundColor: section?.background?.bgColor || "",
          position: "relative",
          zIndex: 1,
        }}
        className={` tw-flex tw-flex-row tw-flex-wrap tw-justify-center tw-items-center  ${
          isFocused &&
          "animate__animated  animate__headShake animate__fast tw-bg-green-300/20"
        } `}
      >
        {section?.background?.bgImage ? (
          <div style={stylesBg.backgroundImgStyle}></div>
        ) : section?.background?.bgType === "gradient" ? (
          <div style={stylesBg.gradientStyle}></div>
        ) : section?.background?.bgType === "pattern" ? (
          <div style={stylesBg.backgroundPatternStyle}></div>
        ) : null}

        {section.background?.opacity ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor:
                section.background?.opacity < 0 ? "black" : "white",
              opacity: Math.abs(stylesBg.calculateOpacity),
            }}
          ></div>
        ) : null}

        <div
          style={
            (isResizing && { cursor: "not-allowed" },
            {
              color: section.content?.style?.color,
            })
          }
          className={`${section.content?.style?.textAlign} `}
        >
          {section.content.editorHtml && (
            <div
              ref={elementRef}
              className={`${getClassName()} `}
              style={{
                "--animation-duration": `${duration}s`,
              }}
              dangerouslySetInnerHTML={{ __html: section.content.editorHtml }}
            />
          )}
        </div>
      </div>
    );
  }
);

export default ViewText;
