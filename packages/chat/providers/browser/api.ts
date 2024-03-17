

export default class Api {
  private baseUrl: string;
  private apiKey: string;
  constructor() {
    this.apiKey = localStorage.getItem('AI_BASE_URL') || '';
    this.baseUrl = localStorage.getItem('AI_API_KEY') || '';
  }
  async inited() {
    return !!(this.baseUrl && this.apiKey)
  }
  
}