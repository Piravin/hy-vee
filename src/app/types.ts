type AgeApiResult = {
  count: number;
  name: string;
  age: number;
};

type GenderApiResult = {
  count: number;
  name: string;
  gender: string;
  probability: number;
};

type CountryApiResult = {
  count: number;
  name: string;
  country: {
    country_id: string;
    probability: number;
  }[];
};

type Details = {
  age: number;
  gender: {
    value: string;
    probability: number;
  };
  country: {
    value: string;
    probability: number;
  }
}