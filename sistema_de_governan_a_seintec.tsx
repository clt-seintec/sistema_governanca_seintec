import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  CheckSquare, 
  FileText, 
  AlertTriangle, 
  Users, 
  BarChart3, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  School, 
  RefreshCw, 
  Sliders, 
  ArrowRight, 
  BookOpen, 
  Briefcase,
  Kanban,
  Table,
  Check,
  Building2,
  Info
} from 'lucide-react';

export default function App() {
  // Estado de navegação principal
  const [activeTab, setActiveTab] = useState('overview');

  // Notificações in-app (substituindo alert)
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showNotification = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  // ==========================================
  // ESTADOS DOS MÓDULOS (DADOS INICIAIS Ricos)
  // ==========================================

  // 1. Plano Anual (A2)
  const [planoAnual, setPlanoAnual] = useState([
    { id: 1, eixo: 'Conectividade', diagnostico: '8 escolas com Wi-Fi recorrente no Bloco B', prioridade: 'P2', acao: 'Diagnóstico dirigido de infraestrutura Wi-Fi e escalonamento COINTEC', responsavel: 'SETEC', prazo: '30/04/2026', evidencia: 'Relatório por escola', status: 'Em andamento' },
    { id: 2, eixo: 'Equipamentos e inventário', diagnostico: 'Escolas com notebooks desatualizados no inventário patrimonial', prioridade: 'P3', acao: 'Mutirão de inventário e recolhimento de cautelas', responsavel: 'SEINTEC', prazo: '15/05/2026', evidencia: 'Inventário atualizado', status: 'Previsto' },
    { id: 3, eixo: 'Acompanhamento das escolas e EscolaTEC', diagnostico: '5 escolas em monitoramento crítico no programa EscolaTEC', prioridade: 'P1', acao: 'Visita técnica prioritária e orientação à equipe gestora', responsavel: 'SEINTEC / SETEC', prazo: '30/03/2026', evidencia: 'Ata de visita assinada', status: 'Concluído' },
    { id: 4, eixo: 'Formação e orientações técnicas', diagnostico: 'Novos secretários escolares com dúvidas em chamados CRM', prioridade: 'P3', acao: 'Realizar Orientação Técnica (OT) sobre abertura e gestão de chamados', responsavel: 'SETEC', prazo: '20/06/2026', evidencia: 'Lista de presença e material', status: 'Previsto' }
  ]);

  // Novo item Plano Anual modal state
  const [novoPlano, setNovoPlano] = useState({ eixo: 'Conectividade', diagnostico: '', prioridade: 'P2', acao: '', responsavel: 'SEINTEC', prazo: '', evidencia: '', status: 'Previsto' });

  // 2. Priorização A5 (Com os 5 critérios: Impacto, Abrangência, Urgência, Recorrência, Dependência)
  const [priorizacoes, setPriorizacoes] = useState([
    { id: 1, escola: 'EE Prof. Carlos Alberto', situacao: 'Queda total de rede durante aplicação de simulado estadual', impacto: 3, abrangencia: 3, urgencia: 3, recorrencia: 2, dependencia: 3, pontuacao: 14, classeSugerida: 'P1 - Crítica', classeDefinida: 'P1 - Crítica', justificativa: 'Prejuízo direto a avaliação oficial e alta dependência da operadora.', status: 'Aberta' },
    { id: 2, escola: 'EE Barão do Rio Branco', situacao: 'Falta de cabos de rede na sala de informática nova', impacto: 2, abrangencia: 2, urgencia: 2, recorrencia: 1, dependencia: 2, pontuacao: 9, classeSugerida: 'P2 - Alta', classeDefinida: 'P2 - Alta', justificativa: 'Impacta aulas práticas de tecnologia agendadas.', status: 'Em tratamento' }
  ]);

  const [novaPrioridade, setNovaPrioridade] = useState({
    escola: '',
    situacao: '',
    impacto: 2,
    abrangencia: 2,
    urgencia: 2,
    recorrencia: 1,
    dependencia: 1,
    classeDefinida: 'P2 - Alta',
    justificativa: ''
  });

  // 3. Plano de Trabalho (A3)
  const [tarefas, setTarefas] = useState([
    { id: 1, num: 'T01', frente: 'Infraestrutura', origem: 'Plano Anual (A2)', prioridade: 'P2', responsavel: 'SETEC', dependencia: 'Sim (Operadora)', inicio: '01/03/2026', prazo: '30/04/2026', status: 'Em andamento', causa: '', novaData: '' },
    { id: 2, num: 'T02', frente: 'Escolas', origem: 'Priorização (A5)', prioridade: 'P1', responsavel: 'SEINTEC', dependencia: 'Não', inicio: '10/03/2026', prazo: '15/03/2026', status: 'Concluído', causa: '', novaData: '' },
    { id: 3, num: 'T03', frente: 'Governança', origem: 'Demandas COEGD', prioridade: 'P3', responsavel: 'SEINTEC', dependencia: 'Não', inicio: '15/03/2026', prazo: '10/04/2026', status: 'Impedido', causa: 'Aguardando liberação de acesso ao sistema central', novaData: '25/04/2026' }
  ]);

  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' ou 'tabela'

  // 4. Agenda e Visitas (A4)
  const [visitas, setVisitas] = useState([
    { id: 1, data: '2026-03-18', escola: 'EE Dom Pedro II', tipo: 'Prioritária', motivo: 'Verificar conectividade instável após troca de switch', confirmada: true, realizada: true, registroOficial: true },
    { id: 2, data: '2026-03-20', escola: 'EE Profª Maria Alice', tipo: 'EscolaTEC', motivo: 'Acompanhamento pedagógico de laboratório', confirmada: true, realizada: false, registroOficial: false },
    { id: 3, data: '2026-03-25', escola: 'EE Vila Industrial', tipo: 'Programada', motivo: 'Rodízio semestral de suporte técnico preventivo', confirmada: false, realizada: false, registroOficial: false }
  ]);

  // 5. Reuniões e Decisões
  const [reunioes, setReunioes] = useState([
    { id: 1, tipo: 'Alinhamento Semanal', data: '2026-03-16', participantes: 'SEINTEC e SETEC', duracao: '30 min', saida: 'Revisadas 3 situações P1 e redistribuídas tarefas de rede.', status: 'Registrada' },
    { id: 2, tipo: 'Devolutiva à Direção da URE', data: '2026-03-10', participantes: 'SEINTEC e Direção URE Campinas Leste', duracao: '30 min', saida: 'Aprovado remanejamento de nobreaks para escolas prioritárias.', status: 'Registrada' }
  ]);

  // ==========================================
  // FUNÇÕES DE CÁLCULO E AUTOMATIZAÇÃO
  // ==========================================

  // Cálculo A5 com 5 critérios
  const calcularPrioridadeA5 = (imp, abr, urg, rec, dep) => {
    const soma = Number(imp) + Number(abr) + Number(urg) + Number(rec) + Number(dep);
    let sugerida = '';
    if (imp === 3 || soma >= 13) {
      sugerida = 'P1 - Crítica';
    } else if (soma >= 10 && soma <= 12) {
      sugerida = 'P2 - Alta';
    } else if (soma >= 7 && soma <= 9) {
      sugerida = 'P3 - Programada';
    } else {
      sugerida = 'P4 - Melhoria';
    }
    return { soma, sugerida };
  };

  // Converter Prioridade em Tarefa A3
  const converterParaTarefa = (item) => {
    const novaT = {
      id: tarefas.length + 1,
      num: `T0${tarefas.length + 1}`,
      frente: 'Infraestrutura',
      origem: 'Priorização (A5)',
      prioridade: item.classeDefinida.substring(0, 2),
      responsavel: 'SEINTEC / SETEC',
      dependencia: item.dependencia >= 2 ? 'Sim' : 'Não',
      inicio: new Date().toISOString().split('T')[0].split('-').reverse().join('/'),
      prazo: '30 dias',
      status: 'Previsto',
      causa: '',
      novaData: ''
    };
    setTarefas([...tarefas, novaT]);
    showNotification(`Situação da escola "${item.escola}" convertida com sucesso em Tarefa (A3)!`);
  };

  // Adicionar Nova Ação Plano Anual
  const handleAddPlanoAnual = (e) => {
    e.preventDefault();
    if (!novoPlano.acao || !novoPlano.diagnostico) {
      showNotification('Preencha os campos obrigatórios da ação.', 'error');
      return;
    }
    setPlanoAnual([...planoAnual, { id: planoAnual.length + 1, ...novoPlano }]);
    setNovoPlano({ eixo: 'Conectividade', diagnostico: '', prioridade: 'P2', acao: '', responsavel: 'SEINTEC', prazo: '', evidencia: '', status: 'Previsto' });
    showNotification('Ação adicionada ao Plano Anual (A2) com sucesso!');
  };

  // Adicionar Nova Prioridade
  const handleAddPrioridade = (e) => {
    e.preventDefault();
    if (!novaPrioridade.escola || !novaPrioridade.situacao) {
      showNotification('Preencha escola e descrição da situação.', 'error');
      return;
    }
    const { soma, sugerida } = calcularPrioridadeA5(
      novaPrioridade.impacto, 
      novaPrioridade.abrangencia, 
      novaPrioridade.urgencia, 
      novaPrioridade.recorrencia, 
      novaPrioridade.dependencia
    );

    const item = {
      id: priorizacoes.length + 1,
      ...novaPrioridade,
      pontuacao: soma,
      classeSugerida: sugerida,
      status: 'Aberta'
    };

    setPriorizacoes([...priorizacoes, item]);
    setNovaPrioridade({
      escola: '',
      situacao: '',
      impacto: 2,
      abrangencia: 2,
      urgencia: 2,
      recorrencia: 1,
      dependencia: 1,
      classeDefinida: sugerida,
      justificativa: ''
    });
    showNotification('Situação priorizada com sucesso!');
  };

  // Métricas do Painel Executivo
  const totalAcoesPlano = planoAnual.length;
  const acoesConcluidasPlano = planoAnual.filter(a => a.status === 'Concluído').length;
  const pctExecucaoPlano = totalAcoesPlano > 0 ? Math.round((acoesConcluidasPlano / totalAcoesPlano) * 100) : 0;

  const totalTarefas = tarefas.length;
  const tarefasConcluidas = tarefas.filter(t => t.status === 'Concluído').length;
  const tarefasAtrasadas = tarefas.filter(t => t.status === 'Impedido' || (t.status !== 'Concluído' && new Date(t.prazo.split('/').reverse().join('-')) < new Date())).length;
  
  const p1Abertas = priorizacoes.filter(p => p.classeDefinida.includes('P1') && p.status === 'Aberta').length;

  const totalVisitas = visitas.length;
  const visitasRealizadas = visitas.filter(v => v.realizada).length;
  const pctVisitas = totalVisitas > 0 ? Math.round((visitasRealizadas / totalVisitas) * 100) : 0;
  const visitasSemRegistro = visitas.filter(v => v.realizada && !v.registroOficial).length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-5 right-5 z-50 animate-bounce bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center space-x-3 border border-slate-700">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* HEADER GOVERNAMENTAL SEINTEC / SETEC */}
      <header className="bg-slate-900 text-white shadow-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-3 md:mb-0">
            <div className="p-2.5 bg-blue-600 rounded-xl shadow-inner">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500/20 text-blue-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-500/30">
                  SEDUCE / COEGD
                </span>
                <span className="text-xs text-slate-400">Piloto URE Campinas Leste</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight">Sistema de Governança SEINTEC / SETEC</h1>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-sm text-slate-300 bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Guia Prático A7 Integrado &bull; <strong>Ambiente Web Oficial</strong></span>
          </div>
        </div>

        {/* NAVEGAÇÃO POR ABAS */}
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <nav className="flex space-x-1 border-t border-slate-800 pt-2 pb-1">
            {[
              { id: 'overview', label: 'Início / Visão Geral', icon: LayoutDashboard },
              { id: 'plano_anual', label: 'Plano Anual (A2)', icon: Calendar },
              { id: 'priorizacao', label: 'Priorização A5', icon: Sliders },
              { id: 'plano_trabalho', label: 'Plano de Trabalho (A3)', icon: CheckSquare },
              { id: 'agenda', label: 'Agenda & Visitas (A4)', icon: Briefcase },
              { id: 'reunioes', label: 'Reuniões e Decisões', icon: Users },
              { id: 'painel', label: 'Painel Executivo', icon: BarChart3 }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-t-lg text-sm font-medium transition-all whitespace-nowrap
                    ${isActive 
                      ? 'bg-slate-50 text-blue-700 border-t-2 border-blue-600 shadow-sm' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">

        {/* ========================================================= */}
        {/* TAB 1: INÍCIO / VISÃO GERAL                                */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 max-w-3xl">
                <span className="bg-blue-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Caderno 6 – Manual de Gestão | Frente A
                </span>
                <h2 className="text-3xl font-extrabold mt-3 mb-3 tracking-tight">Planejamento e Governança da Tecnologia nas UREs</h2>
                <p className="text-slate-200 text-sm md:text-base leading-relaxed mb-6">
                  Esta plataforma web centraliza o método de governança do SEINTEC e SETEC, substituindo a planilha tradicional por um sistema colaborativo e em tempo real. Garanta o alinhamento estratégico, priorização transparente de escolas e prestação de contas à Direção da URE.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => setActiveTab('priorizacao')}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition shadow-lg flex items-center space-x-2"
                  >
                    <span>Acessar Priorização A5</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('painel')}
                    className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition border border-slate-600 flex items-center space-x-2"
                  >
                    <span>Ver Painel Executivo</span>
                    <BarChart3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* O Ciclo de Governança */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { step: '1', title: 'Diagnosticar', desc: 'Identificar a situação real das escolas usando dados de CRM, inventário e histórico.', icon: School, color: 'border-blue-500 text-blue-600' },
                { step: '2', title: 'Priorizar (A5)', desc: 'Aplicar os 5 critérios (Impacto, Abrangência, Urgência, Recorrência e Dependência).', icon: Sliders, color: 'border-amber-500 text-amber-600' },
                { step: '3', title: 'Planejar (A2)', desc: 'Definir de 5 a 10 ações estratégicas anuais com responsáveis, prazos e evidências.', icon: Calendar, color: 'border-emerald-500 text-emerald-600' },
                { step: '4', title: 'Executar (A3)', desc: 'Manter o Plano de Trabalho da equipe atualizado semanalmente via Kanban.', icon: CheckSquare, color: 'border-purple-500 text-purple-600' },
                { step: '5', title: 'Acompanhar', desc: 'Monitorar o Painel Executivo e o semáforo de referência na reunião mensal.', icon: BarChart3, color: 'border-indigo-500 text-indigo-600' },
                { step: '6', title: 'Replanejar', desc: 'Revisão semestral e balanço de entregas junto à Direção da URE.', icon: RefreshCw, color: 'border-teal-500 text-teal-600' }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className={`bg-white p-5 rounded-xl shadow-sm border-t-4 ${item.color} border-slate-200 flex flex-col justify-between`}>
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Etapa {item.step}</span>
                        <Icon className="w-5 h-5 opacity-70" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: PLANO ANUAL (A2)                                    */}
        {/* ========================================================= */}
        {activeTab === 'plano_anual' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Plano Anual de Tecnologia (A2)</h2>
                <p className="text-sm text-slate-500">Definição das ações estratégicas anuais da URE (Limite recomendado: 5 a 10 ações).</p>
              </div>
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold border border-blue-200">
                Execução Geral: {pctExecucaoPlano}% ({acoesConcluidasPlano}/{totalAcoesPlano} Ações)
              </div>
            </div>

            {/* Formulário Adicionar Ação */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-md font-bold text-slate-800 mb-4 flex items-center">
                <Plus className="w-4 h-4 mr-2 text-blue-600" />
                Cadastrar Nova Ação no Plano Anual
              </h3>
              <form onSubmit={handleAddPlanoAnual} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Eixo</label>
                  <select 
                    value={novoPlano.eixo}
                    onChange={(e) => setNovoPlano({...novoPlano, eixo: e.target.value})}
                    className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option>Equipamentos e inventário</option>
                    <option>Conectividade</option>
                    <option>Sistemas e atendimento</option>
                    <option>EscolaTEC</option>
                    <option>Formação</option>
                    <option>Protagonismo estudantil</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Diagnóstico (Situação atual)</label>
                  <input 
                    type="text" 
                    placeholder="Ex: 8 escolas com Wi-Fi instável..."
                    value={novoPlano.diagnostico}
                    onChange={(e) => setNovoPlano({...novoPlano, diagnostico: e.target.value})}
                    className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Prioridade</label>
                  <select 
                    value={novoPlano.prioridade}
                    onChange={(e) => setNovoPlano({...novoPlano, prioridade: e.target.value})}
                    className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option>P1</option>
                    <option>P2</option>
                    <option>P3</option>
                    <option>P4</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Ação Proposta</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Diagnóstico dirigido e escalonamento..."
                    value={novoPlano.acao}
                    onChange={(e) => setNovoPlano({...novoPlano, acao: e.target.value})}
                    className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Responsável</label>
                  <input 
                    type="text" 
                    placeholder="SETEC / SEINTEC"
                    value={novoPlano.responsavel}
                    onChange={(e) => setNovoPlano({...novoPlano, responsavel: e.target.value})}
                    className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Prazo (dd/mm/aaaa)</label>
                  <input 
                    type="text" 
                    placeholder="30/05/2026"
                    value={novoPlano.prazo}
                    onChange={(e) => setNovoPlano({...novoPlano, prazo: e.target.value})}
                    className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Evidência de Conclusão</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Relatório por escola assinado"
                    value={novoPlano.evidencia}
                    onChange={(e) => setNovoPlano({...novoPlano, evidencia: e.target.value})}
                    className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 px-4 rounded-lg transition shadow-sm"
                  >
                    Adicionar Ação
                  </button>
                </div>
              </form>
            </div>

            {/* Tabela do Plano Anual */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                      <th className="p-4">Eixo</th>
                      <th className="p-4">Diagnóstico / Ação</th>
                      <th className="p-4">Prioridade</th>
                      <th className="p-4">Responsável</th>
                      <th className="p-4">Prazo</th>
                      <th className="p-4">Evidência</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-sm">
                    {planoAnual.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition">
                        <td className="p-4 font-semibold text-slate-800">{item.eixo}</td>
                        <td className="p-4">
                          <div className="font-medium text-slate-900">{item.acao}</div>
                          <div className="text-xs text-slate-500 mt-0.5">Diag: {item.diagnostico}</div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            item.prioridade === 'P1' ? 'bg-red-100 text-red-800' :
                            item.prioridade === 'P2' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {item.prioridade}
                          </span>
                        </td>
                        <td className="p-4 text-slate-700">{item.responsavel}</td>
                        <td className="p-4 text-slate-700">{item.prazo}</td>
                        <td className="p-4 text-slate-600 text-xs">{item.evidencia}</td>
                        <td className="p-4">
                          <select 
                            value={item.status}
                            onChange={(e) => {
                              const updated = planoAnual.map(a => a.id === item.id ? {...a, status: e.target.value} : a);
                              setPlanoAnual(updated);
                            }}
                            className={`text-xs font-semibold rounded-lg px-2 py-1.5 border ${
                              item.status === 'Concluído' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                              item.status === 'Em andamento' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-100 text-slate-700 border-slate-300'
                            }`}
                          >
                            <option>Previsto</option>
                            <option>Em andamento</option>
                            <option>Concluído</option>
                            <option>Impedido</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PRIORIZAÇÃO DE ESCOLAS E SITUAÇÕES (A5)            */}
        {/* ========================================================= */}
        {activeTab === 'priorizacao' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800">Motor Automático de Priorização (A5) - 5 Critérios</h2>
              <p className="text-sm text-slate-500 mt-1">
                Atribua notas de 1 a 3 para cada critério. O sistema calcula a pontuação e sugere a classe (P1 a P4). O SEINTEC valida a classe final.
              </p>
            </div>

            {/* Formulário de Nova Priorização */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-md font-bold text-slate-800 mb-4 flex items-center">
                <Sliders className="w-4 h-4 mr-2 text-blue-600" />
                Avaliar Nova Situação / Escola
              </h3>
              <form onSubmit={handleAddPrioridade} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Escola / Unidade</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: EE Profª Eunice Weaver"
                      value={novaPrioridade.escola}
                      onChange={(e) => setNovaPrioridade({...novaPrioridade, escola: e.target.value})}
                      className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Descrição da Situação</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Sem internet durante aplicação de prova..."
                      value={novaPrioridade.situacao}
                      onChange={(e) => setNovaPrioridade({...novaPrioridade, situacao: e.target.value})}
                      className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* 5 Critérios (1 a 3) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
                  {[
                    { key: 'impacto', label: '1. Impacto', desc: 'Interrompe aulas ou rotinas?' },
                    { key: 'abrangencia', label: '2. Abrangência', desc: 'Quantos afetados?' },
                    { key: 'urgencia', label: '3. Urgência', desc: 'Prazo institucional próximo?' },
                    { key: 'recorrencia', label: '4. Recorrência', desc: 'O problema já se repetiu?' },
                    { key: 'dependencia', label: '5. Dependência', desc: 'Depende COEGD/Operadora?' },
                  ].map((crit) => (
                    <div key={crit.key} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <label className="block text-xs font-bold text-slate-700">{crit.label}</label>
                      <span className="text-[10px] text-slate-500 block mb-2">{crit.desc}</span>
                      <select 
                        value={novaPrioridade[crit.key]}
                        onChange={(e) => setNovaPrioridade({...novaPrioridade, [crit.key]: Number(e.target.value)})}
                        className="w-full text-sm border border-slate-300 rounded-lg p-2 bg-white font-bold text-center"
                      >
                        <option value={1}>1 - Baixo</option>
                        <option value={2}>2 - Médio</option>
                        <option value={3}>3 - Alto</option>
                      </select>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Classe Final Definida pelo SEINTEC</label>
                    <select 
                      value={novaPrioridade.classeDefinida}
                      onChange={(e) => setNovaPrioridade({...novaPrioridade, classeDefinida: e.target.value})}
                      className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-white font-bold"
                    >
                      <option>P1 - Crítica</option>
                      <option>P2 - Alta</option>
                      <option>P3 - Programada</option>
                      <option>P4 - Melhoria</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Justificativa da Decisão</label>
                    <input 
                      type="text" 
                      placeholder="Motivo da classe escolhida..."
                      value={novaPrioridade.justificativa}
                      onChange={(e) => setNovaPrioridade({...novaPrioridade, justificativa: e.target.value})}
                      className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 px-6 rounded-xl transition shadow-sm flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Registrar e Calcular Prioridade</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Listagem de Situações Priorizadas */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-100 border-b border-slate-200 font-bold text-slate-700 text-sm">
                Matriz de Situações Priorizadas (A5)
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-slate-600 text-xs font-bold uppercase tracking-wider border-b border-slate-200 bg-slate-50">
                      <th className="p-4">Escola / Situação</th>
                      <th className="p-4 text-center">Notas (Imp, Abr, Urg, Rec, Dep)</th>
                      <th className="p-4 text-center">Pontuação</th>
                      <th className="p-4">Classe Sugerida</th>
                      <th className="p-4">Classe Definida</th>
                      <th className="p-4">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-sm">
                    {priorizacoes.map((item) => {
                      const calc = calcularPrioridadeA5(item.impacto, item.abrangencia, item.urgencia, item.recorrencia, item.dependencia);
                      return (
                        <tr key={item.id} className="hover:bg-slate-50 transition">
                          <td className="p-4">
                            <div className="font-bold text-slate-800">{item.escola}</div>
                            <div className="text-xs text-slate-500">{item.situacao}</div>
                            {item.justificativa && <div className="text-xs text-blue-600 mt-1 italic">Obs: {item.justificativa}</div>}
                          </td>
                          <td className="p-4 text-center font-mono text-xs text-slate-600">
                            {item.impacto}, {item.abrangencia}, {item.urgencia}, {item.recorrencia}, {item.dependencia}
                          </td>
                          <td className="p-4 text-center font-bold text-slate-800">{item.pontuacao || calc.soma}</td>
                          <td className="p-4 text-xs font-semibold text-slate-600">{calc.sugerida}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                              item.classeDefinida.includes('P1') ? 'bg-red-100 text-red-800' :
                              item.classeDefinida.includes('P2') ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {item.classeDefinida}
                            </span>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => converterParaTarefa(item)}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition shadow-sm flex items-center space-x-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Converter em Tarefa A3</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: PLANO DE TRABALHO DA EQUIPE (A3)                    */}
        {/* ========================================================= */}
        {activeTab === 'plano_trabalho' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Plano de Trabalho da Equipe (A3)</h2>
                <p className="text-sm text-slate-500">Distribuição de tarefas entre SEINTEC e SETEC, com alertas automáticos de atraso.</p>
              </div>
              <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setViewMode('kanban')}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${viewMode === 'kanban' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <Kanban className="w-3.5 h-3.5" />
                  <span>Kanban</span>
                </button>
                <button
                  onClick={() => setViewMode('tabela')}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${viewMode === 'tabela' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <Table className="w-3.5 h-3.5" />
                  <span>Tabela</span>
                </button>
              </div>
            </div>

            {/* Visualização KANBAN */}
            {viewMode === 'kanban' ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['Previsto', 'Em andamento', 'Impedido', 'Concluído'].map((statusCol) => {
                  const tasksInCol = tarefas.filter(t => t.status === statusCol);
                  return (
                    <div key={statusCol} className="bg-slate-100/80 rounded-2xl p-4 border border-slate-200 flex flex-col">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">{statusCol}</h3>
                        <span className="bg-slate-200 text-slate-800 text-xs font-bold px-2 py-0.5 rounded-full">{tasksInCol.length}</span>
                      </div>
                      <div className="space-y-3 flex-1">
                        {tasksInCol.map((task) => (
                          <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 relative group">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{task.num}</span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                task.prioridade === 'P1' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'
                              }`}>{task.prioridade}</span>
                            </div>
                            <p className="text-sm font-medium text-slate-800 mb-2">{task.frente} - Resp: {task.responsavel}</p>
                            <div className="text-xs text-slate-500 mb-3">Prazo: {task.prazo}</div>
                            {task.causa && <div className="text-xs text-red-600 bg-red-50 p-2 rounded mb-2">Causa: {task.causa}</div>}
                            <div className="flex justify-end">
                              <select 
                                value={task.status}
                                onChange={(e) => {
                                  const updated = tarefas.map(t => t.id === task.id ? {...t, status: e.target.value} : t);
                                  setTarefas(updated);
                                }}
                                className="text-xs border border-slate-300 rounded p-1 bg-slate-50 font-semibold"
                              >
                                <option>Previsto</option>
                                <option>Em andamento</option>
                                <option>Impedido</option>
                                <option>Concluído</option>
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Visualização TABELA */
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                        <th className="p-4">Nº</th>
                        <th className="p-4">Frente / Origem</th>
                        <th className="p-4">Responsável</th>
                        <th className="p-4">Prazo</th>
                        <th className="p-4">Dependência</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Ações / Alerta</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-sm">
                      {tarefas.map((task) => (
                        <tr key={task.id} className="hover:bg-slate-50 transition">
                          <td className="p-4 font-bold text-slate-800">{task.num}</td>
                          <td className="p-4">
                            <div className="font-semibold text-slate-800">{task.frente}</div>
                            <div className="text-xs text-slate-500">{task.origem}</div>
                          </td>
                          <td className="p-4 text-slate-700">{task.responsavel}</td>
                          <td className="p-4 text-slate-700">{task.prazo}</td>
                          <td className="p-4 text-xs text-slate-600">{task.dependencia}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              task.status === 'Concluído' ? 'bg-emerald-100 text-emerald-800' :
                              task.status === 'Impedido' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {task.status}
                            </span>
                          </td>
                          <td className="p-4">
                            {task.status === 'Impedido' ? (
                              <span className="text-xs text-red-600 font-bold flex items-center">
                                <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                                Atrasado / Impedido
                              </span>
                            ) : (
                              <span className="text-xs text-emerald-600 font-semibold">No prazo</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: AGENDA E VISITAS (A4)                               */}
        {/* ========================================================= */}
        {activeTab === 'agenda' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Agenda e Controle de Visitas (A4)</h2>
                <p className="text-sm text-slate-500">Programação de visitas técnicas, rotas e rastreabilidade com formulário oficial.</p>
              </div>
              <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-semibold border border-emerald-200">
                Taxa de Visitas Realizadas: {pctVisitas}%
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-100 border-b border-slate-200 font-bold text-slate-700 text-sm">
                Cronograma de Visitas por Rota
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-slate-600 text-xs font-bold uppercase tracking-wider border-b border-slate-200 bg-slate-50">
                      <th className="p-4">Data</th>
                      <th className="p-4">Escola</th>
                      <th className="p-4">Tipo</th>
                      <th className="p-4">Motivo</th>
                      <th className="p-4 text-center">Confirmada</th>
                      <th className="p-4 text-center">Realizada</th>
                      <th className="p-4 text-center">Registro Oficial</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-sm">
                    {visitas.map((v) => (
                      <tr key={v.id} className="hover:bg-slate-50 transition">
                        <td className="p-4 font-semibold text-slate-800">{v.data}</td>
                        <td className="p-4 font-medium text-slate-900">{v.escola}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            v.tipo === 'Prioritária' ? 'bg-red-100 text-red-800' :
                            v.tipo === 'EscolaTEC' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {v.tipo}
                          </span>
                        </td>
                        <td className="p-4 text-slate-600 text-xs">{v.motivo}</td>
                        <td className="p-4 text-center">
                          <input type="checkbox" checked={v.confirmada} onChange={() => {}} className="rounded text-blue-600 w-4 h-4" />
                        </td>
                        <td className="p-4 text-center">
                          <input type="checkbox" checked={v.realizada} onChange={() => {}} className="rounded text-blue-600 w-4 h-4" />
                        </td>
                        <td className="p-4 text-center">
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${v.registroOficial ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                            {v.registroOficial ? 'Sim' : 'Pendente'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: REUNIÕES E DECISÕES                                 */}
        {/* ========================================================= */}
        {activeTab === 'reunioes' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800">Cadência de Gestão & Reuniões</h2>
              <p className="text-sm text-slate-500 mt-1">
                Registro oficial das reuniões semanais de alinhamento (30 min) e devolutivas à Direção da URE.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reunioes.map((r) => (
                <div key={r.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-lg border border-blue-200">
                      {r.tipo}
                    </span>
                    <span className="text-xs text-slate-500">{r.data} ({r.duracao})</span>
                  </div>
                  <h3 className="text-md font-bold text-slate-800">Participantes: {r.participantes}</h3>
                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <strong>Decisão / Saída:</strong> {r.saida}
                  </p>
                  <div className="flex justify-end">
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                      Status: {r.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: PAINEL EXECUTIVO / SEMÁFORO                         */}
        {/* ========================================================= */}
        {activeTab === 'painel' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Painel Executivo & Semáforo de Referência</h2>
                <p className="text-sm text-slate-500">Indicadores consolidados para prestação de contas à Direção da URE e COEGD.</p>
              </div>
              <button 
                onClick={() => showNotification('Relatório executivo gerado com sucesso para exportação.')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2 px-4 rounded-xl transition shadow-sm"
              >
                Exportar Síntese Executiva
              </button>
            </div>

            {/* Cards de Indicadores */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Plano Anual (A2)</span>
                <div className="text-3xl font-extrabold text-blue-600 mt-2">{pctExecucaoPlano}%</div>
                <p className="text-xs text-slate-500 mt-1">{acoesConcluidasPlano} de {totalAcoesPlano} ações entregues</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Situações P1 Abertas</span>
                <div className="text-3xl font-extrabold text-red-600 mt-2">{p1Abertas}</div>
                <p className="text-xs text-slate-500 mt-1">Exposição a riscos críticos</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tarefas Atrasadas (A3)</span>
                <div className="text-3xl font-extrabold text-amber-600 mt-2">{tarefasAtrasadas}</div>
                <p className="text-xs text-slate-500 mt-1">Requer plano de recuperação</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visitas Realizadas</span>
                <div className="text-3xl font-extrabold text-emerald-600 mt-2">{pctVisitas}%</div>
                <p className="text-xs text-slate-500 mt-1">{visitasSemRegistro} sem formulário oficial</p>
              </div>
            </div>

            {/* Tabela Semáforo de Referência */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-100 border-b border-slate-200 font-bold text-slate-700 text-sm">
                Semáforo de Referência Governamental
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-slate-600 text-xs font-bold uppercase tracking-wider border-b border-slate-200 bg-slate-50">
                      <th className="p-4">Indicador</th>
                      <th className="p-4 text-center text-emerald-700">Verde (No ritmo)</th>
                      <th className="p-4 text-center text-amber-700">Amarelo (Atenção)</th>
                      <th className="p-4 text-center text-red-700">Vermelho (Crítico)</th>
                      <th className="p-4 text-center">Status Atual URE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-sm">
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 font-semibold text-slate-800">Execução do Plano Anual</td>
                      <td className="p-4 text-center text-xs bg-emerald-50/50">Acima de 80%</td>
                      <td className="p-4 text-center text-xs bg-amber-50/50">50% a 79%</td>
                      <td className="p-4 text-center text-xs bg-red-50/50">Abaixo de 50%</td>
                      <td className="p-4 text-center font-bold">
                        <span className={`px-3 py-1 rounded-full text-xs ${pctExecucaoPlano >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {pctExecucaoPlano >= 80 ? 'Verde' : 'Amarelo'}
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 font-semibold text-slate-800">Situações P1 em Aberto</td>
                      <td className="p-4 text-center text-xs bg-emerald-50/50">0</td>
                      <td className="p-4 text-center text-xs bg-amber-50/50">1 a 2</td>
                      <td className="p-4 text-center text-xs bg-red-50/50">3 ou mais</td>
                      <td className="p-4 text-center font-bold">
                        <span className={`px-3 py-1 rounded-full text-xs ${p1Abertas === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {p1Abertas === 0 ? 'Verde' : 'Amarelo'}
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 font-semibold text-slate-800">Visitas Realizadas vs Programadas</td>
                      <td className="p-4 text-center text-xs bg-emerald-50/50">90% ou mais</td>
                      <td className="p-4 text-center text-xs bg-amber-50/50">70% a 89%</td>
                      <td className="p-4 text-center text-xs bg-red-50/50">Menos de 70%</td>
                      <td className="p-4 text-center font-bold">
                        <span className={`px-3 py-1 rounded-full text-xs ${pctVisitas >= 90 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {pctVisitas >= 90 ? 'Verde' : 'Amarelo'}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* RODAPÉ GOVERNAMENTAL */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-center text-xs text-slate-500">
        <p>SEDUCE / COEGD &bull; Sistema de Governança SEINTEC / SETEC &bull; Unidade Regional de Ensino Campinas Leste</p>
        <p className="mt-1">Desenvolvido com arquitetura web moderna, compatível com Linux e todos os navegadores corporativos.</p>
      </footer>

    </div>
  );
}