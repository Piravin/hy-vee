// pages/index.tsx
"use client"
import Card from '@/components/card';
import NameForm from '@/components/name-form';
import { RestApi } from '@/utils/rest-api';
import { useState } from 'react';

const Home: React.FC = () => {
  const [details, setDetails] = useState<Details | null | undefined>(undefined);
  const [errors, setErrors] = useState<string[] | null>();

  const handleFormSubmit = async (data: { name: string }) => {
    try {
      setDetails(null);
      setErrors(null);
      const age: AgeApiResult = await RestApi.get(`https://api.agify.io/`, { name: data.name });
      const gender: GenderApiResult = await RestApi.get(`https://api.genderize.io/`, { name: data.name });
      const country: CountryApiResult = await RestApi.get(`https://api.nationalize.io/`, { name: data.name });
      if (country.country?.length === 0)
        setErrors(['Unable to make predictions, try using a different name.']);
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
    <div className='h-full flex flex-col space-x-1 space-y-4 flex-wrap items-center justify-center'>
      {details === undefined && <div className='text-5xl lg:max-w-[50vw] p-6 mb-6 text-center text-gray-700 italic'>Enter a name to start prediction...</div>}
      <NameForm onSubmit={handleFormSubmit} />
      <div>
        {details && <div className='flex flex-wrap items-center justify-center transition-all duration-300'>
          <Card title='Age' value={details.age.toString()}/>
          <Card title='Gender' value={details.gender.value} progress={details.gender.probability}/>
          <Card title='Country' value={details.country.value} progress={details.country.probability}/>
        </div>}
        {details === null && errors && <div>{errors}</div>}
      </div>
    </div>
  );
};

export default Home;
