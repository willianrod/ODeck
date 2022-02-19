const parseKeys = (keys: Array<string>) => {
  const newKeys = [...keys];

  const key = newKeys.pop();

  return {
    modifiers: newKeys,
    key,
  };
};

export default parseKeys;
