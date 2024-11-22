import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const FechaNacimientoPicker = ({ value, onChange, error, touched }: any) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : null
  );

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: Date) => {
    const formattedDateForStorage = formatForStorage(date);
    setSelectedDate(date); // Mantiene el objeto Date
    onChange(formattedDateForStorage); // Envía el valor formateado
    hideDatePicker();
  };

  const formatForStorage = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
  };

  const formatForDisplay = (date: Date | null): string => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Formato DD/MM/YYYY
  };

  return (
    <>
      <TouchableOpacity
        onPress={showDatePicker}
        className={`${
          error && touched
            ? "border-[3px] border-red-500"
            : "border border-gray-300"
        } h-12 mr-4 rounded-md px-4 flex-1 justify-center bg-white`}
      >
        <Text className={`${!selectedDate ? "text-gray-500" : "text-black"}`}>
          {selectedDate
            ? formatForDisplay(selectedDate)
            : "Fecha de nacimiento"}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={selectedDate || new Date()} // Pasa siempre un objeto Date
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
      />
    </>
  );
};

export default FechaNacimientoPicker;
