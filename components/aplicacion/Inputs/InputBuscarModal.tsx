import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList } from 'react-native';

const InputBuscarModal = ({ options, onSelect }: any) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);

    // Manejar la apertura del modal
    const openModal = () => setModalVisible(true);

    // Manejar el cierre del modal
    const closeModal = () => {
        setModalVisible(false);
        setSearchTerm('');
        setFilteredOptions(options);
    };

    // Filtrar opciones en función del término de búsqueda
    const handleSearch = (value: any) => {
        setSearchTerm(value);
        const filtered = options.filter((option: any) =>
            option.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredOptions(filtered);
    };

    // Manejar la selección de un elemento
    const handleSelect = (option: any) => {
        onSelect(option);
        closeModal();
    };

    return (
        <View className="flex-1">
            {/* Input que abrirá el modal */}
            <TouchableOpacity onPress={openModal} className="border p-2 rounded-md">
                <TextInput
                    placeholder="Seleccionar opción..."
                    editable={false}
                    className="text-gray-500"
                />
            </TouchableOpacity>

            {/* Modal */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
            >
                <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                    <View className="bg-white w-4/5 p-4 rounded-lg">
                        {/* Search bar */}
                        <TextInput
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChangeText={handleSearch}
                            className="border-b border-gray-300 mb-4 p-2"
                        />

                        {/* Lista de opciones filtradas */}
                        <FlatList
                            data={filteredOptions}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        handleSelect(item)
                                    }}
                                    className="p-2 border-b border-gray-200"
                                >
                                    <Text className="text-gray-700">{item}</Text>
                                </TouchableOpacity>
                            )}
                        />

                        {/* Botón para cancelar y cerrar el modal */}
                        <TouchableOpacity onPress={closeModal} className="mt-4 bg-red-500 p-2 rounded-md">
                            <Text className="text-white text-center">Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default InputBuscarModal;
