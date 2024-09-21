import { CButton, CCard, CTabContent } from "@coreui/react";
import React, { useState } from "react";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import { FaClipboardList, FaImage } from "react-icons/fa";
import { FaGripLines, FaListCheck } from "react-icons/fa6";
import { IoMdImages } from "react-icons/io";
import { LuImagePlus, LuQuote } from "react-icons/lu";
import { MdTextFields, MdViewColumn } from "react-icons/md";
import { PiArrowsDownUpLight, PiTargetDuotone } from "react-icons/pi";
import { RxButton, RxSwitch } from "react-icons/rx";
import { TfiLayoutAccordionSeparated } from "react-icons/tfi";
import { SearchForm } from "../common/SearchForm";
import Buttons from "./button";
import ColumnTextAndImages from "./colum-text-and-image";
import EmptySpace from "./empty-space/index";
import FAQ from "./faq";
import FloatingButton from "./floating-button";
import FormCheckout from "./form-checkout";
import Image from "./image";
import ImageText from "./image-text";
import Line from "./line/index";
import ListFeature from "./list-feature";
import ListImagesControl from "./list-images/index";
import Quote from "./quote";
import ScrollTarget from "./scroll-target/index";
import Testimony from "./testimony";
import Text from "./text/index";

const ListContent = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  previewFloatingSection,
  setPreviewFloatingSection,
}) => {
  const dataListContent = [
    {
      name: "text",
      title: "Teks",
      icon: <MdTextFields style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("text"),
    },
    {
      name: "column-text-and-image",
      title: "Kolom Teks + Gambar",
      icon: <MdViewColumn style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("column-text-and-image"),
    },
    {
      name: "empty-space",
      title: "Ruang Kosong",
      icon: <PiArrowsDownUpLight style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("empty-space"),
    },
    {
      name: "list-images",
      title: "Daftar Gambar",
      icon: <IoMdImages style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("list-images"),
    },
    {
      name: "scroll-target",
      title: "Scroll Target",
      icon: <PiTargetDuotone style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("scroll-target"),
    },
    {
      name: "button",
      title: "Tombol",
      icon: <RxSwitch style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("button"),
    },
    {
      name: "testimony",
      title: "Testimoni / Review",
      icon: <BsFillChatSquareQuoteFill style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("testimony"),
    },
    {
      name: "line",
      title: "Garis",
      icon: <FaGripLines style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("line"),
    },
    {
      name: "list-feature",
      title: "Daftar Fitur",
      icon: <FaListCheck style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("list-feature"),
    },
    {
      name: "quote",
      title: "Quote",
      icon: <LuQuote style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("quote"),
    },
    {
      name: "faq",
      title: "FAQ Buka/Tutup",
      icon: (
        <TfiLayoutAccordionSeparated style={{ marginRight: 5 }} size={24} />
      ),
      action: () => setAddContent("faq"),
    },
    {
      name: "form-checkout",
      title: "Formulir Checkout",
      icon: <FaClipboardList style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("form-checkout"),
    },
    {
      name: "floating-button",
      title: "Floating Button",
      icon: <RxButton style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("floating-button"),
    },
    {
      name: "image",
      title: "Gambar",
      icon: <FaImage style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("image"),
    },
    {
      name: "image-text",
      title: "Gambar + Teks",
      icon: <LuImagePlus style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("image-text"),
    },
  ];

  const [addContent, setAddContent] = useState("");
  const [searchContent, setSearchContent] = useState("");
  const [filteredContents, setFilteredContents] = useState(dataListContent);
  const handleChangeContent = (value) => {
    setSearchContent(value);
    const filteredContents = dataListContent.filter((content) =>
      content.title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredContents(filteredContents);
  };

  const handleCancelAddContent = () => {
    isShowContent(false);
    setAddContent("");
  };

  return (
    <div style={{ width: "100%", height: 400 }}>
      {!addContent && (
        <>
          <div className="d-flex justify-content-end align-items-center border-bottom p-2 mb-2">
            <div>
              <CButton
                onClick={handleCancelAddContent}
                color="primary"
                variant="outline"
              >
                Batal
              </CButton>
            </div>
          </div>

          <SearchForm
            placeholder="Cari"
            value={searchContent}
            onChange={(e) => handleChangeContent(e.target.value)}
          />
          <div style={{ marginBottom: 10 }}>Konten</div>
        </>
      )}

      {addContent === "text" ? (
        <Text
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      ) : null}

      {addContent === "column-text-and-image" && (
        <ColumnTextAndImages
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "empty-space" && (
        <EmptySpace
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "list-images" && (
        <ListImagesControl
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "scroll-target" && (
        <ScrollTarget
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "button" && (
        <Buttons
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "testimony" && (
        <Testimony
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "line" && (
        <Line
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "list-feature" && (
        <ListFeature
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "quote" && (
        <Quote
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "faq" && (
        <FAQ
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "form-checkout" && (
        <FormCheckout
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "floating-button" && (
        <FloatingButton
          previewFloatingSection={previewFloatingSection}
          setPreviewFloatingSection={setPreviewFloatingSection}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "image" && (
        <Image
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "image-text" && (
        <ImageText
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      <CTabContent
        style={{
          height: addContent ? 0 : 280,
          paddingRight: 5,
          overflowY: "auto",
        }}
      >
        {!addContent && filteredContents.length > 0 ? (
          filteredContents.map((item, index) => (
            <CCard
              key={index}
              style={{ marginBottom: 10, cursor: "pointer" }}
              onClick={item.action}
            >
              <div className="d-flex align-items-center py-1 px-2">
                <div>{item.icon}</div>
                <div>{item.title}</div>
              </div>
            </CCard>
          ))
        ) : (
          <div className="text-center my-3">Kontent tidak ada !</div>
        )}
      </CTabContent>
    </div>
  );
};

export default ListContent;
