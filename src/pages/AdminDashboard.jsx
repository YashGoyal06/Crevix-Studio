import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
  FiTrendingUp, 
  FiShoppingBag, 
  FiUsers, 
  FiArrowRight, 
  FiLock,
  FiLogOut,
  FiActivity,
  FiFileText,
  FiCopy,
  FiExternalLink,
  FiDownload
} from 'react-icons/fi';
import Meta from '../components/ui/Meta';
import { previewInvoice, generateInvoice } from '../lib/payments';
import { createAgreement } from '../api/agreements/agreementRepository';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';

/* ─── AGREEMENT FORM INITIAL STATE ─── */
const agreementInitialForm = {
  client_name: '',
  client_email: '',
  brand_name: '',
  project_name: '',
  service_type: 'Logo Design',
  deliverables: '',
  project_description: '',
  timeline: '14 working days',
  revision_count: 3,
  project_cost: 25000,
  advance_amount: 10000,
  remaining_amount: 15000,
};

const agreementTestData = {
  client_name: 'Rahul Sharma',
  client_email: 'rahul@example.com',
  brand_name: 'TechNova',
  project_name: 'TechNova Brand Identity',
  service_type: 'Branding',
  deliverables: 'Logo Design, Brand Guidelines, Social Media Kit, Business Card Design, Letterhead',
  project_description: 'Complete brand identity design for TechNova, a Delhi-based SaaS startup building AI-powered HR tools. Modern, premium, tech-forward aesthetic.',
  timeline: '21 working days',
  revision_count: 4,
  project_cost: 45000,
  advance_amount: 20000,
  remaining_amount: 25000,
};

const agreementFields = [
  ['client_name', 'Client Name', 'text'],
  ['client_email', 'Client Email', 'email'],
  ['brand_name', 'Brand Name', 'text'],
  ['project_name', 'Project Name', 'text'],
  ['deliverables', 'Deliverables', 'textarea'],
  ['project_description', 'Project Description', 'textarea'],
  ['timeline', 'Timeline', 'text'],
  ['revision_count', 'Revision Count', 'number'],
  ['project_cost', 'Project Cost (₹)', 'number'],
  ['advance_amount', 'Advance Amount (₹)', 'number'],
  ['remaining_amount', 'Remaining Amount (₹)', 'number'],
];

/* ─── INVOICE FORM INITIAL STATE ─── */
const invoiceInitialForm = {
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  businessName: '',
  itemName: 'Service Package',
  itemType: 'Web Design & Development',
  itemAmount: 25000,
  paymentType: 'full',
  advancePrice: 10000,
  remainingPrice: 15000,
};

const invoiceTestData = {
  customerName: 'Priya Kapoor',
  customerEmail: 'priya@novadesigns.in',
  customerPhone: '+91 98765 43210',
  businessName: 'Nova Designs Pvt. Ltd.',
  itemName: 'Premium Website Package',
  itemType: 'Full-Stack Web Development',
  itemAmount: 65000,
  paymentType: 'advance',
  advancePrice: 30000,
  remainingPrice: 35000,
};

