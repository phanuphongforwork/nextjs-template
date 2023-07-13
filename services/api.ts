import { appConfig } from "@/configs/app.config";

export type ParamType = {
  include?: string;
  filters?: any;
};

export default class ApiClient {
  protected url: string | null = null;

  constructor(url: string) {
    this.url = url;
    if (this.constructor === ApiClient) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  protected async useApiRequest(
    url: string,
    options: RequestInit,
    params?: ParamType,
    headers?: Record<string, string>
  ): Promise<any> {
    const mergedHeaders = {
      "Content-Type": "application/json",
      Authorization: "Bearer your-token",
      ...headers,
    };

    const requestOptions: RequestInit = {
      ...options,
      headers: mergedHeaders,
    };

    const queryString = new URLSearchParams(params).toString();

    try {
      const response = await fetch(
        `${appConfig.baseUrl}/${url}?${queryString}`,
        requestOptions
      );
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async getAll(params = {}) {
    const url = this.getUrl();
    const responseData = await this.useApiRequest(
      url,
      { method: "GET" },
      params
    );

    return responseData;
  }

  async getById(id: number, params = {}) {
    const url = `${this.getUrl()}/${id}`;
    const responseData = await this.useApiRequest(
      url,
      { method: "GET" },
      params
    );

    return responseData;
  }

  async create(data: any, params = {}) {
    const url = this.getUrl();
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
    };
    const responseData = await this.useApiRequest(url, options, params);

    return responseData;
  }

  async update(id: number, data: any, params = {}) {
    const url = `${this.getUrl()}/${id}`;
    const options: RequestInit = {
      method: "PUT",
      body: JSON.stringify(data),
    };
    const responseData = await this.useApiRequest(url, options, params);
    return responseData;
  }

  protected getUrl(path?: string): string {
    if (!this.url) {
      throw new Error("URL is not defined. Please provide a valid URL.");
    }
    return `${this.url}${path}`;
  }
}
