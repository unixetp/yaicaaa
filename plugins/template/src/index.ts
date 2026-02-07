import { plugin } from "@vendetta";
import { findByProps } from "@vendetta/metro";
import { toSmallCaps } from "./smallcaps";

const MessageActions = findByProps("sendMessage");

export default {
  onLoad() {
    this.unpatch = plugin.after(
      MessageActions,
      "sendMessage",
      (args) => {
        const [channelId, message] = args;
        
        if (message.content.startsWith("/yaica ")) {
          message.content = toSmallCaps(message.content.slice(4));
        }
      }
    );
  },
  onUnload() {
    this.unpatch?.();
  }
};
