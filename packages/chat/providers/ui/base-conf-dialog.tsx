import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRef } from "react";

export type OpenAiConf = {
  baseUrl: string;
  apiKey: string;
};

type Props = {
  open: boolean;
  defaultConf?: Partial<OpenAiConf>;
  onSubmit: (conf: OpenAiConf) => void;
}
export function BaseConfDialog({ open, defaultConf, onSubmit }: Props) {
  const confRef = useRef({ baseUrl: 'https://api.openai.com/v1', apiKey: '', ...(defaultConf || {})});
  const handleSubmit = () => {
    console.log(confRef.current)
    if (confRef.current.apiKey && confRef.current.baseUrl) {
      onSubmit({ ...confRef.current })
    }
  }
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>初始化配置</DialogTitle>
          <DialogDescription>
            输入你的API 配置信息(仅保存在本地)
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="base-url" className="py-2">API BaseUrl</Label>
            <Input
              type="url"
              id="base-url"
              defaultValue={confRef.current.baseUrl}
              placeholder="https://api.openai.com/v1"
              onChange={e => confRef.current.baseUrl = e.target.value}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="api-key" className="py-2">API KEY</Label>
            <Input
              type="password"
              id="api-key"
              defaultValue={confRef.current.apiKey}
              placeholder="sk-*****"
              onChange={e => confRef.current.apiKey = e.target.value}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save Config</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
