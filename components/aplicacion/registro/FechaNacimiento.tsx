import React, { useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const FechaNacimientoPicker = ({ value, onChange }: any) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(value ? new Date(value) : new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    onChange(selectedDate);
    hideDatePicker();
  };

  const formatDate = (date: Date | string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("es-ES", options).format(new Date(date));
  };

  return (
    <>
      <TouchableOpacity
        onPress={showDatePicker}
        className="h-12 border mr-4 border-gray-300 rounded-md px-4 flex-1 justify-center bg-white"
      >
        <Text className={`${!value ? "text-gray-500" : "text-black"}`}>
          {value ? formatDate(value) : "Fecha de nacimiento"}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={date}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default FechaNacimientoPicker;
