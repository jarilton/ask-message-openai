import React, { useCallback, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
  StyleSheet,
} from 'react-native';

type Props = { onSend: (text: string) => void; disabled?: boolean };

export const InputBar: React.FC<Props> = ({ onSend, disabled }) => {
  const [value, setValue] = useState('');

  const handleSend = useCallback(() => {
    const t = value.trim();
    if (!t) return;
    onSend(t);
    setValue('');
    Keyboard.dismiss();
  }, [value, onSend]);

  return (
    <View style={styles.container}>
      <TextInput
        accessibilityLabel="Campo de mensagem"
        value={value}
        onChangeText={setValue}
        placeholder="Escreva uma mensagem..."
        multiline
        style={styles.input}
      />
      <TouchableOpacity
        disabled={disabled}
        onPress={handleSend}
        accessibilityLabel="Enviar mensagem"
        style={[
          styles.button,
          disabled ? styles.buttonDisabled : styles.buttonEnabled,
        ]}
      >
        <Text style={disabled ? styles.textDisabled : styles.textEnabled}>
          Enviar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb', // cinza-200
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  button: {
    marginLeft: 8,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonEnabled: {
    backgroundColor: '#16a34a', // verde-600
  },
  buttonDisabled: {
    backgroundColor: '#d1d5db', // cinza-300
  },
  textEnabled: {
    color: '#fff',
  },
  textDisabled: {
    color: '#4b5563', // cinza-600
  },
});
