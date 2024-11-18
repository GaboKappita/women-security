import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal } from 'react-native';

const InputDesplegable = ({ options = [], placeholder, onSelect, selectedValue }: any) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleSelect = (item: any) => {
        onSelect(item);
        setIsVisible(false);
    };

    return (
        <View className="my-3">
            <TouchableOpacity
                className="flex-row items-center justify-between border border-gray-300 rounded-lg px-3 py-2"
                onPress={() => setIsVisible(true)}
            >
                <Text className="flex-1 text-base text-white">{selectedValue || placeholder}</Text>
                <Ionicons name="caret-down-outline" size={20} color="gray" />
            </TouchableOpacity>

            <Modal transparent visible={isVisible} animationType="fade">
                <TouchableOpacity
                    className="flex-1 justify-center bg-black bg-opacity-50"
                    onPress={() => setIsVisible(false)}
                >
                    <View className="bg-white mx-4 rounded-lg p-2 max-h-60">
                        <FlatList
                            data={options}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    className="py-2 px-3 border-b border-gray-200"
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default InputDesplegable;
