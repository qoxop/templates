

type BaseConf = {
  baseUrl: string;
  apiKey: string;
}

export default class Api {
  private baseUrl: string;
  private apiKey: string;
  constructor() {
    this.apiKey = localStorage.getItem('AI_BASE_URL') || '';
    this.baseUrl = localStorage.getItem('AI_API_KEY') || '';
  }
  inited = async () => {
    return !!(this.baseUrl && this.apiKey)
  }
  /**
   * 非标准接口
   */
  async setBaseConf(conf: BaseConf) {
    this.baseUrl = conf.baseUrl;
    this.apiKey = conf.apiKey;
    localStorage.setItem('AI_BASE_URL', this.baseUrl);
    localStorage.setItem('AI_API_KEY', this.apiKey);
    return { msg: '', ok: true }
  }
}