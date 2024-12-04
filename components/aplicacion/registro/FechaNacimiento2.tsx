import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { obtenerFechaEntregada } from "../../../utils/dateUtils";

interface CalendarPicker2Props {
  initialDate?: any;
  onDateChange?: (date: Date) => void;
}

const CalendarPicker2: React.FC<CalendarPicker2Props> = ({
  initialDate,
  onDateChange,
}: any) => {
  const formatDateDate = (date: any): any => {
    const fecha = `${date}T12:00:00.000Z`;
    return new Date(fecha);
  };

  const [date, setDate] = useState<any>(formatDateDate(initialDate));

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Mes (0-indexed)
    const day = date.getDate().toString().padStart(2, "0"); // Día
    return `${year}-${month}-${day}`; // Formato "YYYY-MM-DD"
  };

  const onChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
      onDateChange?.(formatDate(selectedDate));
    }
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
      maximumDate: new Date(),
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      className="px-4 py-2 border h-12 rounded-md flex-1 justify-center bg-white border-gray-300"
      onPress={() => showMode("date")}
    >
      <Text className="text-sm">{obtenerFechaEntregada(date)}</Text>
    </TouchableOpacity>
  );
};

export default CalendarPicker2;
