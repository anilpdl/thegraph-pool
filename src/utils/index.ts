type TBorrow = Record<string, string | number>;
type TDeposit = TBorrow;
type TBorrows = Array<TBorrow>;
type TDeposits = Array<TDeposit>;

interface SupplyData {
  borrows: TBorrows;
  deposits: TDeposits;
  blockTotalBorrow?: number;
  blockTotalDeposit?: number;
}

function sumField(data: Array<Record<string, any>>, field: string) {
  const sum = data.reduce((curr: number, acc) => Number(acc[field]) + curr, 0);

  return sum;
}

function groupByBlock(responseData: SupplyData) {
  const groupedData: Record<string, SupplyData> = {};

  responseData.borrows.forEach((item: TBorrow) => {
    if (!groupedData[item.blockNumber]) {
      groupedData[item.blockNumber] = { borrows: [], deposits: [] };
    }
    groupedData[item.blockNumber].borrows.push(item);
  });

  responseData.deposits.forEach((item) => {
    if (!groupedData[item.blockNumber]) {
      groupedData[item.blockNumber] = { borrows: [], deposits: [] };
    }
    groupedData[item.blockNumber].deposits.push(item);
  });

  return groupedData;
}

function calculateSupplyTrend(responseData: SupplyData) {
  const groupedData = groupByBlock(responseData);
  const blocks = Object.keys(groupedData);
  let totalDeposit = 0,
    totalBorrow = 0;

  blocks.forEach((block) => {
    const { borrows, deposits } = groupedData[block];
    const blockTotalBorrow = sumField(borrows, 'tokenAmount');
    const blockTotalDeposit = sumField(deposits, 'tokenAmount');
    totalBorrow += blockTotalBorrow;
    totalDeposit += blockTotalDeposit;
    groupedData[block].blockTotalBorrow = blockTotalBorrow;
    groupedData[block].blockTotalDeposit = blockTotalDeposit;
  });
  return { groupedData, totalDeposit, totalBorrow };
}

export { sumField, groupByBlock, calculateSupplyTrend };
