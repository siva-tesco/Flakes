import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Supplier } from '../types';
import { Plus, Edit, Trash2, Search, Truck } from 'lucide-react';
import { useDataRefresh } from '../hooks/useDataRefresh';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);


  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSuppliers(data || []);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Use the data refresh hook
  useDataRefresh({
    onRefresh: fetchSuppliers,
    dependencies: [],
  });
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.postcode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this supplier?')) return;

    try {
      const { error } = await supabase
        .from('suppliers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSuppliers(suppliers.filter(supplier => supplier.id !== id));
    } catch (error) {
      console.error('Error deleting supplier:', error);
      alert('Error deleting supplier');
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Suppliers</h1>
          <p className="text-gray-600">Manage your supplier relationships</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Supplier</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search suppliers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => (
          <div key={supplier.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Truck className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{supplier.name}</h3>
                  <p className="text-sm text-gray-600">Postcode: {supplier.postcode}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Store Count:</span> {supplier.store_count}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Last Supplied:</span> {new Date(supplier.last_supplied).toLocaleDateString()}
              </p>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setEditingSupplier(supplier)}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-purple-50 text-purple-600 rounded hover:bg-purple-100 transition-colors"
              >
                <Edit className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(supplier.id)}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <div className="text-center py-12">
          <Truck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No suppliers found matching your criteria.</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {(showAddModal || editingSupplier) && (
        <SupplierModal
          supplier={editingSupplier}
          onClose={() => {
            setShowAddModal(false);
            setEditingSupplier(null);
          }}
          onSave={fetchSuppliers}
        />
      )}
    </div>
  );
}

interface SupplierModalProps {
  supplier: Supplier | null;
  onClose: () => void;
  onSave: () => void;
}

function SupplierModal({ supplier, onClose, onSave }: SupplierModalProps) {
  const [formData, setFormData] = useState({
    postcode: supplier?.postcode || '',
    name: supplier?.name || '',
    store_count: supplier?.store_count || 0,
    last_supplied: supplier?.last_supplied || new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (supplier) {
        // Update existing supplier
        const { error } = await supabase
          .from('suppliers')
          .update(formData)
          .eq('id', supplier.id);
        if (error) throw error;
      } else {
        // Create new supplier
        const { error } = await supabase
          .from('suppliers')
          .insert([formData]);
        if (error) throw error;
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving supplier:', error);
      alert('Error saving supplier');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {supplier ? 'Edit Supplier' : 'Add New Supplier'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Supplier Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Postcode
            </label>
            <input
              type="text"
              required
              value={formData.postcode}
              onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Store Count
            </label>
            <input
              type="number"
              required
              min="0"
              value={formData.store_count}
              onChange={(e) => setFormData({ ...formData, store_count: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Supplied
            </label>
            <input
              type="date"
              required
              value={formData.last_supplied}
              onChange={(e) => setFormData({ ...formData, last_supplied: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}