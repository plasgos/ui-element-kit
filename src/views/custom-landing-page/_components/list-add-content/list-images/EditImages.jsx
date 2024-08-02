import { CButton, CCard, CTooltip } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import Select from "react-select";
import { optionsScrollTarget, optionsTarget } from "../../options-select";

export const EditImages = ({
  sections,
  idSection,
  idContent,
  altValue,
  target,
  image,
  setPreviewSection,
}) => {
  const [imageUrl, setImageUrl] = useState(image);
  const [alt, setAlt] = useState(altValue);
  const [url, setUrl] = useState(target?.url);
  const [whatApps, setWhatApps] = useState(target?.whatApps);
  const [selectedOption, setSelectedOption] = useState(undefined);
  console.log("🚀 ~ selectedOption:", selectedOption);
  const [selectedOptionScrollTarget, setSelectedOptionScrollTarget] =
    useState(undefined);

  const [updatedOptionsScrollTarget, setUpdatedOptionsScrollTarget] =
    useState(optionsScrollTarget);
  const handleChange = (selectedOptionValue) => {
    setSelectedOption(selectedOptionValue);
  };

  const handleChangeScrollTarget = (selectedOption) => {
    setSelectedOptionScrollTarget(selectedOption);

    resetUrlValue();
    resetWhatAppsValue();

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(idContent)
                  ? {
                      ...contentItem,
                      target: {
                        ...contentItem.target,
                        whatApps,
                        url,
                        scrollTarget: {
                          target: selectedOption.value,
                          isActive: true,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  useEffect(() => {
    if (selectedOption && selectedOption.value === "scroll-target") {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === idSection
            ? {
                ...item,
                content: item.content.map((contentItem) =>
                  String(contentItem.id) === String(idContent)
                    ? {
                        ...contentItem,
                        target: {
                          ...contentItem.target,
                          whatApps,
                          url,
                          scrollTarget: {
                            target: "back-to-top",
                            isActive: true,
                          },
                        },
                      }
                    : contentItem
                ),
              }
            : item
        )
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  useEffect(() => {
    if (sections) {
      const filteredScrolltarget = sections
        .filter((section) => section.name === "scroll-target")
        .reduce((acc, item) => {
          acc = {
            value: item.content.name,
            label: item.content.name,
          };
          return acc;
        }, {});

      setUpdatedOptionsScrollTarget((prev) => [...prev, filteredScrolltarget]);
    }
  }, [sections]);

  useEffect(() => {
    if (url?.url) {
      setSelectedOption({ value: "url", label: "URL" });
    }
  }, [url]);

  useEffect(() => {
    if (whatApps?.phoneNumber) {
      setSelectedOption({ value: "whatApps", label: "Whatapps" });
    }
  }, [whatApps]);

  useEffect(() => {
    const resetTarget = {
      url: {
        url: "",
        isOpenNewTab: false,
      },
      whatApps: {
        phoneNumber: "",
        message: "",
        isOpenNewTab: false,
      },
      scrollTarget: {
        target: "back-to-top",
        isActive: false,
      },
    };

    if (selectedOption?.value === "noLink") {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === idSection
            ? {
                ...item,
                content: item.content.map((contentItem) =>
                  String(contentItem.id) === String(idContent)
                    ? {
                        ...contentItem,
                        target: resetTarget,
                      }
                    : contentItem
                ),
              }
            : item
        )
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

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

  // Efek ini akan dipanggil setiap kali imageUrl berubah
  useEffect(() => {
    // Update tempSections setelah imageUrl berubah
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(idContent)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        image: imageUrl,
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  const handleAltChange = (value) => {
    setAlt(value);

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(idContent)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        alt: value,
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const resetWhatAppsValue = () => {
    setWhatApps({
      phoneNumber: "",
      message: "",
      isOpenNewTab: false,
    });
  };

  const resetUrlValue = () => {
    setUrl({
      url: "",
      isOpenNewTab: false,
    });
  };

  const handleUrlChange = (value) => {
    resetWhatAppsValue();
    setUrl((prevValue) => ({
      ...prevValue,
      url: value,
    }));

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(idContent)
                  ? {
                      ...contentItem,
                      target: {
                        ...contentItem.target,
                        whatApps,
                        url: {
                          ...contentItem.target.url,
                          url: value,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handleUrlOpenNewTabChange = (value) => {
    resetWhatAppsValue();
    setUrl((prevValue) => ({
      ...prevValue,
      isOpenNewTab: value,
    }));

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(idContent)
                  ? {
                      ...contentItem,
                      target: {
                        ...contentItem.target,
                        whatApps,
                        url: {
                          ...contentItem.target.url,
                          isOpenNewTab: value,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handlePhoneNumberChange = (value) => {
    resetUrlValue();
    setWhatApps((prevValue) => ({
      ...prevValue,
      phoneNumber: value,
    }));

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(idContent)
                  ? {
                      ...contentItem,
                      target: {
                        ...contentItem.target,
                        url,
                        whatApps: {
                          ...contentItem.target.whatApps,
                          phoneNumber: value,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handleMessageChange = (value) => {
    resetUrlValue();
    setWhatApps((prevValue) => ({
      ...prevValue,
      message: value,
    }));

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(idContent)
                  ? {
                      ...contentItem,
                      target: {
                        ...contentItem.target,
                        url,
                        whatApps: {
                          ...contentItem.target.whatApps,
                          message: value,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handleUrlOpenNewTabWaChange = (value) => {
    resetUrlValue();
    setWhatApps((prevValue) => ({
      ...prevValue,
      isOpenNewTab: value,
    }));

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(idContent)
                  ? {
                      ...contentItem,
                      target: {
                        ...contentItem.target,
                        url,
                        whatApps: {
                          ...contentItem.target.whatApps,
                          isOpenNewTab: value,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const customStyles = {
    groupHeading: (provided) => ({
      ...provided,
      fontWeight: "bold",
    }),
    control: (baseStyles, state) => ({
      ...baseStyles,
      cursor: "text",
    }),
  };

  return (
    <CCard
      style={{
        borderRadius: 0,
        border: 0,
      }}
    >
      <div style={{ zIndex: 1 }} className="w-100">
        <div className="mb-2">
          <div
            style={{
              backgroundColor: "#F5F5F5",
              width: "100%",
              overflow: "hidden",
            }}
            className="mx-auto mb-2"
          >
            <img
              style={{ objectFit: "contain", width: "100%", height: 100 }}
              src={imageUrl || image}
              alt="img"
            />
          </div>

          <CButton
            onClick={handleFileUpload}
            color="primary"
            variant="outline"
            className="btn-block"
          >
            Upload
          </CButton>
        </div>

        <form>
          <div className="form-group">
            <label>Alt</label>
            <input
              value={alt}
              onChange={(event) => handleAltChange(event.target.value)}
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group ">
            <label>Target</label>
            <Select
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "#FED4C6",
                  // Set the color when focused
                },
              })}
              classNames={{
                control: (state) =>
                  state.isFocused ? "rounded  border-primary" : "rounded",
              }}
              options={optionsTarget}
              styles={customStyles}
              onChange={handleChange}
              isSearchable={false}
              value={selectedOption}
              defaultValue={optionsTarget[0].options[0]}
            />
          </div>
          {selectedOption?.value === "url" && (
            <div className="form-group">
              <label>URL</label>
              <input
                value={url.url}
                onChange={(event) => handleUrlChange(event.target.value)}
                type="text"
                className="form-control"
              />

              <div className="d-flex align-items-center my-1">
                <input
                  checked={url.isOpenNewTab}
                  onChange={(event) =>
                    handleUrlOpenNewTabChange(event.target.checked)
                  }
                  style={{ cursor: "pointer" }}
                  type="checkbox"
                />
                <div className="ml-1">Buka di tab baru</div>
              </div>
            </div>
          )}

          {selectedOption?.value === "whatApps" && (
            <>
              <div className="form-group">
                <div className="d-flex align-items-center mb-2">
                  <label className="p-0 m-0">Nomor Telepon</label>
                  <CTooltip content="Akan langsung membuka aplikasi Whatapps untuk memulai percakapan dengan nomor tertera ">
                    <FaCircleInfo style={{ marginLeft: 4 }} size={12} />
                  </CTooltip>
                </div>

                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      +62
                    </span>
                    <input
                      style={{ borderRadius: "0px 0.5rem 0.5rem 0px" }}
                      aria-describedby="basic-addon1"
                      placeholder="8114002323"
                      value={whatApps.phoneNumber}
                      onChange={(event) =>
                        handlePhoneNumberChange(event.target.value)
                      }
                      type="number"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Pesan (Opsional)</label>
                <input
                  placeholder="Tuliskan pesan kamu di sini"
                  value={whatApps.message}
                  onChange={(event) => handleMessageChange(event.target.value)}
                  type="text"
                  className="form-control"
                />
                <div className="d-flex align-items-center my-1">
                  <input
                    checked={whatApps.isOpenNewTab}
                    onChange={(event) =>
                      handleUrlOpenNewTabWaChange(event.target.checked)
                    }
                    style={{ cursor: "pointer" }}
                    type="checkbox"
                  />
                  <div className="ml-1">Buka di tab baru</div>
                </div>
              </div>
            </>
          )}

          {selectedOption?.value === "scroll-target" && (
            <div className="form-group ">
              <div className="d-flex align-items-center mb-2">
                <label className="p-0 m-0">Target</label>
                <CTooltip
                  content={`Untuk menggunakan tipe link ini, mohon tambahkan seksi "Scroll Target di halaman ini" `}
                >
                  <FaCircleInfo style={{ marginLeft: 4 }} size={12} />
                </CTooltip>
              </div>
              <Select
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "#FED4C6",
                    // Set the color when focused
                  },
                })}
                classNames={{
                  control: (state) =>
                    state.isFocused ? "rounded  border-primary" : "rounded",
                }}
                options={updatedOptionsScrollTarget}
                styles={customStyles}
                onChange={handleChangeScrollTarget}
                isSearchable={false}
                value={selectedOptionScrollTarget}
                defaultValue={updatedOptionsScrollTarget[0]}
              />
            </div>
          )}
        </form>
      </div>
    </CCard>
  );
};
