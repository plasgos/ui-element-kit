import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { deleteOptionsGroup } from "../../../../../../../../redux/modules/custom-landing-page/reducer";

export const useRemoveOptionGroup = (setPreviewSection) => {
  const dispacth = useDispatch();
  const removeOption = useCallback(
    (
      sectionId,
      idSection,
      contentIndex,
      optionIndex,
      option,
      setDefaultValue
    ) => {
      setDefaultValue((prevValue) => {
        const currentDefaultValue = prevValue.value;

        const existingDefaultValue = option.options.some(
          (opt) => opt.value === currentDefaultValue
        );

        const isOptionUndefined = existingDefaultValue
          ? undefined
          : currentDefaultValue;

        return {
          ...prevValue,
          value: isOptionUndefined,
          label:
            isOptionUndefined === undefined ? "Tidak Ada" : prevValue.label,
        };
      });

      setPreviewSection((prevSections) => {
        return prevSections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                content: section.content.map((content) => {
                  if (content.id === idSection) {
                    const updatedContent = content.content
                      .map((contentItem, i) => {
                        const currentDefaultValue = contentItem.defaultValue;

                        const existingDefaultValue = option.options.some(
                          (opt) => opt.value === currentDefaultValue
                        );
                        if (i === contentIndex) {
                          // Jika terdapat optionIndex, hapus item di dalam options
                          if (optionIndex !== undefined) {
                            return {
                              ...contentItem,
                              optionsGroup: contentItem.optionsGroup.filter(
                                (_, oIndex) => oIndex !== optionIndex
                              ),
                              defaultValue: existingDefaultValue
                                ? undefined
                                : currentDefaultValue,
                            };
                          }
                          // Jika tidak ada optionIndex, hapus contentItem itu sendiri
                          return null;
                        }
                        return contentItem;
                      })
                      .filter(Boolean); // Filter out null values

                    dispacth(deleteOptionsGroup(option.groupId));

                    return { ...content, content: updatedContent };
                  }
                  return content;
                }),
              }
            : section
        );
      });
    },
    [dispacth, setPreviewSection]
  );

  return removeOption;
};
