"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Ship,
  LayoutGrid,
  Calendar,
  MessageSquare,
  PieChart,
  Settings,
  Bell,
  Search,
  Plus,
  TrendingUp,
  Users,
  Star,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

type Tab = "dashboard" | "bookings" | "inbox" | "houseboats" | "performance" | "account";

const sidebarSections = [
  {
    heading: "Overview",
    items: [
      { tab: "dashboard" as Tab, icon: LayoutGrid, label: "Dashboard" },
      { tab: "bookings" as Tab, icon: Calendar, label: "Bookings", badge: "8" },
      { tab: "inbox" as Tab, icon: MessageSquare, label: "Inbox", badge: "3" },
    ],
  },
  {
    heading: "Management",
    items: [
      { tab: "houseboats" as Tab, icon: Ship, label: "My Houseboats" },
      { tab: "performance" as Tab, icon: PieChart, label: "Performance" },
    ],
  },
  {
    heading: "Settings",
    items: [
      { tab: "account" as Tab, icon: Settings, label: "Account" },
    ],
  },
];

interface ActivityItem {
  id: number;
  guest: string;
  boat: string;
  dates: string;
  pax: number;
  status: "pending" | "accepted" | "declined";
}

const initialActivities: ActivityItem[] = [
  { id: 1, guest: "Sarah Tan", boat: "Blue Fern Houseboat", dates: "12-14 Mar", pax: 15, status: "pending" },
  { id: 2, guest: "Ahmad Razak", boat: "Sungai Perak Explorer", dates: "18-19 Mar", pax: 25, status: "pending" },
  { id: 3, guest: "Jenny Lim", boat: "Blue Fern Houseboat", dates: "22-24 Mar", pax: 10, status: "pending" },
  { id: 4, guest: "Mohd Hafiz", boat: "Rumah Air Belum", dates: "1-2 Apr", pax: 20, status: "pending" },
];

