import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../../models/Message';

type Props = { message: Message };

const MessageBubble: React.FC<Props> = ({ message }) => {
  const isMe = message.sender === 'me';

  return (
    <View style={[styles.container, isMe ? styles.containerMe : styles.containerOther]}>
      <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
        <Text style={isMe ? styles.textMe : styles.textOther}>
          {message.text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '75%',
    marginVertical: 4,
  },
  containerMe: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  containerOther: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  bubble: {
    borderRadius: 16,
    padding: 12,
  },
  bubbleMe: {
    backgroundColor: '#16a34a', // verde-600
  },
  bubbleOther: {
    backgroundColor: '#e5e7eb', // cinza-200
  },
  textMe: {
    color: '#fff',
  },
  textOther: {
    color: '#000',
  },
});

export default memo(MessageBubble);
