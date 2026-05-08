import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const CustomBarChart = ({ data }) => {

  const getBarColor = (entry) => {
    switch (entry?.priority) {
      case 'Low':
        return '#22c55e';
      case 'Medium':
        return '#a855f7';
      case 'High':
        return '#ef4444';
      default:
        return '#a855f7';
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-lg text-white">

          <p className="text-sm font-semibold text-indigo-200 mb-1">
            {payload[0].payload.priority}
          </p>

          <p className="text-xs text-gray-300">
            Count:
            <span className="text-white font-medium ml-1">
              {payload[0].payload.count}
            </span>
          </p>

        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-4 bg-transparent">

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={data}>

          {/* grid removed for cleaner AI look */}
          <CartesianGrid stroke="rgba(255,255,255,0.05)" />

          <XAxis
            dataKey="priority"
            tick={{ fontSize: 12, fill: '#cbd5e1' }}
            stroke="rgba(255,255,255,0.1)"
          />

          <YAxis
            tick={{ fontSize: 12, fill: '#cbd5e1' }}
            stroke="rgba(255,255,255,0.1)"
          />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139,92,246,0.1)' }} />

          <Bar
            dataKey="count"
            radius={[10, 10, 0, 0]}
          >
            {data?.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry)} />
            ))}
          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default CustomBarChart;