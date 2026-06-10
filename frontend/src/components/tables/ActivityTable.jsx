import React from 'react';
import { formatDateTime, getActionBadgeColor } from '../../utils/helpers';
import { Pagination } from './Common';

export const ActivityLogsTable = ({ logs, isLoading, pagination, onPageChange }) => {
  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!logs || logs.length === 0) {
    return <div className="text-center py-8 text-gray-500">No activity logs found</div>;
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">User</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Action</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Description</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {log.userId?.name || 'Unknown'}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getActionBadgeColor(log.action)}`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{log.description}</td>
                <td className="px-6 py-4 text-gray-600">{formatDateTime(log.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && <Pagination {...pagination} onPageChange={onPageChange} />}
    </>
  );
};
