import { EventEmitter } from "events";
import { remember } from "@epic-web/remember";

const emitter = remember("emitter", () => new EventEmitter());

export { emitter };
