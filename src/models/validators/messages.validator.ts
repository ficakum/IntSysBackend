export const messagesConstructor: (
  type: string,
  messages: {
    [key: string]: string;
  },
  property: string,
) => {
  [key: string]: string;
} = (type: string, messages: { [key: string]: string }, property: string) => {
  const messagesToReturn: { [key: string]: string } = {};
  Object.keys(messages).forEach((key) => {
    messagesToReturn[type + '.' + key] = `"${property}" ${messages[key]}`;
  });
  return messagesToReturn;
};
