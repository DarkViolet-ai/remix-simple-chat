import { useState, useEffect } from "react";
import Box from "~/components/buildingBlocks/box";
import Icon from "~/components/buildingBlocks/icon";
import VStack from "~/components/buildingBlocks/vStack";
import {
  ClockIcon,
  DateTimePickerLabelStyles,
  DateTimePickerStyles,
} from "styles";
import HStackFull from "./hStackFull";
import VStackFull from "./vStackFull";
import useEscapeKey from "~/utils/useEscapeKey";
import { CloseButton } from "./closeButton";
import Transition from "./transition";
import Text from "./text";

interface TimePickerProps {
  selectedTime: Date;
  onSelectTime: (time: Date) => void;
  isEditTime: boolean;
  setIsEditDate: (isEditDate: boolean) => void;
  setIsEditTime: (isEditTime: boolean) => void;
}

const ScrollableSelector = ({
  items,
  onSelect,
  selectedItem,
  label,
}: {
  items: number[];
  onSelect: (item: number) => void;
  selectedItem: number;
  label: string;
}) => {
  return (
    <VStack className="w-35%" gap="gap-[0.5vh]">
      <Text className={`${DateTimePickerLabelStyles}`}>{label}</Text>
      <VStackFull
        className={`overflow-auto h-[23vh] max-h-[25vh] py-[1vh] items-start insetShadowMd bg-100-diagonal3op75`}
        gap="gap-[0.7vh]"
      >
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className={` px-[0.4vh] ${
              item === selectedItem
                ? "bg-col-200 text-col-900 transition-300"
                : "hover:bg-col-200 hover:text-col-900"
            }`}
          >
            {String(item < 10 ? `0${item}` : item)}
          </button>
        ))}
      </VStackFull>
    </VStack>
  );
};

const TimePicker = ({
  selectedTime,
  onSelectTime,
  isEditTime,
  setIsEditDate,
  setIsEditTime,
}: TimePickerProps) => {
  //   const [showTimePicker, setShowTimePicker] = useState(false);
  const [hour, setHour] = useState(selectedTime.getHours());
  const [minute, setMinute] = useState(selectedTime.getMinutes());
  const [isPM, setIsPM] = useState(selectedTime.getHours() >= 12);
  const zIndex = isEditTime ? "z-20" : "";
  useEffect(() => {
    const newTime = new Date(selectedTime);
    newTime.setHours(isPM ? hour + 12 : hour, minute);
    onSelectTime(newTime);
  }, [hour, minute, isPM, onSelectTime, selectedTime]);

  const toggleAmPm = () => setIsPM(!isPM);
  useEscapeKey(() => setIsEditTime(false));
  return (
    <div className="relative">
      <Box className="relative">
        <Icon
          icon={ClockIcon}
          containerClassName="absolute top-[0.8vh] right-[1.1vh] text-col-900 hover:cursor-pointer"
          onClick={() => {
            setIsEditTime(!isEditTime);
            setIsEditDate(false);
          }}
        />
        <input
          type="text"
          readOnly
          value={`${hour % 12 === 0 ? 12 : hour % 12}:${
            minute < 10 ? `0${minute}` : minute
          } ${isPM ? "PM" : "AM"}`}
          className={`form-input inputStyles font-semibold w-[18vh] lg:w-[25vh] cursor-pointer`}
          onClick={() => {
            setIsEditTime(!isEditTime);
            setIsEditDate(false);
          }}
        />
      </Box>
      {isEditTime && (
        <Transition>
          <VStack className={`${DateTimePickerStyles} right-0 ${zIndex}`}>
            <HStackFull className="justify-evenly items-stretch">
              <ScrollableSelector
                label="hour"
                items={Array.from({ length: 12 }, (_, i) => i + 1)}
                onSelect={setHour}
                selectedItem={hour % 12 === 0 ? 12 : hour % 12}
              />
              <ScrollableSelector
                label="min"
                items={Array.from({ length: 60 }, (_, i) => i)}
                onSelect={setMinute}
                selectedItem={minute}
              />
              <VStack className="w-20% pt-[4.5vh] pl-[1vh] h-[27vh] justify-between items-end">
                <VStack className="pr-[1.5vh]">
                  <button
                    onClick={toggleAmPm}
                    className={`w-full px-[0.7vh] ${
                      isPM
                        ? "bg-transparent text-col-100 hover:bg-col-200 hover:text-col-900 transition-300"
                        : "bg-col-200 text-col-900 hover:bg-col-200 hover:text-col-900"
                    }`}
                  >
                    am
                  </button>
                  <button
                    onClick={toggleAmPm}
                    className={`w-full px-[0.5vh] ${
                      !isPM
                        ? "bg-transparent text-col-100 hover:bg-col-200 hover:text-col-900 transition-300"
                        : "bg-col-200 text-col-900 hover:bg-col-200 hover:text-col-900"
                    }`}
                  >
                    pm
                  </button>
                </VStack>
                <CloseButton
                  type="smallNormal"
                  onClose={() => setIsEditTime(false)}
                />
              </VStack>
            </HStackFull>
          </VStack>
        </Transition>
      )}
    </div>
  );
};

export default TimePicker;
