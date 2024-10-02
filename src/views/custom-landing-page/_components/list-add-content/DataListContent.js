import React from "react";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import { FaClipboardList, FaImage } from "react-icons/fa";
import { FaGripLines, FaListCheck } from "react-icons/fa6";
import { IoMdImages } from "react-icons/io";
import { LuImagePlus, LuQuote } from "react-icons/lu";
import { MdTextFields, MdViewColumn } from "react-icons/md";
import {
  PiArrowsDownUpLight,
  PiTargetDuotone,
  PiVideoLight,
  PiVideoThin,
} from "react-icons/pi";
import { RxButton, RxSwitch } from "react-icons/rx";
import { TfiLayoutAccordionSeparated } from "react-icons/tfi";
import { PiColumnsPlusRightThin } from "react-icons/pi";

export const dataListContent = [
  {
    name: "text",
    title: "Teks",
    icon: <MdTextFields style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("text"),
  },
  {
    name: "column-text-and-image",
    title: "Kolom Teks + Gambar",
    icon: <MdViewColumn style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("column-text-and-image"),
  },
  {
    name: "empty-space",
    title: "Ruang Kosong",
    icon: <PiArrowsDownUpLight style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("empty-space"),
  },
  {
    name: "list-images",
    title: "Daftar Gambar",
    icon: <IoMdImages style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("list-images"),
  },
  {
    name: "scroll-target",
    title: "Scroll Target",
    icon: <PiTargetDuotone style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("scroll-target"),
  },
  {
    name: "button",
    title: "Tombol",
    icon: <RxSwitch style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("button"),
  },
  {
    name: "testimony",
    title: "Testimoni / Review",
    icon: <BsFillChatSquareQuoteFill style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("testimony"),
  },
  {
    name: "line",
    title: "Garis",
    icon: <FaGripLines style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("line"),
  },
  {
    name: "list-feature",
    title: "Daftar Fitur",
    icon: <FaListCheck style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("list-feature"),
  },
  {
    name: "quote",
    title: "Quote",
    icon: <LuQuote style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("quote"),
  },
  {
    name: "faq",
    title: "FAQ Buka/Tutup",
    icon: <TfiLayoutAccordionSeparated style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("faq"),
  },
  {
    name: "form-checkout",
    title: "Formulir Checkout",
    icon: <FaClipboardList style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("form-checkout"),
  },
  {
    name: "floating-button",
    title: "Floating Button",
    icon: <RxButton style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("floating-button"),
  },
  {
    name: "image",
    title: "Gambar",
    icon: <FaImage style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("image"),
  },
  {
    name: "image-text",
    title: "Gambar + Teks",
    icon: <LuImagePlus style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("image-text"),
  },
  {
    name: "multi-column",
    title: "Multi Kolom",
    icon: <PiColumnsPlusRightThin style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("multi-column"),
  },
  {
    name: "video",
    title: "Video",
    icon: <PiVideoLight style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("video"),
  },
  {
    name: "video-text",
    title: "Video + Text",
    icon: <PiVideoThin style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("video-text"),
  },
];
