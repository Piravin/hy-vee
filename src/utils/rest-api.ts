export class RestApi {
  static get = async <T>(endpoint: string, params: Record<string, string>): Promise<T> => {
    const queryString = new URLSearchParams(params).toString();
    const url = `${endpoint}?${queryString}`;
  
    const response = await fetch(url, {cache: 'no-store'});
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
  
    const data: T = await response.json();
    return data;
  }
}