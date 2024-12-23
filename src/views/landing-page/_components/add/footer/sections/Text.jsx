import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useFontAwesomeIconPack } from "../../../../../../hooks/useFontAwesomePack";
import { createUniqueID } from "../../../../../../lib/unique-id";
import Confirmation from "../../../common/Confirmation";
import IconPicker from "../../../common/IconPicker";
import IconUploader from "../../../common/IconUploader";
import Input from "../../../common/Input";
import InputRangeWithNumber from "../../../common/InputRangeWithNumber";
import { CustomReactQuill } from "../../../common/ReactQuill";
import SelectOptions from "../../../common/SelectOptions";
import { fontSizeOptions } from "../../../SelectOptions";

const Text = ({
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
  currentContent,
}) => {
  const [title, setTitle] = useState(
    currentContent?.content?.title || "Misi Kami"
  );
  const [editorHtml, setEditorHtml] = useState(
    currentContent?.content?.text ||
      "Misi kami adalah untuk memajukan peradaban manusia dimulai dengan melayani pelanggan kami sebagai raja"
  );
  const [maxWidth, setMaxWidth] = useState(
    currentContent?.content?.maxWidth || 300
  );

  const [iconSize, setIconSize] = useState(
    currentContent?.wrapperStyle?.iconSize || 20
  );
  const [imageSize, setImageSize] = useState(
    currentContent?.wrapperStyle?.imageSize || 50
  );
  const [fontSize, setFontSize] = useState(fontSizeOptions[2]);
  const [setting, setSetting] = useState({});
  const [titleValue] = useDebounce(title, 300);

  const [editorHtmlValue] = useDebounce(editorHtml, 300);
  const iconPack = useFontAwesomeIconPack();

  const [previousIcon, setPreviousIcon] = useState("");

  const [icon, setIcon] = useState(
    isEditingSection ? currentContent?.wrapperStyle?.icon : ""
  );

  const [imageUrl, setImageUrl] = useState(
    isEditingSection ? currentContent?.wrapperStyle?.image : ""
  );

  const [isListIconVisible, setIsListIconVisible] = useState(false);

  const contentIdToCheck = isEditingSection ? currentContent.id : setting.id;

  const isIconSizeAndImageSizeVisible = isEditingSection
    ? currentContent?.wrapperStyle
    : setting?.wrapperStyle;

  useEffect(() => {
    if (imageUrl !== "") {
      setIcon({});
      handleChangeImageUrl(imageUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();

    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImageUrl(imageUrl);
      };

      reader.readAsDataURL(file);
    };
  };

  const handleSearchIcon = (prevIcon) => {
    setPreviousIcon(prevIcon);
    setIsListIconVisible(true);
  };

  const handleRemoveIcon = () => {
    const hasIcon =
      iconPack && iconPack.length > 0 && Object.keys(icon).length > 0;

    setIcon("");
    setImageUrl("");

    const updateIcon = hasIcon
      ? {
          icon: "",
        }
      : imageUrl
      ? {
          image: "",
        }
      : {};

    if (!isEditingSection) {
      setSetting((prev) => ({
        ...prev,
        wrapperStyle: {
          ...prev.wrapperStyle,
          ...updateIcon,
        },
      }));
    }

    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === currentSection?.id
          ? {
              ...section,
              content: section.content.map((contentItem) =>
                contentItem.id === contentIdToCheck
                  ? {
                      ...contentItem,
                      wrapperStyle: {
                        ...contentItem.wrapperStyle,
                        ...updateIcon,
                      },
                    }
                  : contentItem
              ),
            }
          : section
      )
    );
  };

  const handleChangeImageUrl = (value) => {
    if (!isEditingSection) {
      setSetting((prev) => ({
        ...prev,
        wrapperStyle: {
          ...prev.wrapperStyle,
          image: value,
          icon: "",
        },
      }));
    }

    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === currentSection?.id
          ? {
              ...section,
              content: section.content.map((contentItem) =>
                contentItem.id === contentIdToCheck
                  ? {
                      ...contentItem,
                      wrapperStyle: {
                        ...contentItem.wrapperStyle,
                        image: value,
                        icon: "",
                      },
                    }
                  : contentItem
              ),
            }
          : section
      )
    );
  };

  const handleChangeIcon = (value) => {
    setIcon(value);

    if (!isEditingSection) {
      setSetting((prev) => ({
        ...prev,
        wrapperStyle: {
          ...prev.wrapperStyle,
          image: "",
          icon: value,
        },
      }));
    }

    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === currentSection?.id
          ? {
              ...section,
              content: section.content.map((contentItem) =>
                contentItem.id === contentIdToCheck
                  ? {
                      ...contentItem,
                      wrapperStyle: {
                        ...contentItem.wrapperStyle,
                        image: "",
                        icon: value,
                      },
                    }
                  : contentItem
              ),
            }
          : section
      )
    );
  };

  useEffect(() => {
    if (editorHtmlValue !== currentContent?.content?.text) {
      handleChangeContent("text", editorHtmlValue);
    }

    if (titleValue !== currentContent?.content?.title) {
      handleChangeWrapperStyle("title", titleValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorHtmlValue, titleValue]);

  const handleChangeContent = (key, value) => {
    if (!isEditingSection) {
      setSetting((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          [key]: value,
        },
      }));
    }

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection?.id
          ? {
              ...item,
              content: item.content.map((contentItem) => {
                return String(contentItem.id) === String(contentIdToCheck)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        [key]: value,
                      },
                    }
                  : contentItem;
              }),
            }
          : item
      )
    );
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(currentSection?.content);
    let payload = {
      id: uniqueId,
      name: "text",
      title: "Teks",
      content: {
        text: "Misi kami adalah untuk memajukan peradaban manusia dimulai dengan melayani pelanggan kami sebagai raja",
        fontSize: "tw-text-md",
      },
      wrapperStyle: {
        title: "Misi Kami",
        maxWidth: 300,
        icon: "",
        iconSize: 20,
        image: "",
        imageSize: 50,
      },
    };

    setPreviewSection((prevSections) =>
      prevSections.map((section) =>
        section.id === currentSection?.id
          ? { ...section, content: [...section.content, payload] }
          : section
      )
    );
    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditingSection) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

  const handleCancel = () => {
    if (isListIconVisible) {
      setIsListIconVisible(false);
      if (imageUrl) {
        setImageUrl(imageUrl);
        setIcon({});
        handleChangeImageUrl(imageUrl);
      } else {
        handleChangeIcon(previousIcon);
      }
    } else if (isEditingSection) {
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      isShowContent(false);

      setPreviewSection((prevSections) =>
        prevSections.map((section) =>
          section.id === currentSection?.id
            ? {
                ...section,
                content: section.content.filter(
                  (contentItem) => contentItem.id !== setting.id
                ),
              }
            : section
        )
      );
    }
  };

  const handleConfirm = () => {
    if (isListIconVisible) {
      setIsListIconVisible(false);
      if (icon.iconName) {
        setImageUrl("");
      }
    } else {
      isShowContent(false);
    }
  };

  const handleSetValueWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "maxWidth") {
      setMaxWidth(newValue);
    } else if (key === "iconSize") {
      setIconSize(newValue);
    } else if (key === "imageSize") {
      setImageSize(newValue);
    }
    handleChangeWrapperStyle(key, newValue);
  };

  const handleChangeWrapperStyle = (key, value) => {
    if (!isEditingSection) {
      setSetting((prev) => ({
        ...prev,
        wrapperStyle: {
          ...prev.wrapperStyle,
          [key]: value,
        },
      }));
    }

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection?.id
          ? {
              ...item,
              content: item.content.map((contentItem) => {
                return String(contentItem.id) === String(contentIdToCheck)
                  ? {
                      ...contentItem,
                      wrapperStyle: {
                        ...contentItem.wrapperStyle,
                        [key]: value,
                      },
                    }
                  : contentItem;
              }),
            }
          : item
      )
    );
  };

  return (
    <>
      <div>
        <Confirmation
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
        />

        {isListIconVisible ? (
          <IconPicker
            value={icon}
            onChange={(value) => handleChangeIcon(value)}
          />
        ) : (
          <div
            style={{ overflowY: "auto", height: "calc(100vh - 110px)" }}
            className="p-3"
          >
            <Input
              label="Judul"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            <InputRangeWithNumber
              label="Lebar Maksimal"
              value={maxWidth}
              onChange={(newValue) => {
                setMaxWidth(newValue);
                handleChangeWrapperStyle("maxWidth", newValue);
              }}
              min={80}
              max={1200}
              onBlur={() =>
                handleSetValueWhenBlur(maxWidth, 80, 1200, "maxWidth")
              }
            />

            <IconUploader
              iconPack={iconPack}
              icon={icon}
              imageUrl={imageUrl}
              handleFileUpload={handleFileUpload}
              handleSearchIcon={handleSearchIcon}
              handleRemoveIcon={handleRemoveIcon}
            />

            {isIconSizeAndImageSizeVisible?.icon && (
              <InputRangeWithNumber
                label="Ukuran Icon"
                value={iconSize}
                onChange={(newValue) => {
                  setIconSize(newValue);
                  handleChangeWrapperStyle("iconSize", newValue);
                }}
                min={10}
                max={100}
                onBlur={() =>
                  handleSetValueWhenBlur(iconSize, 10, 100, "iconSize")
                }
              />
            )}

            {isIconSizeAndImageSizeVisible?.image && (
              <InputRangeWithNumber
                label="Ukuran Gambar"
                value={imageSize}
                onChange={(newValue) => {
                  setImageSize(newValue);
                  handleChangeWrapperStyle("imageSize", newValue);
                }}
                min={10}
                max={100}
                onBlur={() =>
                  handleSetValueWhenBlur(imageSize, 10, 100, "imageSize")
                }
              />
            )}

            <SelectOptions
              label="Ukuran Font"
              options={fontSizeOptions}
              onChange={(selectedOption) => {
                setFontSize(selectedOption);
                handleChangeContent("fontSize", selectedOption.value);
              }}
              value={fontSize}
              width="50"
            />

            <CustomReactQuill
              value={editorHtml}
              onChange={(value) => {
                setEditorHtml(value);
              }}
              version="basic"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Text;
