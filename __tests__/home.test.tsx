/* eslint-disable testing-library/no-node-access */
import Home from "@/app/page";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen, within } from "@testing-library/react";

describe("Home Page", () => {
  it("should have name input and go button", () => {
    render(<Home />);

    const inputElement = screen.getByPlaceholderText("Enter name");
    expect(inputElement).toBeInTheDocument();

    const goButton = screen.getByText("Go");
    expect(goButton).toBeInTheDocument();
  });

  it("should display errors in input", async () => {
    render(<Home />);

    const inputElement = screen.getByPlaceholderText("Enter name");
    const goButton = screen.getByText("Go");

    await userEvent.type(inputElement, "mee-lad");
    await userEvent.click(goButton);
    let errorElement = screen.getByText(
      "Name can only contain alphabets and spaces"
    );
    expect(errorElement).toBeInTheDocument();

    await userEvent.clear(inputElement);
    await userEvent.type(inputElement, "me");
    await userEvent.click(goButton);
    errorElement = screen.getByText("Name must be at least 3 characters");
    expect(errorElement).toBeInTheDocument();

    await userEvent.clear(inputElement);
    await userEvent.type(inputElement, "meafudkalflabhjckathcgrchacbhla");
    await userEvent.click(goButton);
    errorElement = screen.getByText("Name must be no more than 30 characters");
    expect(errorElement).toBeInTheDocument();
  });

  it("should display predictions", async () => {
    render(<Home />);
    const inputElement = screen.getByPlaceholderText("Enter name");
    const goButton = screen.getByText("Go");

    global.fetch = jest.fn();
    jest
      .spyOn(global, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ count: 21, name: "meelad", age: 34 }),
      } as any)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          count: 178,
          name: "meelad",
          gender: "male",
          probability: 0.99,
        }),
      } as any)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          count: 14,
          name: "meelad",
          country: [
            { country_id: "BH", probability: 0.17543244166021843 },
            { country_id: "BD", probability: 0.1549801788527414 },
            { country_id: "AE", probability: 0.09229136644087116 },
            { country_id: "AF", probability: 0.08771622083010922 },
            { country_id: "IQ", probability: 0.08771622083010922 },
          ],
        }),
      } as any);

    await userEvent.type(inputElement, "meelad");
    await userEvent.click(goButton);

    const ageCard = screen.getByText("Age").closest("div");
    const genderCard = screen.getByText("Gender").closest("div");
    const countryCard = screen.getByText("Country").closest("div");
    
    const age = ageCard?.childNodes[1].textContent;
    const gender = genderCard?.childNodes[1].textContent;
    const country = countryCard?.childNodes[1].textContent;

    expect(age).toBe("34");
    expect(gender).toBe("male");
    expect(country).toBe("BH");
  });
});
