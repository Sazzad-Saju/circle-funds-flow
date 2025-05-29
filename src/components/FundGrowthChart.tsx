
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { month: 'Jan', amount: 45000, target: 41667 },
  { month: 'Feb', amount: 72000, target: 83334 },
  { month: 'Mar', amount: 98000, target: 125001 },
  { month: 'Apr', amount: 125000, target: 166668 },
  { month: 'May', amount: 156000, target: 208335 },
  { month: 'Jun', amount: 189000, target: 250002 },
  { month: 'Jul', amount: 215000, target: 291669 },
  { month: 'Aug', amount: 245800, target: 333336 },
  { month: 'Sep', amount: 275000, target: 375003 },
  { month: 'Oct', amount: 310000, target: 416670 },
  { month: 'Nov', amount: 350000, target: 458337 },
  { month: 'Dec', amount: 500000, target: 500000 },
];

const FundGrowthChart = () => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            className="text-sm"
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            className="text-sm"
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            formatter={(value: number, name: string) => [
              `$${value.toLocaleString()}`, 
              name === 'amount' ? 'Actual' : 'Target'
            ]}
            labelFormatter={(label) => `Month: ${label}`}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="target" 
            stroke="#10b981" 
            strokeWidth={2}
            strokeDasharray="5 5"
            fill="url(#colorTarget)"
            fillOpacity={0.1}
          />
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#3b82f6" 
            strokeWidth={3}
            fill="url(#colorActual)"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FundGrowthChart;
