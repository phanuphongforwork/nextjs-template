import ApiClient from "./api";

class CustomApi extends ApiClient {
  constructor(url: string) {
    super(url);
  }

  async customFunction(params = {}) {
    const url = this.getUrl("/ditto");
    const responseData = await this.useApiRequest(
      url,
      { method: "GET" },
      params
    );

    setTimeout(() => {}, 3000);

    return responseData;
  }
}

export const customApi = new CustomApi("pokemon");
