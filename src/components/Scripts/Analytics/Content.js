export const generateChartMockData = (key) => {
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days30 = Array(30)
    .fill(1)
    .map((x, y) => x + y);
  const days7 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const hours = Array(24)
    .fill(1)
    .map((x, y) => `${x + y}h`);

  let xAxis = month;
  if (key === '7days') {
    xAxis = days7;
  } else if (key === '30days') {
    xAxis = days30;
  } else if (key === 'hours') {
    xAxis = hours;
  }

  return xAxis.reduce((acc, x, idx) => {
    const getNextValueFor = (key) => {
      const firstItem = acc[0];
      const yearModifier = 20 * (key % 2020); // 0, 20, 30

      // each month growth by 10% from firstItem
      const lastVal = firstItem ? (firstItem[key] + yearModifier) * (1 + (idx ? idx : 1) / 20) : 100;

      const randomNum = Math.random() * (1.4 - 1.1) + 1.1;

      return Math.floor(lastVal * randomNum);
    };

    acc.push({
      name: x,
      2020: getNextValueFor(2020),
      2021: getNextValueFor(2021),
      2022: getNextValueFor(2022),
    });

    return acc;
  }, []);
};
