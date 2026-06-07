'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Choreo {
  id: string;
  title: string;
  description: string;
  duration: number;
  createdAt: string;
}

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [choreos, setChoreos] = useState<Choreo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newChoreo, setNewChoreo] = useState({
    title: '',
    description: '',
    duration: 0,
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.push('/sign-in');
        return;
      }
      setUser(data.user);
      fetchChoreos();
    };

    checkUser();
  }, [router]);

  const fetchChoreos = async () => {
    try {
      const { data, error } = await supabase
        .from('choreos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setChoreos(data || []);
    } catch (err) {
      console.error('Error fetching choreos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddChoreo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newChoreo.title.trim()) {
      alert('Please enter a choreography title');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('choreos')
        .insert([
          {
            title: newChoreo.title,
            description: newChoreo.description,
            duration: newChoreo.duration,
            user_id: user.id,
          },
        ])
        .select();

      if (error) throw error;

      if (data) {
        setChoreos([data[0], ...choreos]);
        setNewChoreo({ title: '', description: '', duration: 0 });
        setShowModal(false);
      }
    } catch (err) {
      console.error('Error creating choreo:', err);
      alert('Failed to create choreography');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/sign-in');
  };

  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header / Navigation Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-indigo-600">InSync</h1>
          </div>

          {/* Avatar Menu */}
          {user && (
            <div className="relative group">
              <button
                className="w-10 h-10 rounded-full bg-indigo-600 text-white font-semibold flex items-center justify-center hover:bg-indigo-700 transition"
                title={user.email}
              >
                {getInitials(user.email)}
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                <div className="px-4 py-3 border-b">
                  <p className="text-sm text-gray-700 font-medium">{user.email}</p>
                </div>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Title */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">My Choreographies</h2>
            <p className="text-gray-600 mt-1">Manage and organize your dance formations</p>
          </div>

          {/* Add New Button */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 flex items-center gap-2"
          >
            <span>+</span> New Choreography
          </button>
        </div>

        {/* Choreos Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">
              <div className="h-8 w-8 border-4 border-indigo-600 border-r-transparent rounded-full"></div>
            </div>
            <p className="mt-4 text-gray-600">Loading choreographies...</p>
          </div>
        ) : choreos.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-5xl mb-4">🎭</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No choreographies yet</h3>
            <p className="text-gray-600 mb-6">Create your first choreography to get started</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              Create Choreography
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {choreos.map((choreo) => (
              <Link
                key={choreo.id}
                href={`/choreo/${choreo.id}`}
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer h-full">
                  {/* Card Header */}
                  <div className="h-32 bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
                    <div className="text-4xl">🎵</div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {choreo.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {choreo.description || 'No description provided'}
                    </p>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className="text-sm text-gray-500">
                        {choreo.duration ? `${choreo.duration} min` : 'No duration set'}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(choreo.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Modal for Adding New Choreography */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">New Choreography</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddChoreo} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={newChoreo.title}
                    onChange={(e) => setNewChoreo({ ...newChoreo, title: e.target.value })}
                    placeholder="Enter choreography title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={newChoreo.description}
                    onChange={(e) => setNewChoreo({ ...newChoreo, description: e.target.value })}
                    placeholder="Describe your choreography"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    id="duration"
                    type="number"
                    value={newChoreo.duration}
                    onChange={(e) => setNewChoreo({ ...newChoreo, duration: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
