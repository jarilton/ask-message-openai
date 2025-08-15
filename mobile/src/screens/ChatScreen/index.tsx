import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import { useChat } from "../../hooks/useChat";
import MessageBubble from "../../components/MessageBubble";
import { Message } from "../../models/Message";

export default function ChatScreen() {
  const { state, sendMessage, clearChat } = useChat();
  const [input, setInput] = useState("");
  const listRef = useRef<FlatList>(null);
  const renderItem = useCallback(
    ({ item }: { item: Message }) => <MessageBubble message={item} />,
    []
  );
  const keyExtractor = useCallback((item: Message) => item.id, []);
  const ListHeader = useMemo(() => <View style={{ height: 8 }} />, []);

 const messages: Message[] = state.messages.map(m => ({
  id: m.id,
  sender: m.role === 'user' ? 'me' : 'ai', 
  text: m.content,
  createdAt: m.createdAt ?? new Date().toISOString(),
}));

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {" "}
      <FlatList
        ref={listRef}
        data={[...messages].reverse()}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onContentSizeChange={() =>
          listRef.current?.scrollToEnd({ animated: true })
        }
        inverted
        contentContainerStyle={{ padding: 12 }}
        ListHeaderComponent={ListHeader}
        accessibilityLabel="Lista de mensagens"
      />{" "}
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={input}
        onChangeText={setInput}
        placeholder="Digite sua pergunta..."
      />{" "}
      <View style={{ flexDirection: "row" }}>
        {" "}
        <Button
          title={state.loading ? "Enviando..." : "Enviar"}
          onPress={() => {
            sendMessage(input);
            setInput("");
          }}
          disabled={state.loading || !input.trim()}
        />{" "}
        <Button title="Limpar" onPress={clearChat} />{" "}
      </View>{" "}
    </View>
  );
}
