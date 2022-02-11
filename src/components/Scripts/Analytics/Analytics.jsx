import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import cns from 'classnames';

import { SvgIcon, Button, Checkbox, Input } from '@ui';

import st from './Analytics.module.scss';

const generateChartMockData = () => {
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return month.reduce((acc, x, idx) => {
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

const Analytics = ({ className, hasBorder, steps, ...props }) => {
  const [chartData, setChartData] = useState(generateChartMockData());

  console.log(chartData);
  return (
    <section className={cns(st.container, hasBorder && st._hasBorder, className)} {...props}>
      <div className="container">
        <div className="h3-title">Analytics</div>

        <div className={st.grid}>
          <div className={st.chart}>
            <div className={st.chartWrapper}>
              <ResponsiveContainer width="99%" aspect={2.58}>
                <LineChart
                  width={620}
                  height={240}
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 0,
                    left: 40,
                    bottom: 20,
                  }}>
                  <CartesianGrid horizontal={true} vertical={false} />
                  <XAxis dataKey="name" interval={1} tick={{ fontSize: 14, color: '#878787' }} />
                  {/* <YAxis /> */}
                  {/* <Tooltip /> */}
                  <Line type="natural" dot={false} dataKey="2020" stroke="#AB7C17" strokeWidth={2} />
                  <Line type="natural" dot={false} dataKey="2021" stroke="#EB5509" strokeWidth={2} />
                  <Line type="natural" dot={false} dataKey="2022" stroke="#CE9927" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={st.qrCode}>
            <div className={st.qrCodeImage}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=tbf.surge.sh/script/1&color=464646&bgcolor=F5F5F5&format=svg" />
            </div>
            <div className={cns('h3-title', st.qrCodeLabel)}>Scan Me</div>
          </div>
        </div>
      </div>
    </section>
  );
};

Analytics.propTypes = {
  className: PropTypes.string,
  steps: PropTypes.array,
  hasBorder: PropTypes.bool,
};

Analytics.defaultProps = {
  hasBorder: true,
};

export default Analytics;
