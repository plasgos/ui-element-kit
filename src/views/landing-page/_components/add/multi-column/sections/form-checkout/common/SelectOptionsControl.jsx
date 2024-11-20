import React, { useCallback, useEffect, useState } from "react";
import { DraggableListOption } from "./DraggableListOption";
import { useRemoveOptionGroup } from "../hooks/removeOptionGroup";
import { useMoveOption } from "../hooks/moveOption";
import { CButton } from "@coreui/react";
import { IoAdd } from "react-icons/io5";
import { DraggableListGroupOption } from "./DraggableGroupOption";
import { useDispatch, useSelector } from "react-redux";

import { useRemoveOption } from "../hooks/removeOption";

import { useDebounce } from "use-debounce";
import {
  addOption,
  addOptionsGroup,
} from "../../../../../../../../modules/custom-landing-page/reducer";
import { createUniqueID } from "../../../../../../../../lib/unique-id";
import SelectOptions from "../../../../../common/SelectOptions";
import Input from "../../../../../common/Input";

const typeOptions = [
  { value: "single", label: "Single" },
  { value: "group", label: "Group" },
];

const SelectOptionsControl = ({
  idSection,
  currentContent,
  handleChangeValueContent,
  previewSection,
  setPreviewSection,
  sectionId,
  columnId,
}) => {
  const { optionsGroups, options } = useSelector(
    (state) => state.customLandingPage
  );
  const [label, setLabel] = useState(currentContent?.label || "Nama");
  const [placeholder, setPlaceholder] = useState(
    currentContent?.placeholder || "Pilih Opsi"
  );
  const [placeholderValue] = useDebounce(placeholder, 300);
  const [labelValue] = useDebounce(label, 300);

  const [optionCounter, setOptionCounter] = useState(1);
  const [optionGroupCounter, setOptionGroupCounter] = useState(1);

  const [defaultValueOption, setDefaultValueOption] = useState([
    {
      label: "Basic Opsi",
      options: [
        { value: undefined, label: "Tidak Ada" },
        { value: "firstOption", label: "Opsi Pertama" },
      ],
    },
    {
      label: "Opsi",
      options: [], // Ini akan diisi dengan data dari optionsGroups
    },
  ]);
  const [defaultValue, setDefaultValue] = useState(
    defaultValueOption
      .flatMap((group) => group.options)
      .find((opt) => opt.value === currentContent.defaultValue) ||
      defaultValueOption[0].options[0]
  );

  const [typeOption, setTypeOption] = useState(
    typeOptions.find(
      (opt) => opt.value === currentContent?.typeOption || typeOptions[0]
    )
  );

  useEffect(() => {
    const updateOptions = (newOptions) => {
      // Find the group labeled "Opsi" and check if options need updating
      const currentOptions = defaultValueOption.find(
        (group) => group.label === "Opsi"
      )?.options;

      const isOptionsChanged =
        currentOptions?.length !== newOptions.length ||
        newOptions.some((newOpt, index) => {
          const currentOpt = currentOptions[index];
          return (
            currentOpt?.value !== newOpt.value ||
            currentOpt?.label !== newOpt.label
          );
        });

      // Update state if the options have changed
      if (isOptionsChanged) {
        setDefaultValueOption((prevOptions) =>
          prevOptions.map((optionGroup) => {
            if (optionGroup.label === "Opsi") {
              return {
                ...optionGroup,
                options: newOptions, // Update with new options array
              };
            }
            return optionGroup;
          })
        );
      }
    };

    // Logic for creating new options
    let newOptions = [];

    if (typeOption.value === "group") {
      // For "group", iterate through `optionsGroups` and extract options
      optionsGroups.forEach((group) => {
        group.options.forEach((option) => {
          newOptions.push({
            id: option.id,
            value: option.value,
            label: option.label,
          });
        });
      });
    } else {
      // For non-group, map through `options` directly
      newOptions = options.map((opt) => ({
        id: opt.id,
        value: opt.value,
        label: opt.label,
      }));
    }

    // Update the state with new options
    updateOptions(newOptions);
  }, [defaultValueOption, options, optionsGroups, typeOption.value]);

  useEffect(() => {
    if (currentContent.typeOption) {
      const currentTypeOption = typeOptions.find(
        (opt) => opt.value === currentContent.typeOption
      );

      if (currentTypeOption) {
        setTypeOption(currentTypeOption);
      }
    }
  }, [currentContent.typeOption]);

  useEffect(() => {
    if (currentContent.defaultValue) {
      const currentDefaultValue = defaultValueOption
        .flatMap((group) => group.options)
        .find((opt) => opt.value === currentContent.defaultValue);

      if (currentDefaultValue) {
        setDefaultValue(currentDefaultValue);
      }
    }
  }, [currentContent.defaultValue, defaultValueOption]);

  const dispatch = useDispatch();

  const removeSection = useRemoveOption(setPreviewSection, "selectOption");

  const moveSection = useMoveOption(
    setPreviewSection,
    "selectOption",
    "options"
  );

  const removeSectionGroup = useRemoveOptionGroup(setPreviewSection);

  const moveSectionGroup = useMoveOption(
    setPreviewSection,
    "selectOption",
    "optionsGroup"
  );

  const renderSection = useCallback(
    (section) => {
      if (section.id !== sectionId) return null;

      const selectedColumn = section.column.find(
        (column) => column.id === columnId
      );
      if (!selectedColumn) return null;

      const selectedContent = selectedColumn.content.find(
        (content) => content.id === idSection
      );

      return selectedContent?.content.map((contentItem, contentIndex) => {
        if (
          contentItem?.type === "selectOption" &&
          contentItem.id === currentContent.id
        ) {
          return (
            <div key={contentItem.id || contentIndex}>
              {contentItem?.options?.map((option, optionIndex) => (
                <DraggableListOption
                  key={option.id || optionIndex}
                  index={optionIndex}
                  id={option.id}
                  showInfoText={option.label}
                  moveSection={(dragIndex, hoverIndex) =>
                    moveSection(
                      sectionId,
                      columnId,
                      idSection,
                      dragIndex,
                      hoverIndex,
                      true,
                      contentIndex
                    )
                  }
                  removeSection={() =>
                    removeSection(
                      sectionId,
                      columnId,
                      idSection,
                      contentIndex,
                      optionIndex,
                      option,
                      setDefaultValue
                    )
                  }
                  setPreviewSection={setPreviewSection}
                  sectionId={sectionId}
                  columnId={columnId}
                  contentId={idSection}
                  idOption={option.id}
                  type="selectOption"
                  setDefaultValue={setDefaultValue}
                />
              ))}
            </div>
          );
        }
        return null;
      });
    },
    [
      columnId,
      currentContent.id,
      idSection,
      moveSection,
      removeSection,
      sectionId,
      setPreviewSection,
    ]
  );

  const handleAddOption = () => {
    const uniqueId = createUniqueID([]);

    const newOption = {
      id: uniqueId,
      label: `Opsi ${optionCounter}`,
      value: `${uniqueId}-Opsi ${optionCounter}`,
    };

    setPreviewSection((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.map((content) => {
                        return content.id === idSection
                          ? {
                              ...content,
                              content: content.content.map((contentItem) => {
                                if (
                                  contentItem.type === "selectOption" &&
                                  contentItem.id === currentContent.id
                                ) {
                                  return {
                                    ...contentItem,
                                    options: [
                                      ...contentItem.options,
                                      newOption,
                                    ],
                                  };
                                }

                                return contentItem;
                              }),
                            }
                          : content;
                      }),
                    }
                  : column
              ),
            }
          : section
      )
    );

    dispatch(addOption(newOption));
  };

  const handleAddGroup = () => {
    const uniqueIdGroup = createUniqueID(currentContent.optionsGroup);

    const uniqueIdOption = createUniqueID(currentContent.options);

    const newOptionGroup = {
      groupId: uniqueIdGroup,
      label: `Group ${optionGroupCounter}`,
      options: [
        {
          id: uniqueIdOption,
          label: `Opsi 1 `,
          value: `${uniqueIdGroup}-Opsi 1 `,
        },
      ],
    };

    setPreviewSection((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.map((content) => {
                        return content.id === idSection
                          ? {
                              ...content,
                              content: content.content.map((contentItem) => {
                                if (
                                  contentItem.type === "selectOption" &&
                                  contentItem.id === currentContent.id
                                ) {
                                  return {
                                    ...contentItem,
                                    optionsGroup: [
                                      ...contentItem.optionsGroup,
                                      newOptionGroup,
                                    ],
                                  };
                                }

                                return contentItem;
                              }),
                            }
                          : content;
                      }),
                    }
                  : column
              ),
            }
          : section
      )
    );

    dispatch(addOptionsGroup(newOptionGroup));
  };

  const renderSectionGroup = useCallback(
    (section) => {
      if (section.id !== sectionId) return null;

      const selectedColumn = section.column.find(
        (column) => column.id === columnId
      );
      if (!selectedColumn) return null;

      const selectedContent = selectedColumn.content.find(
        (content) => content.id === idSection
      );

      return selectedContent?.content.map((contentItem, contentIndex) => {
        if (
          contentItem?.type === "selectOption" &&
          contentItem.id === currentContent.id
        ) {
          return (
            <div key={contentItem.id || contentIndex}>
              {contentItem?.optionsGroup?.map((option, optionIndex) => (
                <DraggableListGroupOption
                  key={option.groupId || optionIndex}
                  index={optionIndex}
                  id={option.groupId}
                  showInfoText={option.label}
                  moveSection={(dragIndex, hoverIndex) =>
                    moveSectionGroup(
                      sectionId,
                      columnId,
                      idSection,
                      dragIndex,
                      hoverIndex,
                      true,
                      contentIndex
                    )
                  }
                  removeSection={() =>
                    removeSectionGroup(
                      sectionId,
                      columnId,
                      idSection,
                      contentIndex,
                      optionIndex,
                      option,
                      setDefaultValue
                    )
                  }
                  setPreviewSection={setPreviewSection}
                  sectionId={sectionId}
                  columnId={columnId}
                  contentId={idSection}
                  idOption={option.groupId}
                  type="selectOption"
                  options={option.options}
                  setDefaultValue={setDefaultValue}
                />
              ))}
            </div>
          );
        }
        return null;
      });
    },
    [
      columnId,
      currentContent.id,
      idSection,
      moveSectionGroup,
      removeSectionGroup,
      sectionId,
      setPreviewSection,
    ]
  );

  useEffect(() => {
    if (labelValue) {
      handleChangeValueContent("label", labelValue);
    }

    if (placeholderValue) {
      handleChangeValueContent("placeholder", placeholderValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labelValue, placeholderValue]);

  return (
    <div>
      <Input
        type="text"
        value={label}
        label="Nama"
        onChange={(e) => {
          const { value } = e.target;
          setLabel(value);
        }}
      />

      <h5>Default</h5>

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Default"
          options={defaultValueOption}
          value={defaultValue}
          width="50"
          onChange={(selectedOption) => {
            setDefaultValue(selectedOption);
            handleChangeValueContent("defaultValue", selectedOption.value);
          }}
        />

        {!defaultValue.value && (
          <Input
            type="text"
            value={placeholder}
            label="Placeholder"
            onChange={(e) => {
              const { value } = e.target;
              setPlaceholder(value);
            }}
          />
        )}
      </div>

      <SelectOptions
        label="Tipe Opsi"
        options={typeOptions}
        value={typeOption}
        width="50"
        onChange={(selectedOption) => {
          setTypeOption(selectedOption);
          handleChangeValueContent("typeOption", selectedOption.value);
        }}
      />

      {typeOption.value === "group" ? (
        <div className="mb-3">
          <h5>Group Opsi</h5>
          <div>
            {previewSection
              .filter((section) => section.id === sectionId)
              .map((section, i) => renderSectionGroup(section, i))}
          </div>

          <CButton
            onClick={() => {
              setOptionGroupCounter((prevCounter) => prevCounter + 1);

              handleAddGroup();
            }}
            className="my-3"
            variant="outline"
            color="primary"
          >
            <div style={{ gap: 10 }} className="d-flex align-items-center">
              <IoAdd size={24} />

              <div>Tambah Group</div>
            </div>
          </CButton>
        </div>
      ) : (
        <div>
          <h5>Single Opsi</h5>

          <div>
            {previewSection
              .filter((section) => section.id === sectionId)
              .map((section, i) => renderSection(section, i))}
          </div>

          <CButton
            onClick={() => {
              setOptionCounter((prevCounter) => prevCounter + 1);
              handleAddOption();
            }}
            className="my-3"
            variant="outline"
            color="primary"
          >
            <div style={{ gap: 10 }} className="d-flex align-items-center">
              <IoAdd size={24} />

              <div>Tambah Opsi</div>
            </div>
          </CButton>
        </div>
      )}
    </div>
  );
};

export default SelectOptionsControl;