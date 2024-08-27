import { emitter } from "./emitter.server";

export const chatEventNames = {
  newEmanationChatData: (chatId: string) => `newEmanationChatData:${chatId}`,
};

export const chatEvents = {
  newEmanationChatData: (chatId: string) => {
    return {
      addListener: (listener: () => void) => {
        emitter.addListener(
          chatEventNames.newEmanationChatData(chatId),
          listener
        );
      },
      removeListener: (listener: () => void) => {
        emitter.removeListener(
          chatEventNames.newEmanationChatData(chatId),
          listener
        );
      },
      emit: () => {
        console.log("emitting newEmanationChatData");
        emitter.emit(chatEventNames.newEmanationChatData(chatId));
      },
    };
  },
};

export const entityEvents = {
  newEntityOutput: (entityId: string) => {
    return {
      addListener: (listener: () => void) => {
        emitter.addListener(`newEntityOutput:${entityId}`, listener);
      },
      removeListener: (listener: () => void) => {
        emitter.removeListener(`newEntityOutput:${entityId}`, listener);
      },
      emit: () => {
        emitter.emit(`newEntityOutput:${entityId}`);
      },
    };
  },
};
