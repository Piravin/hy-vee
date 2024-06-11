/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_AGE_API: "https://api.agify.io/",
    NEXT_PUBLIC_GENDER_API: "https://api.genderize.io/",
    NEXT_PUBLIC_COUNTRY_API: "https://api.nationalize.io/",
  },
};

export default nextConfig;
