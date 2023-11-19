import GQLService from '@/services/gql.service';

class GraphService {
  private client = GQLService.getInstance();

  public async fetchUserBorrow(walletAddress: string) {
    const { data } = await this.client.query(
      `query UserBorrows($walletAddress: String!) {
        borrows(where: {user: $walletAddress}) {
          tokenAmount
          user
          Pool_id
          blockNumber
        }
      }
      `,
      { variables: { walletAddress } }
    );

    return data?.borrows;
  }

  public async fetchAllBorrow() {
    const { data } = await this.client.query(
      `query AllBorrows {
        borrows {
          tokenAmount
          user
          Pool_id
          blockNumber
        }
      }
      `
    );

    return data?.borrows;
  }

  public async fetchUserDeposits(walletAddress: string) {
    const { data } = await this.client.query(
      `
        query UserDeposits($walletAddress: String!) {
          deposits(where: { user: $walletAddress }) {
            tokenAmount
            user
            Pool_id
            blockNumber
          }
        }
      `,
      { variables: { walletAddress } }
    );

    return data?.deposits;
  }

  public async fetchAllDeposits() {
    const { data } = await this.client.query(
      `query AllDeposits {
        deposits {
          tokenAmount
          user
          Pool_id
          blockNumber
        }
      }
      `
    );

    return data?.deposits;
  }

  public async fetchUserSupply(walletAddress: string) {
    const { data } = await this.client.query(
      `query UserSupply($walletAddress: String!) {
        deposits(where: {user: $walletAddress}) {
          tokenAmount
          user
          Pool_id
          blockNumber
        }
        borrows(where: {user: $walletAddress}) {
          tokenAmount
          user
          Pool_id
          blockNumber
        }
      }
      `,
      { variables: { walletAddress } }
    );

    return data;
  }

  public async fetchAllSupply() {
    const { data } = await this.client.query(
      `query AllSupply {
        deposits {
          tokenAmount
          user
          Pool_id
          blockNumber
        }
        borrows {
          tokenAmount
          user
          Pool_id
          blockNumber
        }
      }
      `
    );

    return data;
  }
}

export default GraphService;
