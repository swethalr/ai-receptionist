import React, { useState } from 'react';
import {
  GitFork,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Play,
  Pause,
  ArrowDown,
  Layers,
  Sparkles,
  MessageSquare,
  Phone,
  Calendar,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AutomationBuilder: React.FC = () => {
  const { automations, toggleAutomation } = useApp();
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>(automations[0]?.id || 'wf_1');

  const activeWorkflow = automations.find(w => w.id === selectedWorkflowId) || automations[0];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Automation Workflow Engine</h1>
          <p className="text-xs text-slate-500">
            No-code autonomous logic triggers, conditional branching, and multi-channel revenue actions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-xs">
            {automations.filter(w => w.active).length} of {automations.length} Flows Active
          </span>
        </div>
      </div>

      {/* Main Container: Left Workflow Selector & Right Visual Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Workflows List (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
            Pre-Built Revenue Flows
          </div>

          {automations.map(wf => {
            const isSelected = wf.id === activeWorkflow?.id;
            return (
              <div
                key={wf.id}
                onClick={() => setSelectedWorkflowId(wf.id)}
                className={`p-4 rounded-xl border transition cursor-pointer ${
                  isSelected
                    ? 'bg-white border-indigo-600 ring-2 ring-indigo-500/10 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        wf.active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'
                      }`}
                    />
                    <h4 className="font-bold text-xs text-slate-900">{wf.title}</h4>
                  </div>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleAutomation(wf.id);
                    }}
                    className={`w-8 h-4 rounded-full transition-colors relative cursor-pointer ${
                      wf.active ? 'bg-indigo-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
                        wf.active ? 'right-0.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>

                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{wf.description}</p>

                <div className="flex items-center justify-between text-[10px] mt-3 pt-2 border-t border-slate-100 text-slate-400">
                  <span>{wf.nodes.length} Executable Nodes</span>
                  <span className="font-semibold text-emerald-600 font-sans">
                    +${wf.metrics.recoveredRevenue.toLocaleString()} Generated
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Visual Node Builder Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900">{activeWorkflow?.title}</h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      activeWorkflow?.active
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {activeWorkflow?.active ? 'ACTIVE & MONITORING' : 'PAUSED'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{activeWorkflow?.description}</p>
              </div>

              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-slate-400">Executions</div>
                <div className="text-base font-extrabold text-slate-900 font-sans">
                  {activeWorkflow?.metrics.executedCount.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Visual Node Diagram Vertical Flow */}
            <div className="py-6 flex flex-col items-center max-w-md mx-auto space-y-3">
              {activeWorkflow?.nodes.map((node, idx) => {
                const isTrigger = node.type === 'trigger';
                const isCondition = node.type === 'condition';
                const isAction = node.type === 'action';
                const isDelay = node.type === 'delay';

                return (
                  <React.Fragment key={node.id}>
                    {/* Node Card */}
                    <div
                      className={`w-full p-4 rounded-xl border shadow-2xs transition-all ${
                        isTrigger
                          ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                          : isCondition
                          ? 'bg-violet-50/70 border-violet-200 text-violet-950'
                          : isAction
                          ? 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
                          : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            isTrigger
                              ? 'bg-amber-100 text-amber-800'
                              : isCondition
                              ? 'bg-violet-100 text-violet-800'
                              : isAction
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {node.type} Node
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">#0{idx + 1}</span>
                      </div>

                      <div className="font-bold text-xs mt-1.5">{node.title}</div>
                      <div className="text-[11px] opacity-75 mt-0.5 leading-relaxed">{node.subtitle}</div>
                    </div>

                    {/* Connecting Arrow */}
                    {idx < activeWorkflow.nodes.length - 1 && (
                      <div className="flex flex-col items-center text-slate-300">
                        <ArrowDown className="w-4 h-4 text-slate-400 animate-bounce" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Workflow Stats Footer */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-slate-600">
                Success Rate:{' '}
                <span className="font-bold text-slate-900">
                  {Math.round((activeWorkflow.metrics.conversionCount / activeWorkflow.metrics.executedCount) * 100)}%
                </span>
              </span>
            </div>
            <div className="font-bold text-emerald-600 font-sans">
              +${activeWorkflow.metrics.recoveredRevenue.toLocaleString()} Revenue Attributed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
