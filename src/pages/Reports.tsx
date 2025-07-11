import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Report } from '../types';
import { FileText, Download, Calendar, TrendingUp, BarChart3 } from 'lucide-react';
import { useDataRefresh } from '../hooks/useDataRefresh';

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchReports = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  // Use the data refresh hook
  useDataRefresh({
    onRefresh: fetchReports,
    dependencies: [],
  });
  const generateReport = async (type: string) => {
    try {
      // This would typically generate actual report data
      const reportData = {
        type,
        generated_at: new Date().toISOString(),
        summary: `${type} report generated successfully`,
      };

      const { error } = await supabase
        .from('reports')
        .insert([{
          supplier_name: `${type} Report`,
          report_data: reportData,
        }]);

      if (error) throw error;
      fetchReports();
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Error generating report');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600">Generate and view business reports</p>
      </div>

      {/* Report Generation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Store Performance</h3>
          </div>
          <p className="text-gray-600 mb-4">Analyze store performance metrics and trends</p>
          <button
            onClick={() => generateReport('Store Performance')}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Generate Report
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Product Analysis</h3>
          </div>
          <p className="text-gray-600 mb-4">Review product categories and supplier data</p>
          <button
            onClick={() => generateReport('Product Analysis')}
            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Generate Report
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Supplier Summary</h3>
          </div>
          <p className="text-gray-600 mb-4">Comprehensive supplier relationship overview</p>
          <button
            onClick={() => generateReport('Supplier Summary')}
            className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Generated Reports */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Generated Reports</h2>
        </div>
        
        {reports.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No reports generated yet. Create your first report above.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {reports.map((report) => (
              <div key={report.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <FileText className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{report.supplier_name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Generated on {new Date(report.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 px-3 py-1 text-sm bg-orange-50 text-orange-600 rounded hover:bg-orange-100 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}