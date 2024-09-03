import { CCard, CCardBody } from "@coreui/react";
import React, { useRef, useState } from "react";
import { IoCloseOutline, IoMenu } from "react-icons/io5";
import { useDrag, useDrop } from "react-dnd";

export const ItemTypes = {
  CARD: "card",
};

export const DraggableListOption = ({
  index,
  id,
  showInfoText,
  moveSection,
  removeSection,
  setPreviewSection,
  idSection,
  idOption,
}) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveSection(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const [labelOption, setLabelOption] = useState(showInfoText);

  const handleChangeLabelOption = (value, id) => {
    setLabelOption(value);
    setPreviewSection((prevSections) =>
      prevSections.map((section) => {
        if (section.id === idSection) {
          return {
            ...section,
            content: section.content.map((contentItem) => {
              if (contentItem.type === "multiSelect") {
                return {
                  ...contentItem,
                  options: contentItem.options.map((opt) =>
                    opt.id === id
                      ? {
                          ...opt,
                          label: value,
                        }
                      : opt
                  ),
                };
              }
              return contentItem;
            }),
          };
        }
        return section;
      })
    );
  };

  return (
    <div style={{ opacity }}>
      <CCard style={{ cursor: "move" }} className="mb-2">
        <CCardBody className="p-1">
          <div style={{ gap: 10 }} className="d-flex align-items-center">
            <div ref={ref} data-handler-id={handlerId}>
              <IoMenu style={{ cursor: "move" }} size={18} />
            </div>

            <div style={{ flexGrow: 1 }}>
              <input
                id={idOption}
                value={labelOption || ""}
                type="text"
                style={{ border: "none", outline: "none" }}
                onChange={(e) => {
                  const { value } = e.target;
                  const { id } = e.target;
                  handleChangeLabelOption(value, id);
                }}
              />
            </div>

            <IoCloseOutline
              onClick={() => removeSection()}
              style={{ cursor: "pointer" }}
              size={18}
            />
          </div>
        </CCardBody>
      </CCard>
    </div>
  );
};
