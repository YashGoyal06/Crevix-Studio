import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  FiTrendingUp, 
  FiShoppingBag, 
  FiUsers, 
  FiArrowRight, 
  FiLock,
  FiLogOut,
  FiActivity
} from 'react-icons/fi';
import Meta from '../components/ui/Meta';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

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
      setError('Could not connect to admin API.');
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
      setError('Connection failed.');
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
      <div className="min-h-screen bg-void flex items-center justify-center p-6 relative overflow-hidden">
        <Meta title="Admin Login" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,84,255,0.1),transparent_50%)]" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white/[0.03] border border-white/[0.08] rounded-[2.5rem] p-8 md:p-10 backdrop-blur-3xl relative z-10"
        >
          <div className="w-14 h-14 bg-white/[0.05] rounded-2xl flex items-center justify-center mb-8 mx-auto border border-white/[0.1]">
            <FiLock className="text-white text-2xl" />
          </div>
          <div className="text-center mb-10">
            <h1 className="text-3xl font-syne font-bold text-white mb-3">Admin Portal</h1>
            <p className="text-white/40 font-sans text-sm">Authentication required to access studio metrics.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] font-sans font-medium text-white/30 uppercase tracking-[0.2em] mb-2.5 ml-1">Admin ID</label>
              <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/20 transition-all font-sans text-sm"
                placeholder="Enter ID"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-sans font-medium text-white/30 uppercase tracking-[0.2em] mb-2.5 ml-1">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/20 transition-all font-sans text-sm"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-xs py-2 text-center font-sans"
              >
                {error}
              </motion.p>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-white text-void rounded-full py-4.5 font-sans font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 group mt-4 h-[56px]"
            >
              {loading ? 'Authenticating...' : (
                <>
                  Enter Dashboard
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
    <div className="min-h-screen bg-[#020203] text-white p-4 md:p-10 lg:p-16 relative overflow-hidden">
      <Meta title="Admin Dashboard" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(120,84,255,0.05),transparent_40%),radial-gradient(circle_at_90%_90%,rgba(0,183,255,0.05),transparent_40%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 text-white/30 mb-3">
              <FiActivity className="text-purple-400" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold">Crevix Internal Console</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-syne font-bold tracking-tight">Studio Dashboard.</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all font-sans text-sm font-medium w-fit group"
          >
            <FiLogOut className="group-hover:-translate-x-1 transition-transform" />
            Sign Out
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <AdminStatCard 
            title="Total Revenue" 
            value={stats ? `₹${stats.total_revenue.toLocaleString()}` : '...'} 
            icon={<FiTrendingUp className="text-emerald-400" />}
            trend="+12.5% vs last month"
            color="#34D399"
          />
          <AdminStatCard 
            title="Pending Payments" 
            value="₹12,500" 
            icon={<FiActivity className="text-amber-400" />}
            trend="4 projects in progress"
            color="#FBBF24"
          />
          <AdminStatCard 
            title="Active Clients" 
            value={stats ? stats.order_count : '...'} 
            icon={<FiUsers className="text-purple-400" />}
            trend="New projects this week"
            color="#A78BFA"
          />
          <AdminStatCard 
            title="Avg. Project Value" 
            value={stats ? `₹${Math.round(stats.total_revenue / (stats.order_count || 1)).toLocaleString()}` : '...'} 
            icon={<FiShoppingBag className="text-blue-400" />}
            trend="High ticket conversion"
            color="#60A5FA"
          />
        </div>

        {/* Recent Orders */}
        <section className="bg-white/[0.02] border border-white/[0.08] rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
          <div className="p-8 md:p-10 border-b border-white/[0.08] flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-syne font-bold mb-1">Recent Transactions</h2>
              <p className="text-white/40 text-sm font-sans">Live feed of payments processed through Razorpay.</p>
            </div>
            <button className="text-xs uppercase tracking-widest text-white/30 hover:text-white transition-colors font-sans font-bold">Refresh</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-sans font-bold">
                  <th className="px-10 py-7 border-b border-white/[0.05]">Order ID</th>
                  <th className="px-10 py-7 border-b border-white/[0.05]">Customer</th>
                  <th className="px-10 py-7 border-b border-white/[0.05]">Amount</th>
                  <th className="px-10 py-7 border-b border-white/[0.05]">Project Status</th>
                  <th className="px-10 py-7 border-b border-white/[0.05]">Date</th>
                  <th className="px-10 py-7 border-b border-white/[0.05]">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {stats?.recent_orders.map((order) => (
                  <tr key={order.id} className="group hover:bg-white/[0.01] transition-all">
                    <td className="px-10 py-8 font-mono text-[11px] text-white/50">#{order.id.slice(-8).toUpperCase()}</td>
                    <td className="px-10 py-8 font-sans font-medium text-white/80">{order.email}</td>
                    <td className="px-10 py-8 font-syne font-bold text-base">₹{order.amount.toLocaleString()}</td>
                    <td className="px-10 py-8">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-3 py-1 text-[10px] font-sans font-medium text-white/40">
                        {order.status === 'captured' ? 'Developing' : 'Awaiting Payment'}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-white/40 font-sans">
                      {new Date(order.date).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-10 py-8">
                      <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                        order.status === 'captured' || order.status === 'paid'
                          ? 'bg-emerald-400/5 text-emerald-400 border-emerald-400/20' 
                        : order.status === 'authorized'
                          ? 'bg-amber-400/5 text-amber-400 border-amber-400/20'
                        : order.status === 'failed'
                          ? 'bg-red-400/5 text-red-400 border-red-400/20'
                        : 'bg-white/5 text-white/40 border-white/10'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          order.status === 'captured' || order.status === 'paid' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 
                          order.status === 'authorized' ? 'bg-amber-400 animate-pulse' : 'bg-current'
                        }`} />
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(!stats || stats.recent_orders.length === 0) && (
              <div className="px-10 py-20 text-center text-white/20 italic font-sans">
                Waiting for incoming transaction data...
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function AdminStatCard({ title, value, icon, trend, color }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { stiffness: 150, damping: 25 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const rotateX = useTransform(smoothY, [0, 1], [6, -6]);
  const rotateY = useTransform(smoothX, [0, 1], [-6, 6]);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: '1000px' }}
      className="group bg-white/[0.03] border border-white/[0.08] rounded-[2.5rem] p-8 md:p-10 backdrop-blur-3xl relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-8">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <div className="h-2 w-2 rounded-full mt-2" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }} />
        </div>
        <div>
          <p className="text-white/30 text-[11px] font-sans font-bold mb-2 uppercase tracking-[0.2em]">{title}</p>
          <h3 className="text-4xl font-syne font-bold mb-3 tracking-tight">{value}</h3>
          <p className="text-[10px] text-white/20 font-sans font-bold uppercase tracking-widest">{trend}</p>
        </div>
      </div>
    </motion.div>
  );
}
