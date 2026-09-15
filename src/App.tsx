/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { ExecutiveDashboard } from './components/dashboard/ExecutiveDashboard';
import { AIPhoneSimulator } from './components/phone/AIPhoneSimulator';
import { WhatsAppReceptionist } from './components/whatsapp/WhatsAppReceptionist';
import { MissedCallRecovery } from './components/missedcalls/MissedCallRecovery';
import { OmnichannelInbox } from './components/inbox/OmnichannelInbox';
import { CustomerCRM } from './components/crm/CustomerCRM';
import { AppointmentScheduler } from './components/calendar/AppointmentScheduler';
import { AutomationBuilder } from './components/automations/AutomationBuilder';
import { ReactivationCampaigns } from './components/campaigns/ReactivationCampaigns';
import { AIGrowthAdvisor } from './components/advisor/AIGrowthAdvisor';
import { KnowledgeBase } from './components/knowledge/KnowledgeBase';
import { ROICalculator } from './components/roi/ROICalculator';
import { SettingsView } from './components/settings/SettingsView';
import { BusinessSetupWizard } from './components/wizard/BusinessSetupWizard';
import { SaaSLandingPage } from './components/landing/SaaSLandingPage';

const MainLayout: React.FC = () => {
  const { activeTab, isCallSimulatorOpen, setIsCallSimulatorOpen } = useApp();

  // If in Public SaaS Landing Page view
  if (activeTab === 'landing_page') {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col font-sans">
        <Header />
        <main className="flex-1">
          <SaaSLandingPage />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      <Header />

      <div className="flex-1 flex min-h-0">
        <Sidebar />

        {/* Dynamic Main Workspace Tab Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && <ExecutiveDashboard />}
            {activeTab === 'phone_receptionist' && <AIPhoneSimulator />}
            {activeTab === 'whatsapp' && <WhatsAppReceptionist />}
            {activeTab === 'missed_calls' && <MissedCallRecovery />}
            {activeTab === 'inbox' && <OmnichannelInbox />}
            {activeTab === 'crm' && <CustomerCRM />}
            {activeTab === 'calendar' && <AppointmentScheduler />}
            {activeTab === 'automations' && <AutomationBuilder />}
            {activeTab === 'campaigns' && <ReactivationCampaigns />}
            {activeTab === 'advisor' && <AIGrowthAdvisor />}
            {activeTab === 'knowledge' && <KnowledgeBase />}
            {activeTab === 'roi_calculator' && <ROICalculator />}
            {activeTab === 'settings' && <SettingsView />}
            {activeTab === 'wizard' && <BusinessSetupWizard />}
          </div>
        </main>
      </div>

      {/* Global Floating AI Phone Receptionist Modal */}
      {isCallSimulatorOpen && activeTab !== 'phone_receptionist' && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="bg-slate-900 rounded-2xl max-w-4xl w-full h-[90vh] sm:h-[80vh] flex flex-col overflow-hidden border border-slate-700 shadow-2xl">
            <AIPhoneSimulator isModal={true} onClose={() => setIsCallSimulatorOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