/* ─── STUDIO TOOL TABS ─── */
const TOOL_TABS = [
  { id: 'agreement', label: 'Agreement Generator', icon: <FiFileText /> },
  { id: 'invoice', label: 'Invoice Generator', icon: <FiDownload /> },
  { id: 'preview', label: 'Preview Invoice', icon: <FiExternalLink /> },
];

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('agreement');

  /* Agreement form state */
  const [agrForm, setAgrForm] = useState(agreementInitialForm);
  const [agrCreating, setAgrCreating] = useState(false);
  const [agrResult, setAgrResult] = useState(null);
  const [agrError, setAgrError] = useState('');

  /* Invoice form state */
  const [invForm, setInvForm] = useState(invoiceInitialForm);

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

  /* ─── Agreement Handlers ─── */
  const handleAgrSubmit = async (e) => {
    e.preventDefault();
    setAgrCreating(true);
    setAgrError('');
    setAgrResult(null);

    try {
      const payload = {
        ...agrForm,
        revision_count: Number(agrForm.revision_count || 0),
        project_cost: Number(agrForm.project_cost || 0),
        advance_amount: Number(agrForm.advance_amount || 0),
        remaining_amount: Number(agrForm.remaining_amount || 0),
        agreement_date: new Date().toISOString(),
      };
      const created = await createAgreement(payload);
      setAgrResult(created);
    } catch (nextError) {
      setAgrError(nextError.message || 'Unable to create agreement.');
    } finally {
      setAgrCreating(false);
    }
  };

  const copyAgrLink = async () => {
    if (!agrResult?.signingUrl) return;
    await navigator.clipboard.writeText(agrResult.signingUrl);
  };

  /* ─── Invoice Handlers ─── */
  const handleInvGenerate = () => {
    const isAdvance = invForm.paymentType === 'advance';
    const isRemaining = invForm.paymentType === 'remaining';
    let total = Number(invForm.itemAmount) || 0;
    if (isAdvance) total = Number(invForm.advancePrice) || 0;
    if (isRemaining) total = Number(invForm.remainingPrice) || 0;

    const checkoutData = {
      customer: {
        name: invForm.customerName || 'Customer Name',
        email: invForm.customerEmail || 'Email Address',
        phone: invForm.customerPhone || 'Phone Number',
        businessName: invForm.businessName || '',
      },
      items: [{
        id: 'manual-invoice',
        name: invForm.itemName || 'Service Package',
        type: invForm.itemType || 'Web Design & Development',
        amount: Number(invForm.itemAmount) || 0,
        advancePrice: Number(invForm.advancePrice) || 0,
        remainingPrice: Number(invForm.remainingPrice) || 0,
        fullPrice: Number(invForm.itemAmount) || 0,
      }],
      total,
      isAdvance,
      isRemaining,
      paymentId: `pay_MANUAL_${Date.now().toString(36).toUpperCase()}`,
      orderId: `order_MANUAL_${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
    };

    generateInvoice(checkoutData);
  };

  /* ─── LOGIN SCREEN ─── */
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

  /* ─── MAIN DASHBOARD ─── */
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

        {/* ═══════════════════════════════════════════════ */}
        {/* STUDIO TOOLS – TABBED PANEL                    */}
        {/* ═══════════════════════════════════════════════ */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-syne font-bold">Studio Tools</h2>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {TOOL_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-sans font-semibold transition-all duration-200 border ${
                  activeTab === tab.id
                    ? 'bg-white text-[#020203] border-white shadow-lg'
                    : 'bg-white/[0.03] text-white/50 border-white/[0.08] hover:text-white hover:bg-white/[0.06] hover:border-white/20'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {/* ── AGREEMENT GENERATOR TAB ── */}
            {activeTab === 'agreement' && (
              <motion.div
                key="agreement"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="bg-white/[0.02] border border-white/[0.08] rounded-[2.5rem] p-8 md:p-10 backdrop-blur-3xl"
              >
                <div className="mb-8">
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-sans font-bold mb-2">Client Agreements</p>
                  <h3 className="text-xl font-syne font-bold">Generate New Agreement</h3>
                  <p className="text-white/30 text-sm mt-1 font-sans">Fill in the project details to generate a signing link.</p>
                  <button
                    type="button"
                    onClick={() => setAgrForm(agreementTestData)}
                    className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-400 text-xs font-sans font-bold uppercase tracking-widest hover:bg-purple-500/20 transition-all"
                  >
                    ⚡ Fill Test Data
                  </button>
                </div>

                <form onSubmit={handleAgrSubmit} className="space-y-6">
                  {/* Service Type */}
                  <div>
                    <label className="block text-[11px] font-sans font-medium text-white/30 uppercase tracking-[0.2em] mb-2.5 ml-1">Service Type</label>
                    <select
                      className="w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-white/20 transition-all font-sans text-sm appearance-none cursor-pointer"
                      value={agrForm.service_type}
                      onChange={(e) => setAgrForm({ ...agrForm, service_type: e.target.value })}
                    >
                      <option className="bg-[#0a0a0a]">Logo Design</option>
                      <option className="bg-[#0a0a0a]">Website Development</option>
                      <option className="bg-[#0a0a0a]">Social Media</option>
                      <option className="bg-[#0a0a0a]">Branding</option>
                    </select>
                  </div>

                  {/* Field Grid */}
                  <div className="grid gap-5 md:grid-cols-2">
                    {agreementFields.map(([field, label, type]) => (
                      <div key={field} className={type === 'textarea' ? 'md:col-span-2' : ''}>
                        <label className="block text-[11px] font-sans font-medium text-white/30 uppercase tracking-[0.2em] mb-2.5 ml-1">{label}</label>
                        {type === 'textarea' ? (
                          <textarea
                            className="min-h-24 w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-white/20 transition-all font-sans text-sm resize-none"
                            required
                            value={agrForm[field]}
                            onChange={(e) => setAgrForm({ ...agrForm, [field]: e.target.value })}
                          />
                        ) : (
                          <input
                            className="w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-white/20 transition-all font-sans text-sm"
                            required
                            type={type}
                            value={agrForm[field]}
                            onChange={(e) => setAgrForm({ ...agrForm, [field]: e.target.value })}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={agrCreating}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white text-[#020203] font-sans font-bold text-sm hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed group"
                  >
                    {agrCreating ? (
                      <span className="inline-block w-4 h-4 border-2 border-[#020203]/30 border-t-[#020203] rounded-full animate-spin" />
                    ) : (
                      <FiFileText />
                    )}
                    {agrCreating ? 'Generating...' : 'Generate Agreement'}
                    {!agrCreating && <FiArrowRight className="group-hover:translate-x-1 transition-transform" />}
                  </button>
                </form>

                {/* Agreement Error */}
                {agrError && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 p-4 rounded-2xl border border-red-400/20 bg-red-400/5 text-red-400 text-sm font-sans"
                  >
                    {agrError}
                  </motion.div>
                )}

                {/* Agreement Success Result */}
                {agrResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/5"
                  >
                    <h4 className="font-syne font-bold text-emerald-400 mb-2">✓ Agreement Created</h4>
                    <p className="text-sm text-white/60 font-sans break-all mb-4">{agrResult.signingUrl}</p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={copyAgrLink}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-400 text-[#020203] font-sans font-bold text-sm hover:opacity-90 transition-all"
                      >
                        <FiCopy size={14} />
                        Copy Link
                      </button>
                      <a
                        href={agrResult.signingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.05] border border-white/[0.15] text-white font-sans font-bold text-sm hover:bg-white/[0.1] transition-all"
                      >
                        <FiExternalLink size={14} />
                        Open Agreement
                      </a>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* ── INVOICE GENERATOR TAB ── */}
            {activeTab === 'invoice' && (
              <motion.div
                key="invoice"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="bg-white/[0.02] border border-white/[0.08] rounded-[2.5rem] p-8 md:p-10 backdrop-blur-3xl"
              >
                <div className="mb-8">
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-sans font-bold mb-2">Manual Invoicing</p>
                  <h3 className="text-xl font-syne font-bold">Generate PDF Invoice</h3>
                  <p className="text-white/30 text-sm mt-1 font-sans">Fill client and project info to generate a downloadable Crevix-branded PDF invoice.</p>
                  <button
                    type="button"
                    onClick={() => setInvForm(invoiceTestData)}
                    className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-400 text-xs font-sans font-bold uppercase tracking-widest hover:bg-purple-500/20 transition-all"
                  >
                    ⚡ Fill Test Data
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Customer Details */}
                  <div>
                    <p className="text-[11px] font-sans font-bold text-white/40 uppercase tracking-[0.2em] mb-4 ml-1">Customer Details</p>
                    <div className="grid gap-5 md:grid-cols-2">
                      {[
                        ['customerName', 'Customer Name', 'text'],
                        ['customerEmail', 'Email Address', 'email'],
                        ['customerPhone', 'Phone Number', 'tel'],
                        ['businessName', 'Business Name (Optional)', 'text'],
                      ].map(([field, label, type]) => (
                        <div key={field}>
                          <label className="block text-[11px] font-sans font-medium text-white/30 uppercase tracking-[0.2em] mb-2.5 ml-1">{label}</label>
                          <input
                            className="w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-white/20 transition-all font-sans text-sm"
                            type={type}
                            value={invForm[field]}
                            onChange={(e) => setInvForm({ ...invForm, [field]: e.target.value })}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Line Item */}
                  <div>
                    <p className="text-[11px] font-sans font-bold text-white/40 uppercase tracking-[0.2em] mb-4 ml-1">Line Item</p>
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-sans font-medium text-white/30 uppercase tracking-[0.2em] mb-2.5 ml-1">Item Name</label>
                        <input
                          className="w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-white/20 transition-all font-sans text-sm"
                          value={invForm.itemName}
                          onChange={(e) => setInvForm({ ...invForm, itemName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-sans font-medium text-white/30 uppercase tracking-[0.2em] mb-2.5 ml-1">Item Type / Description</label>
                        <input
                          className="w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-white/20 transition-all font-sans text-sm"
                          value={invForm.itemType}
                          onChange={(e) => setInvForm({ ...invForm, itemType: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-sans font-medium text-white/30 uppercase tracking-[0.2em] mb-2.5 ml-1">Total Amount (₹)</label>
                        <input
                          className="w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-white/20 transition-all font-sans text-sm"
                          type="number"
                          value={invForm.itemAmount}
                          onChange={(e) => setInvForm({ ...invForm, itemAmount: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-sans font-medium text-white/30 uppercase tracking-[0.2em] mb-2.5 ml-1">Payment Type</label>
                        <select
                          className="w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-white/20 transition-all font-sans text-sm appearance-none cursor-pointer"
                          value={invForm.paymentType}
                          onChange={(e) => setInvForm({ ...invForm, paymentType: e.target.value })}
                        >
                          <option value="full" className="bg-[#0a0a0a]">Full Payment</option>
                          <option value="advance" className="bg-[#0a0a0a]">Advance Payment</option>
                          <option value="remaining" className="bg-[#0a0a0a]">Remaining Payment</option>
                        </select>
                      </div>
                    </div>

                    {/* Conditional Advance/Remaining Fields */}
                    {invForm.paymentType !== 'full' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="grid gap-5 md:grid-cols-2 mt-5"
                      >
                        <div>
                          <label className="block text-[11px] font-sans font-medium text-white/30 uppercase tracking-[0.2em] mb-2.5 ml-1">Advance Amount (₹)</label>
                          <input
                            className="w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-white/20 transition-all font-sans text-sm"
                            type="number"
                            value={invForm.advancePrice}
                            onChange={(e) => setInvForm({ ...invForm, advancePrice: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-sans font-medium text-white/30 uppercase tracking-[0.2em] mb-2.5 ml-1">Remaining Amount (₹)</label>
                          <input
                            className="w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-white/20 transition-all font-sans text-sm"
                            type="number"
                            value={invForm.remainingPrice}
                            onChange={(e) => setInvForm({ ...invForm, remainingPrice: e.target.value })}
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleInvGenerate}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white text-[#020203] font-sans font-bold text-sm hover:opacity-90 transition-all group"
                  >
                    <FiDownload />
                    Download Invoice PDF
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── PREVIEW INVOICE TAB ── */}
            {activeTab === 'preview' && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="bg-white/[0.02] border border-white/[0.08] rounded-[2.5rem] p-8 md:p-10 backdrop-blur-3xl"
              >
                <div className="mb-8">
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-sans font-bold mb-2">Internal Tools</p>
                  <h3 className="text-xl font-syne font-bold">Preview Premium Invoice</h3>
                  <p className="text-white/30 text-sm mt-1 font-sans">Generate a sample PDF with dummy data to verify the invoice design and layout.</p>
                </div>

                <button
                  type="button"
                  onClick={previewInvoice}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white text-[#020203] font-sans font-bold text-sm hover:opacity-90 transition-all group"
                >
                  <FiExternalLink />
                  Generate Sample Invoice
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
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
