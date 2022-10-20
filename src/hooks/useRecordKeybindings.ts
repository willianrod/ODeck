import { useState, useCallback, useEffect } from 'react';

interface IUseKeyBindings {
  onEnd(keys: string[]): void;
}

interface IUseKeyBindingsResponse {
  isRecording: boolean;
  startRecording(): void;
  stopRecording(): void;
  keysPressed: string[];
}

const useRecordKeybindings = ({
  onEnd,
}: IUseKeyBindings): IUseKeyBindingsResponse => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [keysPressed, setKeysPressed] = useState<string[]>([]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      event.preventDefault();
      setKeysPressed((currentKeys) => {
        const newKey = event.key.toLowerCase();
        if (currentKeys.includes(newKey)) return currentKeys;
        return [...currentKeys, newKey];
      });
    };

    if (isRecording) {
      document.addEventListener('keydown', listener);
    }

    return () => {
      if (isRecording) {
        document.removeEventListener('keydown', listener);
      }
    };
  }, [isRecording]);

  useEffect(() => {
    const listener = () => {
      onEnd(keysPressed);
      setKeysPressed([]);
      setIsRecording(false);
    };

    if (isRecording) {
      document.addEventListener('keyup', listener);
    }

    return () => {
      document.removeEventListener('keyup', listener);
    };
  }, [isRecording, keysPressed, onEnd]);

  const startRecording = useCallback(() => {
    setIsRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
  }, []);

  return {
    isRecording,
    startRecording,
    stopRecording,
    keysPressed,
  };
};

export default useRecordKeybindings;
