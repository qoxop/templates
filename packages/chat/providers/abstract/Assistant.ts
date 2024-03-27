import { Context } from 'providers/types/context';
import { AssistantMsg, UserMsg } from "providers/types/msg";

export default abstract class Assistant {
  public context?: Context;
  public welcome?: AssistantMsg;
  public instructions: string[] = [];
  public abstract upload?: (file: any) => any;
  public abstract newContext?: () => Promise<void>;
  public abstract send: (msg: { text: string, files?: string[], meta?: any }) => Promise<AssistantMsg>
  public abstract continue: (msg: AssistantMsg) => Promise<AssistantMsg>
  public abstract getHistories: (count: number, before?: string) => Promise<[UserMsg, Assistant][]>
}