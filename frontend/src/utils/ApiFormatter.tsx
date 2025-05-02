export const kakeiboInputFormatter = (data: any) => {
  const response = {
    date: data[0],
    salary: data[1].amount,
    salar2: data[2].amount,
    food: data[3].amount,
    life: data[4].amount,
    medical: data[5].amount,
    entertaiment: data[6].amount,
    amusement: data[7].amount,
    etc: data[8].amount,
    total_income: data[1].amount + data[2].amount,
    total_expenditures:
      data[3].amount +
      data[4].amount +
      data[5].amount +
      data[6].amount +
      data[7].amount +
      data[8].amount,
  };

  return response;
};
