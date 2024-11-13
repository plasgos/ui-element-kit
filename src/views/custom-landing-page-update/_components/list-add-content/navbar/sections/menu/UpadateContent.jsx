import React, { useEffect, useState } from "react";
import { createUniqueID } from "../../../../../../../lib/unique-id";

import { useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import Input from "../../../../common/Input";
import ScrollTargetInput from "../../../../common/ScrollTargetSelect";
import SelectOptions from "../../../../common/SelectOptions";
import UrlInput from "../../../../common/UrlInput";
import WhatsAppInput from "../../../../common/WhatAppsInput";
import FacebookPixel from "../../../../FacebookPixel";
import Confirmation from "../../../../common/Confirmation";
import IconPicker from "../../../../common/IconPicker";
import { useFontAwesomeIconPack } from "../../../../../../../hooks/useFontAwesomePack";
import { CButton } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputRangeWithNumber from "../../../../common/InputRangeWithNumber";
import { useUrlChange } from "../../../footer/hooks/useUrlChange";
import { useWhatAppsChange } from "../../../footer/hooks/useWhatAppsChange";
import { useScrollTargetChange } from "../../../footer/hooks/useScrollTargetChange";
import { shownOnWhenOptions } from "../Link";
import { localPageTargetOptions } from "../../../../SelectOptions";

const UpdateContent = ({
  currentSection,
  currentContent,
  selectedContent,
  setSelectedContent,
  setPreviewSection,
  isEditingContent,
  isListIconContentVisible,
  setIsListIconContentVisible,
}) => {
  const { optionsScrollTarget, optionsTarget } = useSelector(
    (state) => state.customLandingPage
  );

  const [text, setText] = useState(
    isEditingContent ? selectedContent?.text : "Link"
  );

  const [textValue] = useDebounce(text, 300);
  const [shownOnWhen, setShownOnWhen] = useState(shownOnWhenOptions[0]);
  useEffect(() => {
    if (textValue) {
      handleChangeContent("text", textValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textValue]);

  const [selectedOption, setSelectedOption] = useState(
    optionsTarget[0].options[0]
  );

  const [setting, setSetting] = useState({});

  const [localPageTarget, setLocalPageTarget] = useState(
    localPageTargetOptions[0]
  );

  const isIconSizeAndImageSizeVisible = isEditingContent
    ? selectedContent
    : setting;
  useEffect(() => {
    if (!isEditingContent) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingContent]);

  const { url, setUrl, handleUrlOpenNewTabChange } = useUrlChange(
    setPreviewSection,
    currentSection?.id,
    currentContent?.id,
    isEditingContent ? selectedContent : setting
  );

  const { whatApps, setWhatApps, handleUrlOpenNewTabWaChange } =
    useWhatAppsChange(
      setPreviewSection,
      currentSection?.id,
      currentContent?.id,
      isEditingContent ? selectedContent : setting
    );

  useEffect(() => {
    const currentShowOnWhen = shownOnWhenOptions.find(
      (opt) => opt.value === selectedContent?.shownOnWhen
    );

    if (currentShowOnWhen) {
      setShownOnWhen(currentShowOnWhen);
    }

    const currentlocalPageTarget = localPageTargetOptions
      .flatMap((group) => group.options)
      .find((opt) => opt.value === selectedContent?.target?.localPage?.value);

    if (currentlocalPageTarget) {
      setLocalPageTarget(currentlocalPageTarget);
    }
  }, [selectedContent]);

  const {
    selectedOptionScrollTarget,
    setSelectedOptionScrollTarget,
    handleChangeScrollTarget,
  } = useScrollTargetChange(
    setPreviewSection,
    currentSection?.id,
    currentContent?.id,
    isEditingContent ? selectedContent : setting
  );

  const contentIdToCheck = isEditingContent ? selectedContent.id : setting.id;

  const handleChangeContent = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        String(section.id) === currentSection?.id
          ? {
              ...section,
              content: section.content.map((content) =>
                content.id === currentContent?.id
                  ? {
                      ...content,
                      content: content.content.map((contentItem) => {
                        return String(contentItem.id) ===
                          String(contentIdToCheck)
                          ? {
                              ...contentItem,
                              [key]: value,
                            }
                          : contentItem;
                      }),
                    }
                  : content
              ),
            }
          : section
      )
    );
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(currentContent?.content);
    let payload = {
      id: uniqueId,
      text: "Link",
      target: {},
      icon: "",
      iconSize: 20,
      image: "",
      imageSize: 50,
    };

    setPreviewSection((prevSections) =>
      prevSections.map((section) =>
        section.id === currentSection?.id
          ? {
              ...section,
              content: section.content.map((content) =>
                content.id === currentContent?.id
                  ? {
                      ...content,
                      content: [...content.content, payload],
                    }
                  : content
              ),
            }
          : section
      )
    );

    setSetting(payload);
  };

  useEffect(() => {
    if (isEditingContent) {
      if (
        selectedOption &&
        selectedOption.value === "scroll-target" &&
        selectedOptionScrollTarget &&
        optionsScrollTarget
      ) {
        const updatedOption = optionsScrollTarget.find(
          (option) => option.id === selectedOptionScrollTarget.id
        );

        setPreviewSection((arr) =>
          arr.map((item) =>
            String(item.id) === currentSection?.id
              ? {
                  ...item,
                  content: item.content.map((content) =>
                    content.id === currentContent?.id
                      ? {
                          ...content,
                          content: content.content.map((contentItem) => {
                            return String(contentItem.id) ===
                              String(contentIdToCheck)
                              ? {
                                  ...contentItem,
                                  target: {
                                    scrollTarget: {
                                      ...contentItem.target.scrollTarget,
                                      value: updatedOption.value,
                                      label: updatedOption.label,
                                    },
                                  },
                                }
                              : contentItem;
                          }),
                        }
                      : content
                  ),
                }
              : item
          )
        );

        setSelectedOptionScrollTarget(updatedOption);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingContent, optionsScrollTarget, selectedOption]);

  useEffect(() => {
    if (isEditingContent) {
      const currentTargetOption = optionsTarget
        .flatMap((group) => group.options)
        .find((opt) => {
          const targetType = selectedContent?.target;
          return (
            (targetType?.scrollTarget && opt.value === "scroll-target") ||
            (targetType?.url && opt.value === "url") ||
            (targetType?.whatApps && opt.value === "whatApps") ||
            (targetType?.localPage && opt.value === "local-page")
          );
        });

      if (currentTargetOption) {
        setSelectedOption(currentTargetOption);
      }
    }
  }, [isEditingContent, selectedContent, optionsTarget]);

  useEffect(() => {
    if (
      (!isEditingContent &&
        selectedOption &&
        selectedOption.value === "local-page") ||
      (isEditingContent &&
        selectedOption &&
        selectedOption.value === "local-page" &&
        !selectedContent.target?.localPage?.value)
    ) {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection?.id
            ? {
                ...item,
                content: item.content.map((content) =>
                  content.id === currentContent?.id
                    ? {
                        ...content,
                        content: content.content.map((contentItem) => {
                          return String(contentItem.id) ===
                            String(contentIdToCheck)
                            ? {
                                ...contentItem,
                                target: {
                                  localPage:
                                    localPageTargetOptions[0].options[0].value,
                                },
                              }
                            : contentItem;
                        }),
                      }
                    : content
                ),
              }
            : item
        )
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  useEffect(() => {
    if (
      (!isEditingContent &&
        selectedOption &&
        selectedOption.value === "scroll-target") ||
      (isEditingContent &&
        selectedOption &&
        selectedOption.value === "scroll-target" &&
        !selectedContent.target?.scrollTarget?.value)
    ) {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection?.id
            ? {
                ...item,
                content: item.content.map((content) =>
                  content.id === currentContent?.id
                    ? {
                        ...content,
                        content: content.content.map((contentItem) => {
                          return String(contentItem.id) ===
                            String(contentIdToCheck)
                            ? {
                                ...contentItem,
                                target: {
                                  scrollTarget: optionsScrollTarget[0],
                                },
                              }
                            : contentItem;
                        }),
                      }
                    : content
                ),
              }
            : item
        )
      );

      setSelectedOptionScrollTarget(optionsScrollTarget[0]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  useEffect(() => {
    if (isEditingContent) {
      const currentScrollTarget = optionsScrollTarget.find(
        (opt) => opt.id === selectedContent?.target?.scrollTarget?.id
      );

      if (currentScrollTarget) {
        setSelectedOptionScrollTarget(currentScrollTarget);
      }
    }
  }, [
    isEditingContent,
    optionsScrollTarget,
    selectedContent,
    setSelectedOptionScrollTarget,
  ]);

  const handleChangeOptions = (selectedOptionValue) => {
    setSelectedOption(selectedOptionValue);
    if (!selectedOptionValue.value) {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection?.id
            ? {
                ...item,
                content: item.content.map((content) =>
                  content.id === currentContent?.id
                    ? {
                        ...content,
                        content: content.content.map((contentItem) => {
                          return String(contentItem.id) ===
                            String(contentIdToCheck)
                            ? {
                                ...contentItem,
                                target: {},
                              }
                            : contentItem;
                        }),
                      }
                    : content
                ),
              }
            : item
        )
      );
      setSelectedOptionScrollTarget(undefined);
    }

    setWhatApps({});
    setSelectedOptionScrollTarget(undefined);
    setUrl({});
  };

  const handleCancel = () => {
    setIsListIconContentVisible(false);

    if (imageUrl) {
      setImageUrl(imageUrl);
      setIcon({});
      handleChangeImageUrl(imageUrl);
    } else {
      handleChangeIcon(previousIcon);
    }
  };

  const handleConfirm = () => {
    setIsListIconContentVisible(false);
    if (icon.iconName) {
      setImageUrl("");
    }
  };

  const iconPack = useFontAwesomeIconPack();
  const [previousIcon, setPreviousIcon] = useState("");

  const [icon, setIcon] = useState(
    isEditingContent ? selectedContent?.icon : ""
  );
  const [imageUrl, setImageUrl] = useState(
    isEditingContent ? selectedContent?.image : ""
  );

  const [iconSize, setIconSize] = useState(
    isEditingContent ? selectedContent?.iconSize : 20
  );
  const [imageSize, setImageSize] = useState(
    isEditingContent ? selectedContent?.imageSize : 30
  );

  const handleChangeIcon = (value) => {
    setIcon(value);

    if (!isEditingContent) {
      setSetting((prev) => ({
        ...prev,
        image: "",
        icon: value,
      }));
    } else {
      setSelectedContent((prev) => ({
        ...prev,
        image: "",
        icon: value,
      }));
    }

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection?.id
          ? {
              ...item,
              content: item.content.map((content) =>
                content.id === currentContent?.id
                  ? {
                      ...content,
                      content: content.content.map((contentItem) => {
                        return String(contentItem.id) ===
                          String(contentIdToCheck)
                          ? {
                              ...contentItem,
                              image: "",
                              icon: value,
                            }
                          : contentItem;
                      }),
                    }
                  : content
              ),
            }
          : item
      )
    );
  };

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
    setIsListIconContentVisible(true);
  };

  const handleChangeImageUrl = (value) => {
    if (!isEditingContent) {
      setSetting((prev) => ({
        ...prev,
        image: value,
        icon: "",
      }));
    } else {
      setSelectedContent((prev) => ({
        ...prev,
        image: value,
        icon: "",
      }));
    }

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection?.id
          ? {
              ...item,
              content: item.content.map((content) =>
                content.id === currentContent?.id
                  ? {
                      ...content,
                      content: content.content.map((contentItem) => {
                        return String(contentItem.id) ===
                          String(contentIdToCheck)
                          ? {
                              ...contentItem,
                              image: value,
                              icon: "",
                            }
                          : contentItem;
                      }),
                    }
                  : content
              ),
            }
          : item
      )
    );
  };

  const handleSetValueWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "iconSize") {
      setIconSize(newValue);
    } else if (key === "imageSize") {
      setImageSize(newValue);
    }
    handleChangeContent(key, newValue);
  };

  const handleChangeLocalPage = (value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection?.id
          ? {
              ...item,
              content: item.content.map((content) =>
                String(content.id) === String(currentContent?.id)
                  ? {
                      ...content,
                      content: content.content.map((contentItem) =>
                        contentItem.id === contentIdToCheck
                          ? {
                              ...contentItem,
                              target: {
                                localPage: {
                                  value,
                                },
                              },
                            }
                          : contentItem
                      ),
                    }
                  : content
              ),
            }
          : item
      )
    );
  };

  return (
    <>
      {isListIconContentVisible ? (
        <>
          <Confirmation
            handleCancel={handleCancel}
            handleConfirm={handleConfirm}
          />

          <IconPicker
            value={icon}
            onChange={(value) => handleChangeIcon(value)}
          />
        </>
      ) : (
        <div
          style={{ overflowY: "auto", height: "calc(100vh - 110px)" }}
          className="p-3"
        >
          <Input
            label="Teks"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />

          <SelectOptions
            label="Perlihatkan Ketika"
            options={shownOnWhenOptions}
            onChange={(selectedOption) => {
              setShownOnWhen(selectedOption);
              handleChangeContent("shownOnWhen", selectedOption.value);
            }}
            value={shownOnWhen}
            width="50"
          />

          <form>
            <div style={{ gap: 10 }} className="d-flex align-items-center">
              <SelectOptions
                label="Target"
                options={optionsTarget}
                onChange={handleChangeOptions}
                value={selectedOption}
                width="50"
              />

              {selectedOption?.value === "local-page" && (
                <SelectOptions
                  label="Link Ke"
                  options={localPageTargetOptions}
                  onChange={(selectedOption) => {
                    setLocalPageTarget(selectedOption);
                    handleChangeLocalPage(selectedOption.value);
                  }}
                  value={localPageTarget}
                  width="50"
                />
              )}
            </div>

            {selectedOption?.value === "url" && (
              <UrlInput
                id="urlOpenNewTabText&Img"
                url={url}
                handleUrlChange={(newValue) => {
                  setUrl((prevValue) => ({
                    ...prevValue,
                    url: newValue,
                  }));
                }}
                handleUrlOpenNewTabChange={handleUrlOpenNewTabChange}
              />
            )}

            {selectedOption?.value === "whatApps" && (
              <WhatsAppInput
                id="waOpenNewTabText&Img"
                whatApps={whatApps}
                handlePhoneNumberChange={(newValue) => {
                  setWhatApps((prevValue) => ({
                    ...prevValue,
                    phoneNumber: newValue,
                  }));
                }}
                handleMessageChange={(newValue) => {
                  setWhatApps((prevValue) => ({
                    ...prevValue,
                    message: newValue,
                  }));
                }}
                handleUrlOpenNewTabWaChange={handleUrlOpenNewTabWaChange}
              />
            )}

            {selectedOption?.value === "scroll-target" && (
              <ScrollTargetInput
                optionsScrollTarget={optionsScrollTarget}
                handleChangeScrollTarget={handleChangeScrollTarget}
                selectedOptionScrollTarget={selectedOptionScrollTarget}
              />
            )}
          </form>

          {selectedOption.value !== undefined && <FacebookPixel />}

          <div className="my-3">
            <label>Icon</label>
            {imageUrl && (
              <div
                style={{
                  backgroundColor: "#F5F5F5",
                  width: 146,
                  height: 40,
                  overflow: "hidden",
                }}
                className="mx-auto mb-2"
              >
                <img
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: 100,
                  }}
                  src={imageUrl}
                  alt="img"
                />
              </div>
            )}

            {iconPack &&
              iconPack.length > 0 &&
              Object.keys(icon).length > 0 && (
                <div
                  style={{
                    backgroundColor: "#F5F5F5",
                    width: "100%",
                    overflow: "hidden",
                  }}
                  className="mx-auto mb-2 p-2"
                >
                  <div>
                    <FontAwesomeIcon
                      icon={[`${icon.prefix}`, icon.iconName]}
                      size="xl"
                    />
                  </div>
                </div>
              )}

            <div style={{ gap: 5 }} className="d-flex align-items-center">
              <CButton
                onClick={handleFileUpload}
                color="primary"
                variant="outline"
              >
                Upload
              </CButton>

              <CButton
                onClick={() => handleSearchIcon(icon)}
                color="primary"
                variant="outline"
              >
                Cari
              </CButton>
            </div>
          </div>

          {isIconSizeAndImageSizeVisible?.icon && (
            <InputRangeWithNumber
              label="Ukuran Icon"
              value={iconSize}
              onChange={(newValue) => {
                setIconSize(newValue);
                handleChangeContent("iconSize", newValue);
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
                handleChangeContent("imageSize", newValue);
              }}
              min={10}
              max={100}
              onBlur={() =>
                handleSetValueWhenBlur(imageSize, 10, 100, "imageSize")
              }
            />
          )}
        </div>
      )}
    </>
  );
};

export default UpdateContent;
