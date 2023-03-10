import React from "react";
import { FormattedMessage } from "react-intl";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    product: "PEPSI COLA MIDCAL 430ML PET 12X NO POP_150",
    sumOfDemandPlannerForecast: 120000,
    sumOfActualsQty: "0",
  },
  {
    product: "PEPSI COLA MIDCAL 345ML PET 24X NO POP_102",
    sumOfDemandPlannerForecast: 250000,
    sumOfActualsQty: "0",
  },
  {
    product: "AQUAFINA WATER 1.5L PET NEW_112",
    sumOfDemandPlannerForecast: 70000,
    sumOfActualsQty: 100000,
  },
  {
    product: "PEPSI NO SUGAR 345ML PET 12X_192",
    sumOfDemandPlannerForecast: 50000,
    sumOfActualsQty: 60000,
  },
  {
    product: "MIRINDA STRWB LS 345ML PET 12X_192",
    sumOfDemandPlannerForecast: 60000,
    sumOfActualsQty: 100000,
  },
  {
    product: "PEPSI COLA MID CAL 430ML PET 24X_80",
    sumOfDemandPlannerForecast: 50000,
    sumOfActualsQty: 100000,
  },
  {
    product: "PEPSI COLA MID CAL 640ML PET 12X_110 NE L&P",
    sumOfDemandPlannerForecast: 40000,
    sumOfActualsQty: 48000,
  },
  {
    product: "PEPSI COLA MID CAL 640ML PET 12X_110 L&P",
    sumOfDemandPlannerForecast: 100000,
    sumOfActualsQty: 150000,
  },
  {
    product: "PEPSI COLA MID CAL 1.26L PET 12X_48 L&P",
    sumOfDemandPlannerForecast: 180000,
    sumOfActualsQty: 190000,
  },
];

const WeeklyForecast = () => {
  return (
    <div className="weekly-forecast inner-page">
      <section className="tables flex items-center mb-8">
        <table className="table flex-1">
          <caption className="bg-blue-400 font-medium">
            <FormattedMessage
              id="weeklyForecast.stdRc"
              defaultMessage={"STD RC"}
            />
          </caption>
          <thead>
            <tr>
              <th>
                <FormattedMessage
                  id="weeklyForecast.channel"
                  defaultMessage={"Channel"}
                />
              </th>
              <th>
                <FormattedMessage
                  id="weeklyForecast.actual"
                  defaultMessage={"Actual"}
                />
              </th>
              <th>
                <FormattedMessage
                  id="weeklyForecast.managementConsensus"
                  defaultMessage={"Management Consensus"}
                />
              </th>
              <th>
                <FormattedMessage
                  id="weeklyForecast.gap"
                  defaultMessage={"GAP"}
                />
              </th>
              <th>
                <FormattedMessage
                  id="weeklyForecast.%achieved"
                  defaultMessage={"%Achieved"}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <FormattedMessage
                  id="weeklyForecast.organizedTrade"
                  defaultMessage={"Organized Trade"}
                />
              </th>
              <td>572,088</td>
              <td>722,443</td>
              <td>-150,355</td>
              <td className="text-red-500">79%</td>
            </tr>
            <tr>
              <th>
                <FormattedMessage
                  id="weeklyForecast.traditionalTrade"
                  defaultMessage={"Traditional Trade"}
                />
              </th>
              <td>1,414,101</td>
              <td>1,330,124</td>
              <td>83,977</td>
              <td className="text-red-500">106%</td>
            </tr>
            <tr>
              <th>
                <FormattedMessage
                  id="weeklyForecast.onPremiseTotal"
                  defaultMessage={"On Premise(Total)"}
                />
              </th>
              <td>233,573</td>
              <td>195,543</td>
              <td>38,030</td>
              <td className="text-red-500">119%</td>
            </tr>
            <tr>
              <th>
                <FormattedMessage
                  id="weeklyForecast.total"
                  defaultMessage={"Total"}
                />
              </th>
              <td>2,219,762</td>
              <td>2,248,110</td>
              <td>-28,348</td>
              <td className="text-red-500">99%</td>
            </tr>
          </tbody>
        </table>
        <table className="table flex-1">
          <caption className="bg-blue-600 text-white font-medium">
            <FormattedMessage id="weeklyForecast.boz" defaultMessage={"Boz"} />
          </caption>
          <thead>
            <tr>
              <th>
                <FormattedMessage
                  id="weeklyForecast.channel"
                  defaultMessage={"Channel"}
                />
              </th>
              <th>
                <FormattedMessage
                  id="weeklyForecast.actual"
                  defaultMessage={"Actual"}
                />
              </th>
              <th>
                <FormattedMessage
                  id="weeklyForecast.managementConsensus"
                  defaultMessage={"Management Consensus"}
                />
              </th>
              <th>
                <FormattedMessage
                  id="weeklyForecast.gap"
                  defaultMessage={"GAP"}
                />
              </th>
              <th>
                <FormattedMessage
                  id="weeklyForecast.%achieved"
                  defaultMessage={"%Achieved"}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <FormattedMessage
                  id="weeklyForecast.organizedTrade"
                  defaultMessage={"Organized Trade"}
                />
              </th>
              <td>1,321,145</td>
              <td>1,633,292</td>
              <td>-312,147</td>
              <td className="text-red-500">81%</td>
            </tr>
            <tr>
              <th>
                <FormattedMessage
                  id="weeklyForecast.traditionalTrade"
                  defaultMessage={"Traditional Trade"}
                />
              </th>
              <td>2,662,230</td>
              <td>2,692,908</td>
              <td>-30,678</td>
              <td className="text-red-500">99%</td>
            </tr>
            <tr>
              <th>
                <FormattedMessage
                  id="weeklyForecast.onPremiseTotal"
                  defaultMessage={"On Premise(Total)"}
                />
              </th>
              <td>246,850</td>
              <td>208,461</td>
              <td>38,390</td>
              <td className="text-red-500">118%</td>
            </tr>
            <tr>
              <th>
                <FormattedMessage
                  id="weeklyForecast.total"
                  defaultMessage={"Total"}
                />
              </th>
              <td>4,230,225</td>
              <td>4,534,660</td>
              <td>-304,435</td>
              <td className="text-red-500">93%</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section
        className="charts"
        style={{
          width: "100%",
          height: "400px",
        }}
      >
        <ResponsiveContainer className={""}>
          <BarChart layout="horizontal" className="text-sm" data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="product" />
            <YAxis />

            <Tooltip />
            <Legend />

            <Bar dataKey="sumOfActualsQty" fill="#2b74ce" />
            <Bar dataKey="sumOfDemandPlannerForecast" fill="#a4c2e6" />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default WeeklyForecast;
