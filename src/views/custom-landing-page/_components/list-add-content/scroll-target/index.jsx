import { CButton } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { createUniqueID } from "../../../../../lib/unique-id";
import {
  removeOptionScrollTarget,
  setOptionsScrollTarget,
} from "../../../../../redux/modules/custom-landing-page/reducer";
import { useDebounce } from "use-debounce";

const ScrollTarget = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
}) => {
  const [name, setName] = useState(currentSection?.content?.name || "");
  const [isCopiedLink, setIsCopiedLink] = useState(false);
  const [isCopiedAnchor, setIsCopiedAnchor] = useState(false);
  const [setting, setSetting] = useState({});
  const [hasAddedContent, setHasAddedContent] = useState(false);

  const [nameValue] = useDebounce(name, 300);

  const dispatch = useDispatch();

  const generateRandomNumberString = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    return randomNumber.toString();
  };

  useEffect(() => {
    if (!isEditingSection) {
      setName(`Target-${generateRandomNumberString()}`);
    }
  }, [isEditingSection]);

  const copyToClipboardAnchor = () => {
    navigator.clipboard
      .writeText(`#${name}`)
      .then(() => {
        setIsCopiedAnchor(true);
      })
      .catch((err) => {
        console.error("Gagal menyalin: ", err);
      })
      .finally(() => {
        setTimeout(() => {
          setIsCopiedAnchor(false);
        }, 300);
      });
  };

  const baseURLandAnchor = `${window.location.protocol}//${window.location.host}#${name}`;

  const copyToClipboardLink = () => {
    navigator.clipboard
      .writeText(baseURLandAnchor)
      .then(() => {
        setIsCopiedLink(true);
      })
      .catch((err) => {
        console.error("Gagal menyalin: ", err);
      })
      .finally(() => {
        setTimeout(() => {
          setIsCopiedLink(false);
        }, 300);
      });
  };

  const contentIdToCheck = isEditingSection ? currentSection.id : setting.id;

  const handleNameChange = (value) => {
    setPreviewSection((arr) =>
      arr.map((item) => {
        return String(item.id) === contentIdToCheck
          ? {
              ...item,
              content: {
                ...item.content,
                name: value,
                anchor: `#${value}`,
                link: baseURLandAnchor,
              },
            }
          : item;
      })
    );
  };

  useEffect(() => {
    if (nameValue !== currentSection?.content?.name) {
      handleNameChange(nameValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameValue]);

  useEffect(() => {
    if (!isEditingSection) {
      if (name && !hasAddedContent) {
        const handleAddContent = () => {
          let uniqueId = createUniqueID(previewSection);
          let payload = {
            id: uniqueId,
            name: "scroll-target",
            title: "Scrol Target",
            content: {
              name,
              anchor: `#${name}`,
              link: baseURLandAnchor,
            },
          };

          setPreviewSection((prevSections) => [...prevSections, payload]);
          setSetting(payload);
          setHasAddedContent(true);
          dispatch(
            setOptionsScrollTarget({ id: uniqueId, value: name, label: name })
          );
        };

        handleAddContent();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, hasAddedContent, dispatch, isEditingSection]);

  const handleCancel = () => {
    if (isEditingSection) {
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      isShowContent(false);
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => section.id !== setting.id)
      );
      dispatch(removeOptionScrollTarget(setting.id));
    }
  };

  const handleConfirm = async () => {
    await dispatch(
      setOptionsScrollTarget({
        id: contentIdToCheck,
        value: name,
        label: name,
      })
    );
    isShowContent(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-end align-items-center border-bottom p-2 mb-3">
        <div>
          <CButton
            onClick={handleCancel}
            color="primary"
            variant="outline"
            className="mx-2"
          >
            Batal
          </CButton>

          <CButton onClick={handleConfirm} color="primary">
            Selesai
          </CButton>
        </div>
      </div>

      <div className="p-2 rounded-lg w-100 border  bg-secondary mb-3 ">
        "Scroll Target" akan muncul di pilihan "Tipe link" pada tombol dan link
        dalam halaman ini`
      </div>

      <div className="d-flex align-items-center w-100 ">
        <div className="form-group w-100 mb-2">
          <label>Nama</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            className="form-control"
          />
        </div>
      </div>

      <div className="form-group w-100 mb-2">
        <label>Anchor</label>
        <div className="d-flex align-items-center w-100  ">
          <input
            readOnly
            value={`#${name}`}
            type="text"
            className="form-control"
          />
          <CButton
            style={{ whiteSpace: "nowrap" }}
            onClick={copyToClipboardAnchor}
            color="primary"
            variant="outline"
            className="mx-2"
          >
            {isCopiedAnchor ? "Sudah Tercopy" : "Copy"}
          </CButton>
        </div>
      </div>

      <div className="form-group w-100 mb-2">
        <label>Link</label>

        <div className="d-flex align-items-center w-100 ">
          <input
            readOnly
            value={baseURLandAnchor}
            type="text"
            className="form-control"
          />
          <CButton
            style={{ whiteSpace: "nowrap" }}
            onClick={copyToClipboardLink}
            color="primary"
            variant="outline"
            className="mx-2"
          >
            {isCopiedLink ? "Sudah Tercopy" : "Copy"}
          </CButton>
        </div>
      </div>
    </div>
  );
};

export default ScrollTarget;
