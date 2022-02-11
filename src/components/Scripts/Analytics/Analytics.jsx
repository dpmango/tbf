import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import cns from 'classnames';

import { SvgIcon, Button, Checkbox, Input } from '@ui';
import { useWindowSize } from '@hooks';

import st from './Analytics.module.scss';

import { generateChartMockData } from './Content';

const Analytics = ({ className, hasBorder, steps, ...props }) => {
  const { width } = useWindowSize();
  const [chartData, setChartData] = useState(generateChartMockData('month'));

  const handlePeriodChange = useCallback(
    (key) => {
      setChartData(generateChartMockData(key));
    },
    [setChartData]
  );

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
                    top: width <= 992 ? 10 : 20,
                    right: width <= 992 ? 0 : 20,
                    left: width <= 992 ? 0 : 20,
                    bottom: width <= 992 ? 0 : 20,
                  }}>
                  <CartesianGrid horizontal={true} vertical={false} />
                  <XAxis
                    dataKey="name"
                    interval={'preserveEnd'}
                    allowDataOverflow={true}
                    tick={{ fontSize: 14, color: '#878787' }}
                  />
                  {/* <YAxis /> */}
                  {/* <Tooltip /> */}
                  <Line type="natural" dot={false} dataKey="2020" stroke="#AB7C17" strokeWidth={2} />
                  <Line type="natural" dot={false} dataKey="2021" stroke="#EB5509" strokeWidth={2} />
                  <Line type="natural" dot={false} dataKey="2022" stroke="#CE9927" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className={st.chartControls}>
              <div className={st.chartControlsPeriod}>
                <Button variant="sm" theme="gray" outline onClick={() => handlePeriodChange('month')}>
                  12 months
                </Button>
                <Button variant="sm" theme="gray" outline onClick={() => handlePeriodChange('30days')}>
                  30 days
                </Button>
                <Button variant="sm" theme="gray" outline onClick={() => handlePeriodChange('7days')}>
                  7 days
                </Button>
                <Button variant="sm" theme="gray" outline onClick={() => handlePeriodChange('hours')}>
                  24 hours
                </Button>
              </div>
              <div className={st.chartControlsCta}>
                <Button iconLeft="calendar" variant="small" theme="gray" outline>
                  Select Dates
                </Button>
                <Button
                  iconLeft="filter"
                  variant="small"
                  theme="gray"
                  outline
                  onClick={() => handlePeriodChange('hours')}>
                  Filters
                </Button>
              </div>
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
