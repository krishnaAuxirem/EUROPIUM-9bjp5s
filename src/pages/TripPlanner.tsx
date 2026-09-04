import { useState, useCallback } from "react";
import { Plus, Trash2, Save, Calendar, MapPin, DollarSign, ChevronDown, ChevronUp, Sparkles, Clock, Hotel, UtensilsCrossed, Bus, Star, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import type { TripPlan, TripDay, TripItem } from "@/types";
import { travelDestinations } from "@/lib/mockData";

const TIME_SLOTS = ["Morning", "Afternoon", "Evening", "Night"] as const;
type TimeSlot = typeof TIME_SLOTS[number];

const ITEM_TYPES = [
  { value: "attraction", label: "Attraction", icon: "🏛️", color: "bg-royalblue-100 text-royalblue-700" },
  { value: "restaurant", label: "Restaurant", icon: "🍴", color: "bg-gold-100 text-gold-700" },
  { value: "hotel", label: "Hotel/Stay", icon: "🏨", color: "bg-navy-100 text-navy-700" },
  { value: "transport", label: "Transport", icon: "🚌", color: "bg-emerald-100 text-emerald-700" },
  { value: "activity", label: "Activity", icon: "🎯", color: "bg-purple-100 text-purple-700" },
] as const;

const destinations = travelDestinations.map(d => `${d.name}, ${d.country}`);
const extraDestinations = [
  "Paris, France", "London, UK", "Rome, Italy", "Vienna, Austria",
  "Lisbon, Portugal", "Berlin, Germany", "Stockholm, Sweden", "Zurich, Switzerland",
  "Copenhagen, Denmark", "Warsaw, Poland",
];
const allDestinations = [...new Set([...destinations, ...extraDestinations])].sort();

function generateDays(startDate: string, endDate: string): TripDay[] {
  if (!startDate || !endDate) return [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days: TripDay[] = [];
  let current = new Date(start);
  let dayNum = 1;
  while (current <= end && dayNum <= 30) {
    days.push({
      day: dayNum,
      date: current.toISOString().split("T")[0],
      items: [],
    });
    current.setDate(current.getDate() + 1);
    dayNum++;
  }
  return days;
}

export default function TripPlannerPage() {
  const { user, isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();
  const { success, info } = useToast();

  const [tripName, setTripName] = useState("My European Adventure");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState(2000);
  const [days, setDays] = useState<TripDay[]>([]);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [newItem, setNewItem] = useState<{ dayNum: number; time: TimeSlot; type: string; title: string; cost: string; notes: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSetDates = useCallback(() => {
    if (!startDate || !endDate) return;
    const generatedDays = generateDays(startDate, endDate);
    setDays(generatedDays);
    setExpandedDay(1);
  }, [startDate, endDate]);

  const addItem = (dayNum: number) => {
    setNewItem({ dayNum, time: "Morning", type: "attraction", title: "", cost: "", notes: "" });
  };

  const saveItem = () => {
    if (!newItem || !newItem.title.trim()) return;
    const item: TripItem = {
      id: Date.now().toString(),
      time: newItem.time as TimeSlot,
      type: newItem.type as TripItem["type"],
      title: newItem.title.trim(),
      cost: newItem.cost || undefined,
      notes: newItem.notes || undefined,
    };
    setDays(prev => prev.map(d =>
      d.day === newItem.dayNum
        ? { ...d, items: [...d.items, item] }
        : d
    ));
    setNewItem(null);
  };

  const removeItem = (dayNum: number, itemId: string) => {
    setDays(prev => prev.map(d =>
      d.day === dayNum
        ? { ...d, items: d.items.filter(i => i.id !== itemId) }
        : d
    ));
  };

  const moveItem = (dayNum: number, itemId: string, direction: "up" | "down") => {
    setDays(prev => prev.map(d => {
      if (d.day !== dayNum) return d;
      const idx = d.items.findIndex(i => i.id === itemId);
      if (idx < 0) return d;
      const newItems = [...d.items];
      const swap = direction === "up" ? idx - 1 : idx + 1;
      if (swap < 0 || swap >= newItems.length) return d;
      [newItems[idx], newItems[swap]] = [newItems[swap], newItems[idx]];
      return { ...d, items: newItems };
    }));
  };

  const totalCost = days.reduce((sum, day) =>
    sum + day.items.reduce((s, item) => s + (parseFloat(item.cost ?? "0") || 0), 0), 0
  );

  const handleSave = async () => {
    if (!isAuthenticated) { info("Please login to save trips"); navigate("/login"); return; }
    if (!destination || days.length === 0) { info("Please set destination and dates first"); return; }
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    const trip: TripPlan = {
      id: Date.now().toString(),
      name: tripName,
      destination: destination.split(",")[0],
      country: destination.split(",")[1]?.trim() ?? "",
      startDate,
      endDate,
      budget,
      currency: "EUR",
      days,
      totalCost,
      createdAt: new Date().toISOString(),
    };
    const savedTrips = [...(user?.savedTrips ?? []), trip];
    updateUser({ savedTrips });
    setSaving(false);
    setSaved(true);
    success("Trip saved successfully!");
  };

  const getTypeInfo = (type: string) => ITEM_TYPES.find(t => t.value === type) ?? ITEM_TYPES[0];
  const formatDate = (d: string) => d ? new Date(d).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }) : "";

  const addSuggestedItem = (dayNum: number, time: TimeSlot, title: string, type: string) => {
    const item: TripItem = {
      id: Date.now().toString() + Math.random(),
      time,
      type: type as TripItem["type"],
      title,
    };
    setDays(prev => prev.map(d =>
      d.day === dayNum ? { ...d, items: [...d.items, item] } : d
    ));
  };

  return (
    <div className="page-container">
      <section className="bg-navy-900 py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gold-500 flex items-center justify-center shrink-0">
              <Zap size={28} className="text-white" />
            </div>
            <div>
              <h1 className="font-serif text-4xl font-bold text-white mb-2">Trip Planner</h1>
              <p className="text-white/70 text-lg">Build your perfect European itinerary day by day.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Planner */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trip Setup */}
            <div className="card-premium p-6">
              <h2 className="font-serif text-xl font-bold text-navy-900 mb-5">Trip Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Trip Name</label>
                  <input
                    type="text"
                    value={tripName}
                    onChange={e => setTripName(e.target.value)}
                    className="input-premium"
                    placeholder="e.g. Summer in Europe 2026"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Destination</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      value={destination}
                      onChange={e => setDestination(e.target.value)}
                      className="input-premium pl-10"
                    >
                      <option value="">Select destination...</option>
                      {allDestinations.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date</label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        className="input-premium pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date</label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        className="input-premium pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Budget: <span className="text-navy-900 font-bold">€{budget.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min={200}
                    max={20000}
                    step={100}
                    value={budget}
                    onChange={e => setBudget(Number(e.target.value))}
                    className="w-full accent-navy-900"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>€200</span><span>€20,000</span>
                  </div>
                </div>

                <button
                  onClick={handleSetDates}
                  disabled={!startDate || !endDate || !destination}
                  className="btn-primary w-full justify-center disabled:opacity-40"
                >
                  <Calendar size={16} /> Generate Itinerary Skeleton
                </button>
              </div>
            </div>

            {/* Day Planner */}
            {days.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl font-bold text-navy-900">📅 Day-by-Day Itinerary</h2>
                  <span className="text-sm text-gray-500">{days.length} days · {destination}</span>
                </div>

                {days.map(day => (
                  <div key={day.day} className="card-premium overflow-hidden">
                    {/* Day Header */}
                    <button
                      onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                      className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-navy-900 text-gold-400 font-bold text-sm flex items-center justify-center shrink-0">
                          {day.day}
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-navy-900">Day {day.day}</p>
                          <p className="text-xs text-gray-500">{formatDate(day.date)} · {day.items.length} item{day.items.length !== 1 ? "s" : ""}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {day.items.length > 0 && (
                          <div className="flex gap-1">
                            {TIME_SLOTS.filter(ts => day.items.some(i => i.time === ts)).map(ts => (
                              <span key={ts} className="w-2 h-2 rounded-full bg-royalblue-400" title={ts} />
                            ))}
                          </div>
                        )}
                        {expandedDay === day.day ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                      </div>
                    </button>

                    {expandedDay === day.day && (
                      <div className="border-t border-border/50 p-5 space-y-4 animate-fade-in">
                        {/* Time slots */}
                        {TIME_SLOTS.map(slot => {
                          const slotItems = day.items.filter(i => i.time === slot);
                          const slotIcons: Record<string, string> = { Morning: "🌅", Afternoon: "☀️", Evening: "🌆", Night: "🌙" };
                          return (
                            <div key={slot}>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-base">{slotIcons[slot]}</span>
                                <span className="text-sm font-semibold text-gray-600">{slot}</span>
                                {slotItems.length === 0 && (
                                  <span className="text-xs text-gray-300 italic">Nothing planned</span>
                                )}
                              </div>
                              {slotItems.map((item, idx) => {
                                const typeInfo = getTypeInfo(item.type);
                                return (
                                  <div key={item.id} className="ml-6 mb-2 flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 group">
                                    <span className="text-base mt-0.5">{typeInfo.icon}</span>
                                    <div className="flex-1 min-w-0">
                                      <p className="font-medium text-navy-900 text-sm">{item.title}</p>
                                      {item.notes && <p className="text-xs text-gray-500 mt-0.5">{item.notes}</p>}
                                      <div className="flex items-center gap-2 mt-1">
                                        <span className={`tag text-xs ${typeInfo.color}`}>{typeInfo.label}</span>
                                        {item.cost && <span className="text-xs text-emerald-600 font-semibold">€{item.cost}</span>}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button onClick={() => moveItem(day.day, item.id, "up")} className="p-1 hover:bg-white rounded" title="Move up">
                                        <ChevronUp size={14} className="text-gray-400" />
                                      </button>
                                      <button onClick={() => moveItem(day.day, item.id, "down")} className="p-1 hover:bg-white rounded" title="Move down">
                                        <ChevronDown size={14} className="text-gray-400" />
                                      </button>
                                      <button onClick={() => removeItem(day.day, item.id)} className="p-1 hover:bg-red-50 rounded" title="Remove">
                                        <Trash2 size={14} className="text-red-400" />
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}

                        {/* Add item form */}
                        {newItem?.dayNum === day.day ? (
                          <div className="mt-4 p-4 bg-royalblue-50 border border-royalblue-200 rounded-xl animate-fade-in">
                            <p className="text-sm font-semibold text-navy-900 mb-3">Add to Day {day.day}</p>
                            <div className="space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                <select
                                  value={newItem.time}
                                  onChange={e => setNewItem(p => p ? { ...p, time: e.target.value as TimeSlot } : p)}
                                  className="input-premium text-sm"
                                >
                                  {TIME_SLOTS.map(t => <option key={t}>{t}</option>)}
                                </select>
                                <select
                                  value={newItem.type}
                                  onChange={e => setNewItem(p => p ? { ...p, type: e.target.value } : p)}
                                  className="input-premium text-sm"
                                >
                                  {ITEM_TYPES.map(t => <option key={t.value} value={t.value}>{t.icon} {t.label}</option>)}
                                </select>
                              </div>
                              <input
                                type="text"
                                placeholder="What are you doing? (e.g. Visit Eiffel Tower)"
                                value={newItem.title}
                                onChange={e => setNewItem(p => p ? { ...p, title: e.target.value } : p)}
                                className="input-premium"
                              />
                              <div className="grid grid-cols-2 gap-3">
                                <input
                                  type="number"
                                  placeholder="Estimated cost (€)"
                                  value={newItem.cost}
                                  onChange={e => setNewItem(p => p ? { ...p, cost: e.target.value } : p)}
                                  className="input-premium text-sm"
                                />
                                <input
                                  type="text"
                                  placeholder="Notes (optional)"
                                  value={newItem.notes}
                                  onChange={e => setNewItem(p => p ? { ...p, notes: e.target.value } : p)}
                                  className="input-premium text-sm"
                                />
                              </div>
                              <div className="flex gap-2">
                                <button onClick={saveItem} disabled={!newItem.title.trim()} className="btn-primary flex-1 justify-center text-sm py-2.5 disabled:opacity-40">
                                  <Plus size={15} /> Add
                                </button>
                                <button onClick={() => setNewItem(null)} className="btn-secondary px-4 text-sm">Cancel</button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => addItem(day.day)}
                            className="w-full mt-2 py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-royalblue-400 hover:text-royalblue-500 transition-all flex items-center justify-center gap-2"
                          >
                            <Plus size={15} /> Add activity, restaurant, or hotel
                          </button>
                        )}

                        {/* Quick suggestions */}
                        {day.items.length === 0 && (
                          <div>
                            <p className="text-xs text-gray-400 mb-2 font-medium">Quick add suggestions:</p>
                            <div className="flex flex-wrap gap-1.5">
                              {[
                                { title: "Check-in to hotel", time: "Morning" as TimeSlot, type: "hotel" },
                                { title: "Breakfast at local café", time: "Morning" as TimeSlot, type: "restaurant" },
                                { title: "City walking tour", time: "Afternoon" as TimeSlot, type: "activity" },
                                { title: "Visit main attraction", time: "Afternoon" as TimeSlot, type: "attraction" },
                                { title: "Dinner at restaurant", time: "Evening" as TimeSlot, type: "restaurant" },
                              ].map(s => (
                                <button
                                  key={s.title}
                                  onClick={() => addSuggestedItem(day.day, s.time, s.title, s.type)}
                                  className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-royalblue-400 hover:text-royalblue-600 transition-all"
                                >
                                  + {s.title}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Save button */}
                <button
                  onClick={handleSave}
                  disabled={saving || saved}
                  className="btn-gold w-full justify-center py-3.5 text-base"
                >
                  {saving ? (
                    <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving...</span>
                  ) : saved ? (
                    <><Save size={16} /> Trip Saved!</>
                  ) : (
                    <><Save size={16} /> Save Trip Plan</>
                  )}
                </button>
              </div>
            )}

            {days.length === 0 && (
              <div className="card-premium p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-4">
                  <Calendar size={36} className="text-gold-500" />
                </div>
                <h3 className="font-serif text-xl font-bold text-navy-900 mb-2">Set Your Destination & Dates</h3>
                <p className="text-gray-500 text-sm max-w-sm mx-auto">Fill in the trip details above and click "Generate Itinerary" to start planning your European adventure.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Budget Tracker */}
            <div className="card-premium p-5">
              <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-2">
                <DollarSign size={15} className="text-emerald-500" /> Budget Tracker
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Budget</span>
                  <span className="font-bold text-navy-900">€{budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Planned Costs</span>
                  <span className={`font-bold ${totalCost > budget ? "text-red-600" : "text-emerald-600"}`}>
                    €{totalCost.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${totalCost > budget ? "bg-red-500" : "bg-emerald-500"}`}
                    style={{ width: `${Math.min((totalCost / budget) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Remaining</span>
                  <span className={`font-bold ${budget - totalCost < 0 ? "text-red-600" : "text-emerald-600"}`}>
                    €{(budget - totalCost).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Trip Summary */}
            {days.length > 0 && (
              <div className="card-premium p-5">
                <h3 className="font-semibold text-navy-900 mb-4">📊 Trip Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Destination</span>
                    <span className="font-semibold text-navy-900 truncate ml-2">{destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-semibold text-navy-900">{days.length} day{days.length !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Activities</span>
                    <span className="font-semibold text-navy-900">{days.reduce((s, d) => s + d.items.length, 0)}</span>
                  </div>
                  {ITEM_TYPES.map(type => {
                    const count = days.reduce((s, d) => s + d.items.filter(i => i.type === type.value).length, 0);
                    if (count === 0) return null;
                    return (
                      <div key={type.value} className="flex justify-between">
                        <span className="text-gray-400">{type.icon} {type.label}s</span>
                        <span className="text-gray-600">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* AI Advisor */}
            <div className="bg-navy-900 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-gold-400" />
                <h3 className="font-semibold">AI Travel Advisor</h3>
              </div>
              <p className="text-white/70 text-xs mb-4">Get AI-powered suggestions for must-see attractions, local restaurants, and budget tips.</p>
              <Link to="/ai-advisor" className="btn-gold w-full justify-center py-2.5 text-sm">
                Ask AI Advisor
              </Link>
            </div>

            {/* Quick Links */}
            <div className="card-premium p-5">
              <h3 className="font-semibold text-navy-900 mb-3 text-sm">Explore More</h3>
              <div className="space-y-2">
                {[
                  { label: "Browse Destinations", path: "/travel" },
                  { label: "Find Hotels & Housing", path: "/housing" },
                  { label: "Cost Calculator", path: "/cost-calculator" },
                  { label: "AI Travel Advisor", path: "/ai-advisor" },
                ].map(l => (
                  <Link key={l.path} to={l.path} className="flex items-center justify-between py-2 text-sm text-gray-600 hover:text-navy-900 border-b border-gray-50 last:border-0 transition-colors">
                    {l.label} <span className="text-gray-300">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
