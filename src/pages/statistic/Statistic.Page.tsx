import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/charts';
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { StatisticOrdered } from "../../services/Setting.Service";
import Spinner from '../../components/Spinner';
import { formatMoney } from '../../utils/Common';

const StatisticPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  const [config, setConfig] = useState<any>();
  const [total, setTotal] = useState<any>(0);
  const [statistic, setStatistic] = useState([
    {
      month: 0, total: 0
    },
    {
      month: 0, total: 0
    }
  ]);

  useEffect(() => {
    StatisticOrdered()
      .then(res => {
        setStatistic(res.data.result);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      })
  }, []);

  useEffect(() => {
    for (let i = 0; i < statistic.length - 1; i++) {
      //@ts-ignore
      const custom = { month: statistic[i].month, value: statistic[i].total }
      setData(prev => [...prev, custom]);
    }
    //@ts-ignore
    setTotal(statistic[statistic.length - 1].totalBought);
  }, [statistic]);

  useEffect(() => {
    setConfig({
      data,
      height: 400,
      xField: 'month',
      yField: 'value',
      xAxis: { label: { autoRotate: false } },
      scrollbar: { type: 'horizontal' },
    })
  }, [data]);

  return (
    <>
      <Header />
      {
        loading ? (
          <Spinner />
        ) : (
          <Layout>
            {
              config && <Column {...config} />
            }
            <div className="statistic__total">
              <span>Tổng tiền: {formatMoney(total)}</span>
            </div>
          </Layout>
        )
      }
    </>
  )
}

export default StatisticPage
