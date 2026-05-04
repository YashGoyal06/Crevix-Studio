import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiTrendingUp, 
  FiShoppingBag, 
  FiUsers, 
  FiArrowRight, 
  FiLock,
  FiLogOut,
  FiActivity
} from 'react-icons/fi';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  // Check for existing token
  useEffect(() => {
    const token = localStorage.getItem('crevix_admin_token');
    if (token) {
      setIsLoggedIn(true);
      fetchStats(token);
    }
  }, []);

  const fetchStats = async (token) => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/payments/admin-stats`, {
        headers: {
          'X-Admin-Token': token,
          'ngrok-skip-browser-warning': 'true'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
        setError('');
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.error || `Server error: ${response.status}`);
        if (response.status === 403) handleLogout();
      }
    } catch (err) {
      setError('Could not connect to admin API. Check if backend is running.');
      console.error('Stats fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/payments/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('crevix_admin_token', data.token);
        setIsLoggedIn(true);
        fetchStats(data.token);
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection failed. Is backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('crevix_admin_token');
    setIsLoggedIn(false);
    setStats(null);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
        >
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
            <FiLock className="text-white text-xl" />
          </div>
          <h1 className="text-3xl font-display font-medium text-white mb-2">Admin Portal</h1>
          <p className="text-white/50 mb-8">Enter your special ID and password to continue.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/30 uppercase tracking-widest mb-2 ml-1">Admin ID</label>
              <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 transition-colors"
                placeholder="Enter ID"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/30 uppercase tracking-widest mb-2 ml-1">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm py-2"
              >
                {error}
              </motion.p>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-white text-void rounded-xl py-4 font-medium hover:bg-white/90 transition-colors flex items-center justify-center gap-2 group"
            >
              {loading ? 'Authenticating...' : (
                <>
                  Access Portal
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-void text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 text-white/40 mb-2">
              <FiActivity />
              <span className="text-xs uppercase tracking-[0.2em]">Management Console</span>
            </div>
            <h1 className="text-4xl font-display font-medium tracking-tight">Studio Dashboard</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm w-fit"
          >
            <FiLogOut />
            Logout
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard 
            title="Total Revenue" 
            value={stats ? `₹${stats.total_revenue.toLocaleString()}` : '...'} 
            icon={<FiTrendingUp className="text-emerald-400" />}
            trend="+12.5% this month"
          />
          <StatCard 
            title="Completed Orders" 
            value={stats ? stats.order_count : '...'} 
            icon={<FiShoppingBag className="text-blue-400" />}
            trend="Live sync active"
          />
          <StatCard 
            title="Active Clients" 
            value={stats ? stats.order_count : '...'} 
            icon={<FiUsers className="text-purple-400" />}
            trend="Verified via Razorpay"
          />
        </div>

        {/* Recent Orders */}
        <section className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-xl">
          <div className="p-8 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-xl font-medium">Recent Transactions</h2>
            <button className="text-sm text-white/40 hover:text-white transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-white/30 text-xs uppercase tracking-widest">
                  <th className="px-8 py-6 font-medium">Order ID</th>
                  <th className="px-8 py-6 font-medium">Customer</th>
                  <th className="px-8 py-6 font-medium">Amount</th>
                  <th className="px-8 py-6 font-medium">Date</th>
                  <th className="px-8 py-6 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {stats?.recent_orders.map((order) => (
                  <tr key={order.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6 font-mono text-xs text-white/60">#{order.id.slice(-8).toUpperCase()}</td>
                    <td className="px-8 py-6 text-white/80">{order.email}</td>
                    <td className="px-8 py-6 font-medium">₹{order.amount.toLocaleString()}</td>
                    <td className="px-8 py-6 text-white/40">
                      {new Date(order.date).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      }).replace(',', ' •')}
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.status === 'captured' || order.status === 'paid'
                          ? 'bg-emerald-400/10 text-emerald-400' 
                        : order.status === 'authorized'
                          ? 'bg-amber-400/10 text-amber-400'
                        : order.status === 'failed'
                          ? 'bg-red-400/10 text-red-400'
                        : 'bg-white/10 text-white/40'
                      }`}>
                        <span className={`w-1 h-1 rounded-full ${
                          order.status === 'captured' || order.status === 'paid' ? 'bg-emerald-400 animate-pulse' : 
                          order.status === 'authorized' ? 'bg-amber-400 animate-pulse' : 'bg-current'
                        }`} />
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {(!stats || stats.recent_orders.length === 0) && (
                  <tr>
                    <td colSpan="5" className="px-8 py-12 text-center text-white/20 italic">
                      No transactions found yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl">
          {icon}
        </div>
      </div>
      <div>
        <p className="text-white/40 text-sm font-medium mb-1 uppercase tracking-widest">{title}</p>
        <h3 className="text-4xl font-display font-medium mb-2 tracking-tight">{value}</h3>
        <p className="text-xs text-white/30 font-medium">{trend}</p>
      </div>
    </motion.div>
  );
}
