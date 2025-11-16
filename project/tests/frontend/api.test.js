import axios from "axios";
import { fetchData, postData } from "../../src/services/api";

jest.mock("axios");

describe("API Service Tests", () => {
  test("fetchData makes a GET request and returns data", async () => {
    const mockData = { data: [{ id: 1, name: "Test Item" }] };
    axios.get.mockResolvedValue(mockData);

    const result = await fetchData("/test-endpoint");

    expect(axios.get).toHaveBeenCalledWith("/test-endpoint");
    expect(result).toEqual(mockData.data);
  });

  test("postData makes a POST request and returns response", async () => {
    const mockResponse = { data: { success: true } };
    const payload = { name: "New Item" };
    axios.post.mockResolvedValue(mockResponse);

    const result = await postData("/test-endpoint", payload);

    expect(axios.post).toHaveBeenCalledWith("/test-endpoint", payload);
    expect(result).toEqual(mockResponse.data);
  });

  test("fetchData handles errors gracefully", async () => {
    axios.get.mockRejectedValue(new Error("Network Error"));

    await expect(fetchData("/test-endpoint")).rejects.toThrow("Network Error");
  });
});