import { useMemo, use, useState, useCallback } from "react";
import { BaseConfDialog, OpenAiConf } from "providers/ui/base-conf-dialog";
import { ProviderProps } from "providers/types";
import Api from "./api";

function Provider({ App }: ProviderProps) {
  const api = useMemo(() => new Api(), []);
  const [visible, setVisible] = useState(true);
  const inited = use(useMemo(api.inited, [visible]));
  const onSubmit = useCallback(async (conf: OpenAiConf) => {
    const { ok, msg } = await api.setBaseConf(conf);
    console.log(conf)
    if (ok) {
      return setVisible(false);
    }
    return msg;
  }, [])
  if (inited) {
    return <App />
  }
  return (<BaseConfDialog open={visible} onSubmit={onSubmit} />)
}

export default Provider; 