import GQLService from '@/services/gql.service';

class GraphService {
  private client = GQLService.getInstance();

  public async fetchUserCollateral(walletAddress: string) {
    const { data } = await this.client.query(
      `query UserCollaterals($walletAddress: String!) {
        liquidates(where: {user: $walletAddress}) {
          collateralAmount
          user
        }
      }
      `,
      { variables: { walletAddress } }
    );

    return data?.liquidates;
  }

  public async fetchAllCollateral() {
    const { data } = await this.client.query(
      `query AllCollaterals {
        liquidates {
          collateralAmount
          user
        }
      }
      `
    );

    return data?.liquidates;
  }

  public async fetchUserBorrow(walletAddress: string) {
    const { data } = await this.client.query(
      `query UserBorrows($walletAddress: String!) {
        borrows(where: {user: $walletAddress}) {
          tokenAmount
          user
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
        }
      }
      `
    );

    return data?.deposits;
  }
  public async fetchUserWithdraws(walletAddress: string) {
    const { data } = await this.client.query(
      `
        query UserWithdraws($walletAddress: String!) {
          withdraws(where: { user: $walletAddress }) {
            tokenAmount
            user
          }
        }
      `,
      { variables: { walletAddress } }
    );

    return data?.withdraws;
  }

  public async fetchAllWithdraws() {
    const { data } = await this.client.query(
      `query AllWithdraws {
        withdraws {
          tokenAmount
          user
        }
      }
      `
    );

    return data?.withdraws;
  }
}

export default GraphService;
