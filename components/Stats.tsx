import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { getStats } from '../services/storageService';

export const Stats: React.FC = () => {
  const stats = getStats();
  
  const data = [
    { name: 'Выучено', value: stats.learned, color: '#22c55e' }, // green-500
    { name: 'В процессе', value: stats.started - stats.learned - stats.struggling, color: '#3b82f6' }, // blue-500
    { name: 'Сложно', value: stats.struggling, color: '#ef4444' }, // red-500
    { name: 'Новое', value: stats.total - stats.started, color: '#cbd5e1' }, // slate-300
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between">
      <div className="mb-4 md:mb-0">
        <h3 className="text-lg font-bold text-slate-800 mb-1">Ваш прогресс</h3>
        <p className="text-slate-500 text-sm">Всего вопросов: {stats.total}</p>
      </div>
      
      <div className="h-32 w-32 relative">
         <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={25}
                outerRadius={40}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
         </ResponsiveContainer>
      </div>

      <div className="flex flex-col gap-2 text-xs text-slate-600">
        {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span>{item.name}: {item.value}</span>
            </div>
        ))}
      </div>
    </div>
  );
};
