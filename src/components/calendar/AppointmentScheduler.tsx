import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  MapPin,
  CheckCircle2,
  XCircle,
  Plus,
  RefreshCw,
  Share2,
  Sparkles,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Appointment } from '../../types';

export const AppointmentScheduler: React.FC = () => {
  const {
    appointments,
    business,
    addAppointment,
    cancelAppointment,
    rescheduleAppointment,
    activeLocationId,
    setActiveLocationId
  } = useApp();

  const [selectedStaffId, setSelectedStaffId] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [showNewAptModal, setShowNewAptModal] = useState<boolean>(false);
  const [reschedulingAptId, setReschedulingAptId] = useState<string | null>(null);

  // New appointment form state
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(business.services[0]?.id || '');
  const [aptTime, setAptTime] = useState('11:00 AM');
  const [staffId, setStaffId] = useState(business.staff[0]?.id || '');

  const filteredAppointments = appointments.filter(a => {
    const matchesStaff = selectedStaffId === 'all' || a.staffId === selectedStaffId;
    const matchesLocation = a.locationId === activeLocationId;
    return matchesStaff && matchesLocation;
  });

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:30 PM',
    '02:00 PM',
    '03:15 PM',
    '04:30 PM',
    '05:30 PM'
  ];

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) return;

    const service = business.services.find(s => s.id === selectedServiceId) || business.services[0];
    const staff = business.staff.find(st => st.id === staffId) || business.staff[0];

    addAppointment({
      contactId: `c_${Date.now()}`,
      contactName: clientName.trim(),
      contactPhone: clientPhone.trim(),
      serviceId: service.id,
      serviceName: service.name,
      staffId: staff.id,
      staffName: staff.name,
      locationId: activeLocationId,
      locationName: business.locations.find(l => l.id === activeLocationId)?.name || 'Main Office',
      date: selectedDate,
      timeSlot: aptTime,
      durationMin: service.durationMin,
      price: service.price,
      status: 'confirmed',
      bookedBy: 'staff_manual',
      notes: 'Direct schedule entry via front desk calendar.',
      calendarSynced: true
    });

    setShowNewAptModal(false);
    setClientName('');
    setClientPhone('');
  };

  return (
    <div className="space-y-5">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Appointment Scheduling & Availability</h1>
          <p className="text-xs text-slate-500">
            Autonomous multi-staff scheduling with Google, Outlook & Apple Calendar two-way synchronization
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Location Selector */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-indigo-600" />
            <select
              value={activeLocationId}
              onChange={e => setActiveLocationId(e.target.value)}
              className="bg-transparent border-none text-xs font-semibold focus:outline-none cursor-pointer"
            >
              {business.locations.map(loc => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowNewAptModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>

      {/* Staff Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedStaffId('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
            selectedStaffId === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Providers ({business.staff.length})
        </button>

        {business.staff.map(st => (
          <button
            key={st.id}
            onClick={() => setSelectedStaffId(st.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedStaffId === st.id
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <User className="w-3.5 h-3.5 opacity-70" />
            <span>{st.name}</span>
            <span className="text-[10px] opacity-75">({st.role})</span>
          </button>
        ))}
      </div>

      {/* Appointments List / Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Schedule Agenda Cards (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-4 h-4 text-indigo-600" />
              <span className="font-bold text-xs text-slate-900">
                Scheduled Appointments ({filteredAppointments.length})
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Google Calendar Two-Way Sync Active</span>
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredAppointments.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400">
                <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-xs font-medium text-slate-600">No appointments scheduled for this filter.</p>
                <p className="text-[11px] mt-0.5">Appointments booked via Voice AI or WhatsApp appear here instantly.</p>
              </div>
            ) : (
              filteredAppointments.map(apt => (
                <div
                  key={apt.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex flex-col items-center justify-center text-indigo-700 flex-shrink-0">
                      <span className="text-[10px] font-bold uppercase">{apt.timeSlot.split(' ')[1]}</span>
                      <span className="text-xs font-extrabold">{apt.timeSlot.split(' ')[0]}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-xs text-slate-900">{apt.contactName}</h4>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                            apt.status === 'confirmed'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : apt.status === 'rescheduled'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          {apt.status.toUpperCase()}
                        </span>
                        {apt.bookedBy.startsWith('ai') && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5" /> Booked by AI
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-semibold text-slate-700 mt-1">
                        {apt.serviceName} • {apt.durationMin} mins • Dr. {apt.staffName}
                      </div>

                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {apt.contactPhone} • {apt.notes}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                    <div className="font-extrabold text-sm text-emerald-600 font-sans">
                      ${apt.price.toLocaleString()}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {apt.status !== 'cancelled' ? (
                        <>
                          <button
                            onClick={() => {
                              rescheduleAppointment(apt.id, '2026-03-20', '03:15 PM');
                            }}
                            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-semibold transition"
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={() => cancelAppointment(apt.id)}
                            className="px-2 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-semibold transition"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <span className="text-[10px] text-rose-600 font-medium">Slot released</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Booking Rules & Multi-Calendar Sync Status (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <h3 className="font-bold text-xs text-slate-900 mb-2">Automated Booking Rules</h3>
            <div className="space-y-2 text-[11px] text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Sanitization Buffer:</span>
                <span className="font-semibold text-slate-800">15 mins between patients</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Advance Notice Limit:</span>
                <span className="font-semibold text-slate-800">Min 2 hours ahead</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Max Advance Window:</span>
                <span className="font-semibold text-slate-800">60 Days</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Deposit Policy:</span>
                <span className="font-semibold text-slate-800">$100 for high-value consults</span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-950 text-white rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-indigo-300 text-xs font-bold mb-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Smart No-Show Prevention</span>
              </span>
              <span className="text-emerald-400">92% Attended</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              AI automatically sends SMS 24 hours and 2 hours prior with 1-click confirmation links and directions.
            </p>
          </div>
        </div>
      </div>

      {/* New Appointment Modal */}
      {showNewAptModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-base text-slate-900 mb-1">Book New Appointment</h3>
            <p className="text-xs text-slate-500 mb-4">Locks operatory schedule and dispatches SMS confirmation.</p>

            <form onSubmit={handleCreateAppointment} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Patient / Client Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. William Vance"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={clientPhone}
                  onChange={e => setClientPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Service</label>
                <select
                  value={selectedServiceId}
                  onChange={e => setSelectedServiceId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                >
                  {business.services.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} (${s.price})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Time Slot</label>
                  <select
                    value={aptTime}
                    onChange={e => setAptTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                  >
                    {timeSlots.map(t => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Provider</label>
                  <select
                    value={staffId}
                    onChange={e => setStaffId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                  >
                    {business.staff.map(st => (
                      <option key={st.id} value={st.id}>
                        {st.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewAptModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Confirm & Sync Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
