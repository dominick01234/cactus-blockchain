import { createApi } from '@reduxjs/toolkit/query/react';
import cactusLazyBaseQuery from './cactusLazyBaseQuery';

export const baseQuery = cactusLazyBaseQuery({});

export default createApi({
  reducerPath: 'cactusApi',
  baseQuery,
  endpoints: () => ({}),
});
