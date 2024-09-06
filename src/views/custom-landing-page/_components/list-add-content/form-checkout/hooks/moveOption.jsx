import { useCallback } from "react";

export const useMoveOption = (setPreviewSection, key, optionTomaping) => {
  const moveOption = useCallback(
    (name, dragIndex, hoverIndex, isOption = false, contentIndex = null) => {
      setPreviewSection((prevSections) => {
        return prevSections.map((section) => {
          if (section.name === name) {
            const updatedContent = [...section.content];

            if (isOption && contentIndex !== null) {
              // Cari contentItem dengan index contentIndex
              const contentItem = updatedContent[contentIndex];

              if (contentItem?.type === key) {
                const updatedOptions = [...contentItem[optionTomaping]];
                const draggedOption = updatedOptions[dragIndex];
                updatedOptions.splice(dragIndex, 1);
                updatedOptions.splice(hoverIndex, 0, draggedOption);

                // Update contentItem dengan opsi yang diubah urutannya
                updatedContent[contentIndex] = {
                  ...contentItem,
                  [optionTomaping]: updatedOptions,
                };
              }
            } else {
              // Geser contentItem
              const draggedItem = updatedContent[dragIndex];
              updatedContent.splice(dragIndex, 1);
              updatedContent.splice(hoverIndex, 0, draggedItem);
            }

            return { ...section, content: updatedContent };
          }
          return section;
        });
      });
    },
    [key, optionTomaping, setPreviewSection]
  );

  return moveOption;
};
