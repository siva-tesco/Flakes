import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Store } from '../types';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { useDataRefresh } from '../hooks/useDataRefresh';

export default function Stores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);


  const fetchStores = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStores(data || []);
    } catch (error) {
      console.error('Error fetching stores:', error);
    } finally {
      setLoading(false);
    }
  };

  // Use the data refresh hook
  useDataRefresh({
    onRefresh: fetchStores,
    dependencies: [],
  });
  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.area.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || store.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this store?')) return;

    try {
      const { error } = await supabase
        .from('stores')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setStores(stores.filter(store => store.id !== id));
    } catch (error) {
      console.error('Error deleting store:', error);
      alert('Error deleting store');
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
          <h1 className="text-3xl font-bold text-gray-900">Stores</h1>
          <p className="text-gray-600">Manage your store locations and details</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Store</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search stores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map((store) => (
          <div key={store.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{store.name}</h3>
                <p className="text-sm text-gray-600">Code: {store.code}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                store.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {store.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Area:</span> {store.area}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Postcode:</span> {store.postcode}
              </p>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setEditingStore(store)}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
              >
                <Edit className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(store.id)}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStores.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No stores found matching your criteria.</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {(showAddModal || editingStore) && (
        <StoreModal
          store={editingStore}
          onClose={() => {
            setShowAddModal(false);
            setEditingStore(null);
          }}
          onSave={fetchStores}
        />
      )}
    </div>
  );
}

interface StoreModalProps {
  store: Store | null;
  onClose: () => void;
  onSave: () => void;
}

function StoreModal({ store, onClose, onSave }: StoreModalProps) {
  const [formData, setFormData] = useState({
    code: store?.code || '',
    name: store?.name || '',
    area: store?.area || '',
    status: store?.status || 'active',
    postcode: store?.postcode || '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (store) {
        // Update existing store
        const { error } = await supabase
          .from('stores')
          .update(formData)
          .eq('id', store.id);
        if (error) throw error;
      } else {
        // Create new store
        const { error } = await supabase
          .from('stores')
          .insert([formData]);
        if (error) throw error;
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving store:', error);
      alert('Error saving store');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {store ? 'Edit Store' : 'Add New Store'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Store Code
            </label>
            <input
              type="text"
              required
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Store Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Area
            </label>
            <input
              type="text"
              required
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}