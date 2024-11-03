// SearchableDropdownInput.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet, Keyboard } from 'react-native';

const SearchableDropdownInput = ({ options = [], placeholder, onSelect }: any) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [activeOption, setActiveOption] = useState(null); // Nueva variable de estado para controlar el "hover/active"

  // Filtra las opciones según lo que se escriba
  const handleInputChange = (text: any) => {
    setInputValue(text);

    if (text.length > 0) {
      const filtered = options.filter((option: any) =>
        option.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options); // Muestra todas las opciones si no hay texto
    }
  };

  // Muestra todas las opciones al enfocar el input
  const handleFocus = () => {
    setShowDropdown(true);
    setFilteredOptions(options); // Muestra todas las opciones al enfocarse
  };

  // Maneja la selección de una opción
  const handleSelect = (item: any) => {
    setInputValue(item);
    setShowDropdown(false);
    setSelectedOption(item);
    onSelect(item);
    Keyboard.dismiss(); // Cierra el teclado automáticamente al seleccionar
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder || 'Search...'}
        placeholderTextColor="#B0B0B0" // Placeholder gris
        value={inputValue}
        onChangeText={handleInputChange}
        onFocus={handleFocus}
      />

      {/* Mostrar las opciones filtradas si showDropdown es true */}
      {showDropdown && (
        <ScrollView
          style={styles.dropdown}
          keyboardShouldPersistTaps="handled" // Esto asegura que el scroll siga funcionando mientras el teclado está abierto
          nestedScrollEnabled={true}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  selectedOption === item && styles.optionSelected, // Cambia el fondo si está seleccionado
                  activeOption === item && styles.optionActive, // Aplica estilo "hover/active"
                ]}
                onPress={() => handleSelect(item)}
                activeOpacity={1} // Mantén la opacidad al 1 para aplicar nuestro propio efecto de "hover"
                onPressIn={() => setActiveOption(item)} // Activa el estado al presionar
                onPressOut={() => setActiveOption(null)} // Desactiva el estado al soltar
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noOptionsText}>No options available</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: '100%',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: 'white',
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: '#fff',
    maxHeight: 150,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  optionSelected: {
    backgroundColor: '#d3d3d3',
  },
  optionActive: {
    backgroundColor: '#b0c4de',
  },
  optionText: {
    color: '#000',
  },
  noOptionsText: {
    padding: 10,
    textAlign: 'center',
    color: 'gray',
  },
});

export default SearchableDropdownInput;
