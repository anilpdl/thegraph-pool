import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  gql
} from '@apollo/client/core';
import fetch from 'cross-fetch';

import { env } from '@/config/env';

const BASE_URL = env.GRAPH_BASE_URL;

class GQLService {
  private static instance: GQLService;
  public client;

  constructor(baseUrl: string) {
    this.client = new ApolloClient({
      link: new HttpLink({
        uri: baseUrl,
        fetch
      }),
      cache: new InMemoryCache()
    });
  }

  public query = async (queryStr: string, options?: any) => {
    const result = await this.client.query({
      query: gql`
        ${queryStr}
      `,
      variables: options?.variables ?? {}
    });

    return result;
  };

  public static getInstance() {
    if (!this.instance) {
      this.instance = new GQLService(BASE_URL as string);
    }

    return this.instance;
  }
}

export default GQLService;
