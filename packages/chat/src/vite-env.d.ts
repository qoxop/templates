/// <reference types="vite/client" />

export interface Msg {
  data: any;
  component: string;
  id: string;
  role: 'u'|'a';
  time: number;
  unfinished?: boolean;
}