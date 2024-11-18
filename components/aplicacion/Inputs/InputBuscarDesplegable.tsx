import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';

const InputBuscarDesplegable = ({ options = [], placeholder, onSelect }: any) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Filtra las opciones según lo que se escriba
  const handleInputChange = (text: any) => {
    setInputValue(text);

    if (text.length > 0) {
      const filtered = options.filter((option: any) =>
        option.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredOptions(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  // Maneja la selección de una opción
  const handleSelect = (item: any) => {
    setInputValue(item);
    setShowDropdown(false);
    onSelect(item);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder || 'Search...'}
        placeholderTextColor="#B0B0B0" // Placeholder gris
        value={inputValue}
        onChangeText={handleInputChange}
        onFocus={() => inputValue && setShowDropdown(true)}
      />

      {/* Mostrar las opciones filtradas si showDropdown es true */}
      {showDropdown && (
        <View style={styles.dropdown}>
          <FlatList
            data={filteredOptions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.option} onPress={() => handleSelect(item)}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
            nestedScrollEnabled={true} // Habilita el scroll anidado para evitar advertencias
          />
        </View>
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
    color: 'white', // Para asegurar que el texto ingresado también sea visible si el fondo es oscuro
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: '#fff',
    maxHeight: 150, // Limita la altura máxima del desplegable
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  optionText: {
    color: '#000',
  },
});

export default InputBuscarDesplegable;
