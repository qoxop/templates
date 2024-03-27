
interface MsgExtra {
  assistant_id: string;
  context_id: string;
  meta?: any;
}

interface Msg extends MsgExtra {
  id: string;
  data: any;
  component: string;
  time: number;
}

export interface UserMsg extends Msg {
  data: string;
  role: 'user';
  files?: string[];
}

export interface AssistantMsg extends Msg {
  role: 'assistant';
  unfinished?: boolean;
}