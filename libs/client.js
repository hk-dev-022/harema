import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'harema',
  apiKey: process.env.API_KEY,
});