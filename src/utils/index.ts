// strip string if > length and add "..." at end
export const stripText = (text: string, length: number): string => {
  return text?.length > length ? text.slice(0, length) + "..." : text;
};

// take a url string and return its protocol, and rest
export const splitProto = (url: string) => {
  return {
    proto: url?.split("//")[0],
    path: url?.split("//")[1],
  };
};

// has error
export const hasError = (messages: (string | undefined)[]): boolean => {
  return messages.filter((m) => m !== undefined).length > 0 ? true : false;
};
