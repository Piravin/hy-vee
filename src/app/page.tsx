// pages/index.tsx
"use client"
import Card from '@/components/card';
import NameForm from '@/components/name-form';
import { RestApi } from '@/utils/rest-api';
import { useState } from 'react';

const Home: React.FC = () => {
  const [details, setDetails] = useState<Details>();

  const handleFormSubmit = async (data: { name: string }) => {
    try {
      const age: AgeApiResult = await RestApi.get(`https://api.agify.io/`, { name: data.name });
      const gender: GenderApiResult = await RestApi.get(`https://api.genderize.io/`, { name: data.name });
      const country: CountryApiResult = await RestApi.get(`https://api.nationalize.io/`, { name: data.name });
      setDetails({
        age: age.age,
        gender: {
          value: gender.gender,
          probability: gender.probability,
        },
        country: (() => {
          const bestCountry = country.country.reduce((max, country) => 
            country.probability > max.probability ? country : max
          );
          return { value: bestCountry.country_id, probability: bestCountry.probability }
        })()
      })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <NameForm onSubmit={handleFormSubmit} />
      <div>
        {details && <>
          <Card title='Age' value={details.age.toString()}/>
          <Card title='Gender' value={details.gender.value} progress={details.gender.probability}/>
          <Card title='Country' value={details.country.value} progress={details.country.probability}/>
        </>}
      </div>
    </div>
  );
};

export default Home;