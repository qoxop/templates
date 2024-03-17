import { useMemo, use, useState } from "react";
import { ProviderProps } from "providers/types";
import { Dialog } from '@/components/ui/dialog';
import Api from "./api";

function Provider({ App }: ProviderProps) {
  
  const api = useMemo(() => new Api(), []);
  const [visible, setVisible] = useState(true);
  const inited = use(useMemo(api.inited, []));
  if (inited) {
    return <App />
  }
  return (
  )
}

export default Provider; 