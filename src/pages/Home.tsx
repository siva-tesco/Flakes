import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Store, Package, Truck, FileText, TrendingUp, Users, ShoppingCart, BarChart3 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useDataRefresh } from '../hooks/useDataRefresh';

export default function Home() {
  const [stats, setStats] = useState({
    stores: 0,
    products: 0,
    suppliers: 0,
    reports: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [storesResult, productsResult, suppliersResult, reportsResult] = await Promise.all([
        supabase.from('stores').select('id', { count: 'exact', head: true }),
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('suppliers').select('id', { count: 'exact', head: true }),
        supabase.from('reports').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        stores: storesResult.count || 0,
        products: productsResult.count || 0,
        suppliers: suppliersResult.count || 0,
        reports: reportsResult.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Use the data refresh hook
  useDataRefresh({
    onRefresh: fetchStats,
    dependencies: [],
  });

  const menuItems = [
    {
      name: 'Stores',
      href: '/stores',
      icon: Store,
      description: 'Manage store locations and details',
      color: 'bg-blue-500',
    },
    {
      name: 'Products',
      href: '/products',
      icon: Package,
      description: 'View and manage product inventory',
      color: 'bg-green-500',
    },
    {
      name: 'Suppliers',
      href: '/suppliers',
      description: 'Track supplier information and relationships',
      icon: Truck,
      color: 'bg-purple-500',
    },
    {
      name: 'Reports',
      href: '/reports',
      icon: FileText,
      description: 'Generate and view business reports',
      color: 'bg-orange-500',
    },
  ];

  const statsDisplay = [
    { name: 'Total Stores', value: loading ? '...' : stats.stores.toString(), icon: Store, change: '+12%' },
    { name: 'Products', value: loading ? '...' : stats.products.toString(), icon: ShoppingCart, change: '+8%' },
    { name: 'Suppliers', value: loading ? '...' : stats.suppliers.toString(), icon: Users, change: '+3%' },
    { name: 'Reports', value: loading ? '...' : stats.reports.toString(), icon: BarChart3, change: '+15%' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Flakes
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your comprehensive business management platform for stores, products, suppliers, and reporting.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsDisplay.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className={`text-3xl font-bold text-gray-900 ${loading ? 'animate-pulse' : ''}`}>{stat.value}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <Icon className="w-6 h-6 text-gray-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-xl ${item.color} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/stores"
            className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200 group"
          >
            <div className="flex items-center space-x-3">
              <Store className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900 group-hover:text-blue-600">Add New Store</span>
            </div>
          </Link>
          <Link
            to="/products"
            className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200 group"
          >
            <div className="flex items-center space-x-3">
              <Package className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-900 group-hover:text-green-600">Add New Product</span>
            </div>
          </Link>
          <Link
            to="/reports"
            className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200 group"
          >
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-orange-600" />
              <span className="font-medium text-gray-900 group-hover:text-orange-600">Generate Report</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}