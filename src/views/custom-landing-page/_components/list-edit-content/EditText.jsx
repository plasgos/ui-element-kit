import React, { useState } from "react";
import {
  CButton,
  CFormGroup,
  CLabel,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import ReactQuill from "react-quill";
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
} from "react-icons/fa6";
import "react-quill/dist/quill.snow.css";
import "react-slideshow-image/dist/styles.css";
import ColorPicker from "../common/ColorPicker";

const EditText = ({
  currentSection,
  setPreviewSection,
  isShowContent,
  sectionBeforeEdit,
}) => {
  const [editorHtml, setEditorHtml] = useState(
    currentSection.content?.editorHtml
  );
  const [selectAlign, setSelectAlign] = useState(
    currentSection.content?.style?.textAlign
  );
  const [selectedColor, setSelectedColor] = useState(
    currentSection.content?.style?.color
  );

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === String(currentSection.id)
          ? {
              ...item,
              content: {
                ...item.content,
                style: {
                  ...item.content.style,
                  color,
                },
              },
            }
          : item
      )
    );
  };

  const onChangeAlign = (value) => {
    setSelectAlign(value);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === String(currentSection.id)
          ? {
              ...item,
              content: {
                ...item.content,
                style: {
                  ...item.content.style,
                  textAlign: value,
                },
              },
            }
          : item
      )
    );
  };

  const handleEditorChange = (html) => {
    setEditorHtml(html);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === String(currentSection.id)
          ? {
              ...item,
              content: {
                ...item.content,
                editorHtml: html,
              },
            }
          : item
      )
    );
  };

  const handelCancel = () => {
    isShowContent("");
    setPreviewSection([...sectionBeforeEdit]);
  };

  const handelConfirm = () => {
    isShowContent("");
  };

  return (
    <div>
      <div className="d-flex justify-content-end align-items-center border-bottom p-2">
        <div>
          <CButton
            onClick={handelCancel}
            color="primary"
            variant="outline"
            className="mx-2"
          >
            Batal
          </CButton>

          <CButton onClick={handelConfirm} color="primary">
            Selesai
          </CButton>
        </div>
      </div>

      <CTabs activeTab="konten">
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink data-tab="konten">Konten</CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent
          style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
          className="pt-3"
        >
          <CTabPane data-tab="konten">
            <div>
              <div className="d-flex align-items-center justify-content-between">
                <CFormGroup>
                  <CLabel className="mb-2">Posisi Teks</CLabel>
                  <div className="d-flex justify-content-start">
                    <div
                      className={`d-flex align-items-center justify-content-center mr-1 rounded ${
                        selectAlign === "text-left"
                          ? "bg-primary border-primary text-white"
                          : "bg-white border-dark"
                      }`}
                      style={{ cursor: "pointer", width: 35, height: 35 }}
                      onClick={() => onChangeAlign("text-left")}
                    >
                      <FaAlignLeft style={{ fontSize: 15 }} />
                    </div>
                    <div
                      className={`d-flex align-items-center justify-content-center mr-1 rounded ${
                        selectAlign === "text-center"
                          ? "bg-primary border-primary text-white"
                          : "bg-white border-dark"
                      }`}
                      style={{ cursor: "pointer", width: 35, height: 35 }}
                      onClick={() => onChangeAlign("text-center")}
                    >
                      <FaAlignCenter style={{ fontSize: 15 }} />
                    </div>
                    <div
                      className={`d-flex align-items-center justify-content-center mr-1 rounded ${
                        selectAlign === "text-right"
                          ? "bg-primary border-primary text-white"
                          : "bg-white border-dark"
                      }`}
                      style={{ cursor: "pointer", width: 35, height: 35 }}
                      onClick={() => onChangeAlign("text-right")}
                    >
                      <FaAlignRight style={{ fontSize: 15 }} />
                    </div>
                    <div
                      className={`d-flex align-items-center justify-content-center mr-1 rounded ${
                        selectAlign === "text-justify"
                          ? "bg-primary border-primary text-white"
                          : "bg-white border-dark"
                      }`}
                      style={{ cursor: "pointer", width: 35, height: 35 }}
                      onClick={() => onChangeAlign("text-justify")}
                    >
                      <FaAlignJustify style={{ fontSize: 15 }} />
                    </div>
                  </div>
                </CFormGroup>
                <ColorPicker
                  initialColor={selectedColor}
                  label="Warna Teks"
                  onChange={handleColorChange}
                  flexEnd="justify-content-end"
                  bottom={"77px"}
                  left={"236px"}
                />
              </div>

              <ReactQuill
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }],
                    [{ size: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                    ],
                    ["link", "image"],
                    ["clean"],
                  ],
                  clipboard: {
                    // toggle to add extra line breaks when pasting HTML:
                    matchVisual: true,
                  },
                }}
                formats={[
                  "header",
                  "size",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                  "list",
                  "bullet",
                  "indent",
                  "link",
                  "image",
                  "clean",
                ]}
                theme="snow"
                value={editorHtml}
                onChange={handleEditorChange}
                className="text-editor rounded"
              />
            </div>
          </CTabPane>
        </CTabContent>
      </CTabs>
    </div>
  );
};

export default EditText;
