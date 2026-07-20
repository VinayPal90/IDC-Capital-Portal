import React, { useState } from 'react';
import axios from 'axios';
import { Building2, ShieldCheck, Landmark, Calculator, TrendingUp, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function App() {
  // State management for deal parameters and backend response
  const [loanAmount, setLoanAmount] = useState(5000000); 
  const [tenure, setTenure] = useState(12);
  const [dealData, setDealData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Handle API request to backend calculator route
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  
  const handleCalculate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('${API_URL}/api/calculate-deal', {
        loanAmount: Number(loanAmount),
        tenureMonths: Number(tenure)
      });
      setDealData(response.data);
    } catch (err) {
      console.error("Error calculating deal", err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 selection:bg-red-500 selection:text-white">

      {/* ================= HEADER SECTION ================= */}
      <header className="max-w-6xl mx-auto mb-10 border-b border-slate-800/80 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          {/* Pulsing indicator dot and ecosystem title */}
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-xs uppercase tracking-widest text-red-400 font-bold">IDC Capital Ecosystem</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white drop-shadow-sm">Collateral-as-a-Service Portal</h1>
          <p className="text-sm text-slate-400 mt-1">Credit Enhancement Utility & Tripartite Architecture Simulator</p>
        </div>

        {/* Environment status badge */}
        <div className="bg-slate-900/90 backdrop-blur border border-slate-800 px-4 py-2.5 rounded-xl text-xs flex items-center gap-3 shadow-inner">
          <span className="text-slate-400">Environment:</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1.5"><CheckCircle2 size={14}/> Live Sandbox</span>
        </div>
      </header>

      {/* ================= MAIN CONTAINER ================= */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Deal Input Form */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl lg:col-span-1 h-fit">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-red-400">
            <Calculator size={20} /> Deal Parameters
          </h2>
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Loan Amount (INR)</label>
              <input 
                type="number" 
                value={loanAmount} 
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Tenure (Months)</label>
              <input 
                type="number" 
                value={tenure} 
                onChange={(e) => setTenure(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-red-500"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? "Calculating..." : "Simulate Deal Structure"} <ArrowRight size={18} />
            </button>
          </form>

          {/* Quick Summary View Box */}
          {dealData && (
            <div className="mt-6 pt-6 border-t border-slate-700 text-sm space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Total Cost of Capital:</span>
                <span className="text-white font-bold">{dealData.dealSummary.totalCostOfCapitalPercent}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Annual Repayment:</span>
                <span className="text-white font-bold">₹{dealData.dealSummary.annualRepaymentBurden}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Dashboards & Views */}
        <div className="lg:col-span-2 space-y-6">
          {dealData ? (
            <>
              <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 text-sm">
                <button onClick={() => setActiveTab('all')} className={`flex-1 py-2 rounded-lg font-medium transition ${activeTab === 'all' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'}`}>All Views</button>
                <button onClick={() => setActiveTab('startup')} className={`flex-1 py-2 rounded-lg font-medium transition ${activeTab === 'startup' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'}`}>Startup Borrower</button>
                <button onClick={() => setActiveTab('owner')} className={`flex-1 py-2 rounded-lg font-medium transition ${activeTab === 'owner' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'}`}>Property Owner</button>
                <button onClick={() => setActiveTab('bank')} className={`flex-1 py-2 rounded-lg font-medium transition ${activeTab === 'bank' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'}`}>Bank / NBFC</button>
              </div>

              {/* Stakeholder Cards Container */}
              <div className="grid grid-cols-1 gap-6">

                {/* Party 1: Startup Borrower View */}
                {(activeTab === 'all' || activeTab === 'startup') && (
                  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-blue-600 text-xs px-3 py-1 rounded-bl-lg font-bold">Party 1</div>
                    <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2 mb-3"><TrendingUp size={20} /> Startup Borrower Dashboard</h3>
                    <p className="text-slate-300 text-sm mb-4">{dealData.parties.startupBorrower.obligation}</p>
                    <div className="bg-slate-900 p-4 rounded-lg flex justify-between items-center text-sm">
                      <span className="text-slate-400">Est. Monthly Payment Obligation:</span>
                      <span className="text-white font-bold text-base">₹{dealData.parties.startupBorrower.monthlyEstimatedPayment}</span>
                    </div>
                  </div>
                )}

                {/* Party 2: Property Owner View */}
                {(activeTab === 'all' || activeTab === 'owner') && (
                  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-emerald-600 text-xs px-3 py-1 rounded-bl-lg font-bold">Party 2</div>
                    <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2 mb-3"><Building2 size={20} /> Property Owner Portal</h3>
                    <p className="text-slate-300 text-sm mb-2">{dealData.parties.propertyOwner.benefit}</p>
                    <p className="text-slate-400 text-xs mb-4 italic">{dealData.parties.propertyOwner.note}</p>
                    <div className="bg-slate-900 p-4 rounded-lg flex justify-between items-center text-sm">
                      <span className="text-slate-400">Fixed Collateral Rent ({dealData.parties.propertyOwner.fixedCollateralRentRate}):</span>
                      <span className="text-emerald-400 font-bold text-base">₹{dealData.parties.propertyOwner.annualFixedIncome} / year</span>
                    </div>
                  </div>
                )}

                {/* Party 3: Bank / NBFC View */}
                {(activeTab === 'all' || activeTab === 'bank') && (
                  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-amber-600 text-xs px-3 py-1 rounded-bl-lg font-bold">Party 3</div>
                    <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2 mb-3"><Landmark size={20} /> Bank / NBFC Ledger</h3>
                    <p className="text-slate-300 text-sm mb-4">{dealData.parties.bankOrNBFC.security}</p>
                    <div className="bg-slate-900 p-4 rounded-lg flex justify-between items-center text-sm">
                      <span className="text-slate-400">Base Interest Income (9.5%):</span>
                      <span className="text-amber-400 font-bold text-base">₹{dealData.parties.bankOrNBFC.baseInterestIncome}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Risk Mitigation & Buffers Section */}
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-md font-bold text-red-400 flex items-center gap-2 mb-3"><ShieldCheck size={18} /> Risk Mitigation & Buffers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
                    <span className="font-semibold text-slate-200 block mb-1">DSRA Escrow:</span>
                    <span className="text-slate-400">{dealData.riskBuffers.dsra}</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
                    <span className="font-semibold text-slate-200 block mb-1">First-Loss Guarantee (5%):</span>
                    <span className="text-slate-400">{dealData.riskBuffers.firstLossDefaultGuarantee} (Pool: ₹{dealData.riskBuffers.allocatedReserveAmount})</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-slate-800 p-12 rounded-xl border border-slate-700 text-center flex flex-col items-center justify-center text-slate-400">
              <AlertCircle size={48} className="text-slate-600 mb-4" />
              <p className="text-lg font-medium">Enter loan details on the left and simulate the deal to view the active tripartite architecture.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
