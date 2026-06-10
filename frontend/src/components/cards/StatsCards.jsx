import React from 'react';

export const StatsCard = ({ icon: Icon, label, value, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
  };

  return (
    <div className={`card ${colors[color]} border-2`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg ${colors[color]}`}>
            <Icon size={32} />
          </div>
        )}
      </div>
    </div>
  );
};

export const InfoCard = ({ title, content, footer }) => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="text-gray-600">{content}</div>
      {footer && <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">{footer}</div>}
    </div>
  );
};