// Simple revenue data for bar chart
const revenueData = [
  { month: "Sep", value: 28000 },
  { month: "Oct", value: 35000 },
  { month: "Nov", value: 31000 },
  { month: "Dec", value: 48000 },
  { month: "Jan", value: 38000 },
  { month: "Feb", value: 42500 },
];

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);
  const [showNotif, setShowNotif] = useState(false);

  function handleAction(id: number, action: "accepted" | "declined") {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: action } : a))
    );
  }

  const pendingCount = activities.filter((a) => a.status === "pending").length;
  const acceptedCount = activities.filter((a) => a.status === "accepted").length;

  const maxRevenue = Math.max(...revenueData.map((d) => d.value));

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-navy-900 text-slate-300 flex-shrink-0 hidden md:flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-navy-800">
          <Link href="/" className="flex items-center gap-2 group text-white">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Ship className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              Belum<span className="text-blue-500">Partner</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarSections.map((section) => (
            <div key={section.heading}>
              <div className="text-xs font-bold text-navy-500 uppercase tracking-widest px-4 mt-6 mb-2">
                {section.heading}
              </div>
              {section.items.map((item) => (
                <button
                  key={item.tab}
                  onClick={() => setActiveTab(item.tab)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === item.tab
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                      : "text-slate-400 hover:bg-navy-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </div>
                  {item.badge && (
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-navy-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-white">
              CF
            </div>
            <div>
              <div className="text-sm font-bold text-white">Capt. Faizal</div>
              <div className="text-xs text-slate-500">Operator ID: #8821</div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* HEADER */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-display font-bold text-navy-900 capitalize">
              {activeTab === "houseboats" ? "My Houseboats" : activeTab}
            </h1>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
              Verified Partner
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-navy-900 w-64"
              />
            </div>

            {/* Notification bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotif(!showNotif)}
                className="p-2 relative hover:bg-slate-50 rounded-full transition-colors"
              >
                <Bell className="w-5 h-5 text-slate-500" />
                {pendingCount > 0 && (
                  <div className="w-2 h-2 bg-rose-500 rounded-full absolute top-2 right-2 border-2 border-white" />
                )}
              </button>
              {showNotif && (
                <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-slate-200 bg-white py-2 shadow-lg z-50">
                  <p className="px-4 py-2 text-xs font-bold text-slate-400 uppercase">
                    Notifications
                  </p>
                  {pendingCount > 0 ? (
                    <p className="px-4 py-3 text-sm text-slate-600">
                      You have <span className="font-bold text-navy-900">{pendingCount}</span> pending booking
                      {pendingCount > 1 ? "s" : ""} to review.
                    </p>
                  ) : (
                    <p className="px-4 py-3 text-sm text-slate-500">
                      All caught up! No pending requests.
                    </p>
                  )}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="bg-navy-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/20"
            >
              <Plus className="w-4 h-4" /> New Listing
            </Link>
          </div>
        </header>

        {/* TAB CONTENT */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === "dashboard" && (
            <>
              {/* STATS ROW */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard icon={TrendingUp} label="Total Revenue (Feb)" value="RM 42,500" trend="+12%" />
                <StatCard icon={Calendar} label="Active Bookings" value={String(8 + acceptedCount)} trend={`+${acceptedCount || 2}`} />
                <StatCard icon={Clock} label="Pending Requests" value={String(pendingCount)} trend={pendingCount > 0 ? "Review now" : "All clear"} urgent={pendingCount > 0} />
                <StatCard icon={Star} label="Average Rating" value="4.92" trend="Top 5%" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* REVENUE CHART */}
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display font-bold text-navy-900">Revenue (6 months)</h3>
                    <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-full">
                      +12% vs last period
                    </span>
                  </div>
                  <div className="flex items-end gap-4 h-48">
                    {revenueData.map((d) => (
                      <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                        <span className="text-[10px] font-bold text-navy-900">
                          {(d.value / 1000).toFixed(0)}k
                        </span>
                        <div
                          className="w-full rounded-t-lg bg-blue-500 transition-all duration-500 hover:bg-blue-600"
                          style={{ height: `${(d.value / maxRevenue) * 100}%` }}
                        />
                        <span className="text-[11px] text-slate-500">{d.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RECENT ACTIVITY */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <h3 className="font-display font-bold text-navy-900 mb-6">
                    Recent Activity
                  </h3>
                  <div className="space-y-6">
                    {activities
                      .filter((a) =>
                        !searchQuery ||
                        a.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        a.boat.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              item.status === "accepted"
                                ? "bg-emerald-50 text-emerald-600"
                                : item.status === "declined"
                                ? "bg-rose-50 text-rose-500"
                                : "bg-blue-50 text-blue-600"
                            }`}
                          >
                            {item.status === "accepted" ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : item.status === "declined" ? (
                              <XCircle className="w-4 h-4" />
                            ) : (
                              <Calendar className="w-4 h-4" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-navy-900">
                              {item.status === "pending"
                                ? "New booking request from "
                                : item.status === "accepted"
                                ? "Booking confirmed for "
                                : "Booking declined for "}
                              <span className="font-bold">{item.guest}</span>
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {item.boat} &bull; {item.dates} &bull; {item.pax} Pax
                            </p>
                            {item.status === "pending" && (
                              <div className="mt-2 flex gap-2">
                                <button
                                  onClick={() => handleAction(item.id, "accepted")}
                                  className="text-xs font-bold text-white bg-navy-900 px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => handleAction(item.id, "declined")}
                                  className="text-xs font-bold text-slate-600 border border-slate-200 px-3 py-1 rounded hover:bg-slate-50 transition-colors"
                                >
                                  Decline
                                </button>
                              </div>
                            )}
                            {item.status === "accepted" && (
                              <span className="mt-1 inline-block text-[11px] font-bold text-emerald-600">
                                Confirmed
                              </span>
                            )}
                            {item.status === "declined" && (
                              <span className="mt-1 inline-block text-[11px] font-bold text-rose-500">
                                Declined
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "bookings" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-8">
              <h2 className="font-display text-xl font-bold text-navy-900 mb-6">All Bookings</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-xs font-bold uppercase text-slate-400">
                      <th className="pb-3 pr-4">Guest</th>
                      <th className="pb-3 pr-4">Houseboat</th>
                      <th className="pb-3 pr-4">Dates</th>
                      <th className="pb-3 pr-4">Pax</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activities.map((a) => (
                      <tr key={a.id} className="hover:bg-slate-50">
                        <td className="py-3 pr-4 font-medium text-navy-900">{a.guest}</td>
                        <td className="py-3 pr-4 text-slate-600">{a.boat}</td>
                        <td className="py-3 pr-4 text-slate-600">{a.dates}</td>
                        <td className="py-3 pr-4 text-slate-600">{a.pax}</td>
                        <td className="py-3">
                          <span
                            className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-bold ${
                              a.status === "accepted"
                                ? "bg-emerald-50 text-emerald-600"
                                : a.status === "declined"
                                ? "bg-rose-50 text-rose-500"
                                : "bg-amber-50 text-amber-600"
                            }`}
                          >
                            {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "inbox" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <h2 className="font-display text-xl font-bold text-navy-900 mb-2">Inbox</h2>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                Guest messages will appear here. Respond quickly to maintain your response rate.
                You currently have a <span className="font-bold text-navy-900">98%</span> response rate.
              </p>
            </div>
          )}

          {activeTab === "houseboats" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold text-navy-900">My Houseboats</h2>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 rounded-lg bg-navy-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-600"
                >
                  <Plus className="h-4 w-4" /> Add Houseboat
                </Link>
              </div>
              <div className="grid gap-4">
                {["Blue Fern Houseboat", "Sungai Perak Explorer", "Rumah Air Belum"].map((name) => (
                  <div key={name} className="flex items-center justify-between rounded-xl border border-slate-200 p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Ship className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold text-navy-900">{name}</p>
                        <p className="text-xs text-slate-500">Temenggor Lake &bull; Active</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                      Published
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "performance" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-8">
              <h2 className="font-display text-xl font-bold text-navy-900 mb-6">Performance</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-display font-bold text-navy-900">4.92</p>
                  <p className="text-sm text-slate-500 mt-1">Average Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-display font-bold text-navy-900">98%</p>
                  <p className="text-sm text-slate-500 mt-1">Response Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-display font-bold text-navy-900">1h</p>
                  <p className="text-sm text-slate-500 mt-1">Avg. Response</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-display font-bold text-navy-900">{8 + acceptedCount}</p>
                  <p className="text-sm text-slate-500 mt-1">Total Bookings</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-8">
              <h2 className="font-display text-xl font-bold text-navy-900 mb-6">Account Settings</h2>
              <div className="max-w-md space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-navy-900">Display Name</label>
                  <input defaultValue="Capt. Faizal" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-navy-900" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-navy-900">Email</label>
                  <input defaultValue="the.temenggor@gmail.com" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-navy-900" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-navy-900">Phone / WhatsApp</label>
                  <input defaultValue="+6010 869 2982" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-navy-900" />
                </div>
                <button className="rounded-xl bg-navy-900 px-6 py-3 font-bold text-white transition hover:bg-blue-600">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  urgent,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: string;
  urgent?: boolean;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        <Icon className="h-5 w-5 text-slate-400" />
      </div>
      <div className="text-3xl font-display font-bold text-navy-900 mb-2">{value}</div>
      <div className={`text-xs font-bold ${urgent ? "text-rose-500" : "text-emerald-600"}`}>
        {trend}
      </div>
    </div>
  );
}
