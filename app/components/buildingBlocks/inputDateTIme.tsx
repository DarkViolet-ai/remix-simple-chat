import { useState } from "react";
import DatePicker from "./datePicker";
import HStackFull from "./hStackFull";
import TimePicker from "./timePicker";

export default function InputDateTime({
  dueDate,
  containerHeight,
}: {
  dueDate?: Date;
  containerHeight?: string;
}) {
  
  const [isEditDate, setIsEditDate] = useState(false);
  const [isEditTime, setIsEditTime] = useState(false);
  const height = containerHeight
    ? containerHeight
    : isEditDate || isEditTime
    ? "min-h-[38vh]"
    : "";
  return (
    <HStackFull className={`justify-evenly ${height}`}>
      <DatePicker
        isEditDate={isEditDate}
        setIsEditDate={setIsEditDate}
        setIsEditTime={setIsEditTime}
        dueDate={dueDate ? dueDate : new Date()}
      />
      <TimePicker
        selectedTime={new Date()}
        onSelectTime={() => {}}
        setIsEditDate={setIsEditDate}
        isEditTime={isEditTime}
        setIsEditTime={setIsEditTime}
      />
    </HStackFull>
  );
}
