import type React from 'react';

export type ProviderProps = {
  App: React.ComponentType | React.FC;
}
export interface Msg {
  data: any;
  component: string;
  id: string;
  role: 'u'|'a';
  time: number;
  unfinished?: boolean;
}

export interface AssistantActions {
  send: (session: string, msg: { text: string, files: string[], meta: any }) => Promise<Msg>
  getHistories: (session: string, count: number, before?: string) => Promise<Msg[]>
}
export interface APIS {

}