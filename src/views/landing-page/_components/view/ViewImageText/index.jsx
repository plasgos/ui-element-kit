import React, { forwardRef } from "react";
import { useBackgroundStyles } from "../../../../../hooks/useBackgroundStyles";
import ViewFrosty from "./variant/ViewFrosty";
import ViewPage from "./variant/ViewPage";

const ViewImageText = forwardRef(
  ({ isDragging, isResizing, content, isFocused, isPreview, width }, ref) => {
    const stylesBg = useBackgroundStyles(content);

    return (
      <>
        {content.variant?.group === "Frosty" ? (
          <ViewFrosty
            ref={ref}
            isDragging={isDragging}
            isResizing={isResizing}
            content={content}
            isFocused={isFocused}
          />
        ) : (
          <div
            key={content.id}
            ref={ref}
            style={{
              ...(isResizing ? { cursor: "not-allowed" } : {}),
              ...(isDragging ? { border: "2px solid green" } : {}),
              ...(isFocused && { border: "2px solid green" }),
              paddingTop:
                content.variant?.group !== "Page" ? 0 : stylesBg.paddingTop,
              paddingBottom:
                content.variant?.group !== "Page" ? 0 : stylesBg.paddingBottom,
              backgroundColor: content.background.bgColor || "",
              position: "relative",
              zIndex: 1,
            }}
            className={` tw-flex tw-flex-row tw-flex-wrap  tw-items-center  ${
              content.variant?.group !== "Page" ? "tw-p-0" : "tw-p-4"
            } ${
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

            {(content?.variant?.group === "Page" ||
              content?.variant?.group === "Penuh") && (
              <ViewPage content={content} isPreview={isPreview} width={width} />
            )}
          </div>
        )}
      </>
    );
  }
);

export default ViewImageText;
