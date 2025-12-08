const { useState, useEffect } = React;
const { createClient } = supabase;

const supabaseUrl = 'https://xmqjwqtfatxfwyuxovcg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtcWp3cXRmYXR4Znd5dXhvdmNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDk2MjkzNCwiZXhwIjoyMDgwNTM4OTM0fQ.DVdgp8bH5EoScetG__4wSzHpsnIHsjN1UGf1G-s1TMM';
const supabaseClient = createClient(supabaseUrl, supabaseKey);

const convertToBrasilia = (utcDate) => {
    if (!utcDate) return '';
    const date = new Date(utcDate);
    return date.toLocaleString('pt-BR', { 
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data, error } = await supabaseClient
                .from('users')
                .select('*')
                .eq('email', email)
                .eq('senha', senha)
                .single();

            if (error || !data) {
                setError('Email ou senha incorretos');
                setLoading(false);
                return;
            }

            onLogin(data);
        } catch (err) {
            console.error('Erro no login:', err);
            setError('Erro ao fazer login');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center gradient-bg">
            <div className="card p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Controle SDR</h1>
                    <p className="text-gray-600">Sistema de Distribuição de Leads - Omie</p>
                </div>
                
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input type="email" className="input-field" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
                        <input type="password" className="input-field" placeholder="••••••••" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                    </div>
                    
                    {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}
                    
                    <button type="submit" className="btn-primary w-full" disabled={loading}>
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const Navbar = ({ user, currentPage, setCurrentPage, onLogout }) => {
    return (
        <nav className="gradient-bg text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center space-x-8 flex-wrap">
                        <h1 className="text-xl font-bold">Controle SDR - Omie</h1>
                        <div className="flex space-x-2">
                            <button onClick={() => setCurrentPage('controle')} className={`px-4 py-2 rounded-lg transition text-sm ${currentPage === 'controle' ? 'bg-white text-purple-700 font-semibold' : 'hover:bg-white/20'}`}>
                                <i className="fas fa-users mr-2"></i>SDRs
                            </button>
                            <button onClick={() => setCurrentPage('dashboard')} className={`px-4 py-2 rounded-lg transition text-sm ${currentPage === 'dashboard' ? 'bg-white text-purple-700 font-semibold' : 'hover:bg-white/20'}`}>
                                <i className="fas fa-chart-line mr-2"></i>Dashboard
                            </button>
                            <button onClick={() => setCurrentPage('logs')} className={`px-4 py-2 rounded-lg transition text-sm ${currentPage === 'logs' ? 'bg-white text-purple-700 font-semibold' : 'hover:bg-white/20'}`}>
                                <i className="fas fa-history mr-2"></i>Logs
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm">{user.email}</span>
                        <button onClick={onLogout} className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition text-sm">
                            <i className="fas fa-sign-out-alt mr-2"></i>Sair
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-12">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm">
                    Precisa de ajuda, tem dúvidas ou sugestões?{' '}
                    <a 
                        href="https://omiexperience.slack.com/team/U02C0EC78H4" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 font-semibold transition"
                    >
                        Mande uma mensagem no Slack para Luã Fhelyp (lua@omie.com.br)
                    </a>
                </p>
                <p className="text-xs text-gray-400 mt-2">
                    © 2025 Omie - Sistema de Controle de Distribuição SDR
                </p>
            </div>
        </footer>
    );
};

const SDRModal = ({ sdr, onClose, onSave, user }) => {
    const [formData, setFormData] = useState({
        sdr_email: sdr?.sdr_email || '',
        sdr_nome: sdr?.sdr_nome || '',
        sdr_status: sdr?.sdr_status ?? true,
        leads_recebidos: sdr?.leads_recebidos || 0
    });
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        
        try {
            if (sdr) {
                const { error } = await supabaseClient
                    .from('controle_sdrs')
                    .update({
                        sdr_nome: formData.sdr_nome,
                        sdr_status: formData.sdr_status,
                        leads_recebidos: parseInt(formData.leads_recebidos)
                    })
                    .eq('sdr_email', sdr.sdr_email);

                if (error) throw error;

                await supabaseClient
                    .from('audit_logs')
                    .insert({
                        usuario_email: user.email,
                        acao: 'UPDATE',
                        tabela: 'controle_sdrs',
                        registro_id: sdr.sdr_email,
                        valor_anterior: JSON.stringify(sdr),
                        valor_novo: JSON.stringify(formData)
                    });
            } else {
                const { error } = await supabaseClient
                    .from('controle_sdrs')
                    .insert({
                        sdr_email: formData.sdr_email,
                        sdr_nome: formData.sdr_nome,
                        sdr_status: formData.sdr_status,
                        leads_recebidos: parseInt(formData.leads_recebidos)
                    });

                if (error) throw error;

                await supabaseClient
                    .from('audit_logs')
                    .insert({
                        usuario_email: user.email,
                        acao: 'INSERT',
                        tabela: 'controle_sdrs',
                        registro_id: formData.sdr_email,
                        valor_novo: JSON.stringify(formData)
                    });
            }

            onSave();
        } catch (error) {
            alert('Erro ao salvar: ' + error.message);
            setSaving(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">{sdr ? 'Editar SDR' : 'Adicionar SDR'}</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email do SDR</label>
                            <input type="email" className="input-field" value={formData.sdr_email} onChange={(e) => setFormData({...formData, sdr_email: e.target.value})} required disabled={!!sdr} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nome do SDR</label>
                            <input type="text" className="input-field" value={formData.sdr_nome} onChange={(e) => setFormData({...formData, sdr_nome: e.target.value})} required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select className="input-field" value={formData.sdr_status} onChange={(e) => setFormData({...formData, sdr_status: e.target.value === 'true'})}>
                                <option value="true">Ativo</option>
                                <option value="false">Inativo</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Leads Recebidos</label>
                            <input type="number" className="input-field" value={formData.leads_recebidos} onChange={(e) => setFormData({...formData, leads_recebidos: e.target.value})} required min="0" />
                        </div>
                        <div className="flex space-x-4">
                            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold" disabled={saving}>Cancelar</button>
                            <button type="submit" className="flex-1 btn-primary" disabled={saving}>{saving ? 'Salvando...' : 'Salvar'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const ControlePage = ({ user }) => {
    const [sdrs, setSdrs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingSdr, setEditingSdr] = useState(null);

    const loadSdrs = async () => {
        setLoading(true);
        const { data } = await supabaseClient.from('controle_sdrs').select('*').order('sdr_nome');
        setSdrs(data || []);
        setLoading(false);
    };

    useEffect(() => { loadSdrs(); }, []);

    const handleDelete = async (sdr) => {
        if (!confirm(`Excluir ${sdr.sdr_nome}?`)) return;
        try {
            await supabaseClient.from('controle_sdrs').delete().eq('sdr_email', sdr.sdr_email);
            await supabaseClient.from('audit_logs').insert({ usuario_email: user.email, acao: 'DELETE', tabela: 'controle_sdrs', registro_id: sdr.sdr_email, valor_anterior: JSON.stringify(sdr) });
            loadSdrs();
        } catch (error) {
            alert('Erro ao excluir');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <h2 className="text-3xl font-bold text-gray-800">Controle de SDRs</h2>
                <button onClick={() => { setEditingSdr(null); setModalOpen(true); }} className="btn-primary">
                    <i className="fas fa-plus mr-2"></i>Adicionar SDR
                </button>
            </div>
            <div className="card p-6">
                {loading ? (
                    <div className="text-center py-8">
                        <i className="fas fa-spinner fa-spin text-4xl text-purple-600"></i>
                        <p className="mt-4 text-gray-600">Carregando...</p>
                    </div>
                ) : (
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Nome</th>
                                    <th>Status</th>
                                    <th>Leads</th>
                                    <th className="text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sdrs.map((sdr) => (
                                    <tr key={sdr.sdr_email}>
                                        <td className="text-sm">{sdr.sdr_email}</td>
                                        <td className="font-semibold">{sdr.sdr_nome}</td>
                                        <td><span className={`badge ${sdr.sdr_status ? 'badge-success' : 'badge-danger'}`}>{sdr.sdr_status ? 'Ativo' : 'Inativo'}</span></td>
                                        <td><span className="font-bold text-purple-600">{sdr.leads_recebidos}</span></td>
                                        <td className="text-right">
                                            <button onClick={() => { setEditingSdr(sdr); setModalOpen(true); }} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2 text-sm"><i className="fas fa-edit"></i></button>
                                            <button onClick={() => handleDelete(sdr)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {sdrs.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <i className="fas fa-users text-4xl mb-4 opacity-30"></i>
                                <p>Nenhum SDR cadastrado</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {modalOpen && <SDRModal sdr={editingSdr} onClose={() => { setModalOpen(false); setEditingSdr(null); }} onSave={() => { setModalOpen(false); setEditingSdr(null); loadSdrs(); }} user={user} />}
            <Footer />
        </div>
    );
};

const DashboardPage = () => {
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedSdrs, setSelectedSdrs] = useState([]);
    const [stats, setStats] = useState({ total: 0, porSdr: {} });

    // Configurar período padrão de 15 dias
    useEffect(() => {
        const today = new Date();
        const fifteenDaysAgo = new Date(today);
        fifteenDaysAgo.setDate(today.getDate() - 15);
        
        setEndDate(today.toISOString().split('T')[0]);
        setStartDate(fifteenDaysAgo.toISOString().split('T')[0]);
    }, []);

    const loadLogs = async () => {
        setLoading(true);
        const { data } = await supabaseClient.from('log_distribuicao').select('*').order('created_at', { ascending: false });
        if (data) {
            setLogs(data);
        }
        setLoading(false);
    };

    useEffect(() => { loadLogs(); }, []);
    useEffect(() => { filterLogs(); }, [startDate, endDate, selectedSdrs, logs]);

    // Filtros rápidos
    const setQuickFilter = (filter) => {
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        
        switch(filter) {
            case 'hoje':
                setStartDate(todayStr);
                setEndDate(todayStr);
                break;
            case '7dias':
                const sevenDaysAgo = new Date(today);
                sevenDaysAgo.setDate(today.getDate() - 7);
                setStartDate(sevenDaysAgo.toISOString().split('T')[0]);
                setEndDate(todayStr);
                break;
            case '15dias':
                const fifteenDaysAgo = new Date(today);
                fifteenDaysAgo.setDate(today.getDate() - 15);
                setStartDate(fifteenDaysAgo.toISOString().split('T')[0]);
                setEndDate(todayStr);
                break;
            case 'mes':
                const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
                setStartDate(firstDay.toISOString().split('T')[0]);
                setEndDate(todayStr);
                break;
            case 'tudo':
                setStartDate('');
                setEndDate('');
                break;
        }
    };

    const filterLogs = () => {
        let filtered = [...logs];
        if (startDate) filtered = filtered.filter(log => new Date(log.created_at) >= new Date(startDate));
        if (endDate) {
            const end = new Date(endDate);
            end.setHours(23, 59, 59);
            filtered = filtered.filter(log => new Date(log.created_at) <= end);
        }
        if (selectedSdrs.length > 0) {
            filtered = filtered.filter(log => selectedSdrs.includes(log.sdr_nome));
        }
        setFilteredLogs(filtered);
        calculateStats(filtered);
    };

    const calculateStats = (data) => {
        const porSdr = {};
        data.forEach(log => porSdr[log.sdr_nome] = (porSdr[log.sdr_nome] || 0) + 1);
        setStats({ total: data.length, porSdr });
    };

    // Lista única de SDRs
    const uniqueSdrs = [...new Set(logs.map(log => log.sdr_nome))].sort();

    const toggleSdr = (sdr) => {
        setSelectedSdrs(prev => 
            prev.includes(sdr) ? prev.filter(s => s !== sdr) : [...prev, sdr]
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
            
            {/* Filtros Rápidos */}
            <div className="card p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4"><i className="fas fa-clock mr-2 text-purple-600"></i>Filtros Rápidos</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                    <button onClick={() => setQuickFilter('hoje')} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition text-sm font-medium">
                        <i className="fas fa-calendar-day mr-2"></i>Hoje
                    </button>
                    <button onClick={() => setQuickFilter('7dias')} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition text-sm font-medium">
                        <i className="fas fa-calendar-week mr-2"></i>Últimos 7 dias
                    </button>
                    <button onClick={() => setQuickFilter('15dias')} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium">
                        <i className="fas fa-calendar-alt mr-2"></i>Últimos 15 dias (Padrão)
                    </button>
                    <button onClick={() => setQuickFilter('mes')} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition text-sm font-medium">
                        <i className="fas fa-calendar mr-2"></i>Este mês
                    </button>
                    <button onClick={() => setQuickFilter('tudo')} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm font-medium">
                        <i className="fas fa-infinity mr-2"></i>Tudo
                    </button>
                </div>
                
                {/* Filtros de Data */}
                <h3 className="text-lg font-semibold mb-4 mt-6"><i className="fas fa-filter mr-2 text-purple-600"></i>Filtros Personalizados</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Data Inicial</label>
                        <input type="date" className="input-field" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Data Final</label>
                        <input type="date" className="input-field" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                </div>
                
                {/* Filtro por SDR */}
                {uniqueSdrs.length > 0 && (
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="fas fa-user-friends mr-2"></i>Filtrar por SDR {selectedSdrs.length > 0 && `(${selectedSdrs.length} selecionados)`}
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {uniqueSdrs.map(sdr => (
                                <button
                                    key={sdr}
                                    onClick={() => toggleSdr(sdr)}
                                    className={`px-3 py-2 rounded-lg transition text-sm font-medium ${
                                        selectedSdrs.includes(sdr)
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {selectedSdrs.includes(sdr) && <i className="fas fa-check mr-2"></i>}
                                    {sdr}
                                </button>
                            ))}
                            {selectedSdrs.length > 0 && (
                                <button
                                    onClick={() => setSelectedSdrs([])}
                                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm font-medium"
                                >
                                    <i className="fas fa-times mr-2"></i>Limpar SDRs
                                </button>
                            )}
                        </div>
                    </div>
                )}
                
                {(startDate || endDate || selectedSdrs.length > 0) && (
                    <button onClick={() => { setStartDate(''); setEndDate(''); setSelectedSdrs([]); setQuickFilter('15dias'); }} className="mt-4 text-sm text-purple-600 hover:text-purple-800 font-medium">
                        <i className="fas fa-redo mr-1"></i>Resetar todos os filtros
                    </button>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="stat-card"><div className="stat-value">{stats.total}</div><div className="stat-label">Total de Leads</div></div>
                <div className="stat-card"><div className="stat-value">{Object.keys(stats.porSdr).length}</div><div className="stat-label">SDRs Ativos</div></div>
                <div className="stat-card"><div className="stat-value">{Object.keys(stats.porSdr).length > 0 ? Math.round(stats.total / Object.keys(stats.porSdr).length) : 0}</div><div className="stat-label">Média por SDR</div></div>
            </div>
            <div className="card p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4"><i className="fas fa-chart-bar mr-2 text-purple-600"></i>Por SDR</h3>
                {Object.keys(stats.porSdr).length > 0 ? (
                    <div className="space-y-4">
                        {Object.entries(stats.porSdr).sort((a, b) => b[1] - a[1]).map(([sdr, count]) => (
                            <div key={sdr}>
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium">{sdr}</span>
                                    <span className="text-purple-600 font-bold">{count} leads ({((count / stats.total) * 100).toFixed(1)}%)</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="gradient-bg h-2 rounded-full" style={{ width: `${(count / stats.total) * 100}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500"><i className="fas fa-chart-bar text-4xl mb-4 opacity-30"></i><p>Sem dados</p></div>
                )}
            </div>
            <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4"><i className="fas fa-list mr-2 text-purple-600"></i>Logs ({filteredLogs.length})</h3>
                {loading ? (
                    <div className="text-center py-8"><i className="fas fa-spinner fa-spin text-4xl text-purple-600"></i></div>
                ) : (
                    <div className="table-container">
                        <table>
                            <thead><tr><th>ID</th><th>Data/Hora</th><th>SDR</th><th>Documento</th><th>Telefone</th></tr></thead>
                            <tbody>
                                {filteredLogs.slice(0, 100).map((log) => (
                                    <tr key={log.id}>
                                        <td className="font-mono text-xs">{log.id}</td>
                                        <td className="text-sm">{convertToBrasilia(log.created_at)}</td>
                                        <td className="font-semibold">{log.sdr_nome}</td>
                                        <td className="font-mono text-sm">{log.lead_documento || 'N/A'}</td>
                                        <td className="font-mono text-sm">{log.lead_telefone || 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredLogs.length === 0 && <div className="text-center py-8 text-gray-500"><i className="fas fa-inbox text-4xl mb-4 opacity-30"></i><p>Nenhum log</p></div>}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

const LogsPage = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadLogs = async () => {
            const { data } = await supabaseClient.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(100);
            if (data) setLogs(data);
            setLoading(false);
        };
        loadLogs();
    }, []);

    const getAcaoLabel = (acao) => ({ 'INSERT': 'Criação', 'UPDATE': 'Edição', 'DELETE': 'Exclusão' }[acao] || acao);
    const getAcaoColor = (acao) => ({ 'INSERT': 'badge-success', 'UPDATE': 'bg-blue-100 text-blue-800', 'DELETE': 'badge-danger' }[acao] || 'bg-gray-100 text-gray-800');
    const getAcaoIcon = (acao) => ({ 'INSERT': 'fa-plus-circle', 'UPDATE': 'fa-edit', 'DELETE': 'fa-trash' }[acao] || 'fa-circle');

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Logs de Auditoria</h2>
            <div className="card p-6">
                {loading ? (
                    <div className="text-center py-8"><i className="fas fa-spinner fa-spin text-4xl text-purple-600"></i></div>
                ) : (
                    <div className="space-y-4">
                        {logs.map((log) => (
                            <div key={log.id} className="border-l-4 border-purple-500 pl-4 py-3 bg-gray-50 rounded-r hover:shadow-md transition">
                                <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                                    <div className="flex items-center space-x-3">
                                        <i className={`fas ${getAcaoIcon(log.acao)} text-purple-600`}></i>
                                        <span className={`badge ${getAcaoColor(log.acao)}`}>{getAcaoLabel(log.acao)}</span>
                                        <span className="font-semibold text-gray-800">{log.usuario_email}</span>
                                    </div>
                                    <span className="text-sm text-gray-500">{convertToBrasilia(log.created_at)}</span>
                                </div>
                                <div className="text-sm text-gray-600"><strong>Tabela:</strong> {log.tabela} | <strong>Registro:</strong> {log.registro_id}</div>
                                {log.acao === 'UPDATE' && log.valor_anterior && log.valor_novo && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-3">
                                        <div className="bg-red-50 p-3 rounded border border-red-200">
                                            <div className="font-semibold text-red-700 mb-1"><i className="fas fa-arrow-left mr-1"></i>Antes</div>
                                            <pre className="text-xs overflow-auto whitespace-pre-wrap">{log.valor_anterior}</pre>
                                        </div>
                                        <div className="bg-green-50 p-3 rounded border border-green-200">
                                            <div className="font-semibold text-green-700 mb-1"><i className="fas fa-arrow-right mr-1"></i>Depois</div>
                                            <pre className="text-xs overflow-auto whitespace-pre-wrap">{log.valor_novo}</pre>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {logs.length === 0 && <div className="text-center py-8 text-gray-500"><i className="fas fa-history text-4xl mb-4 opacity-30"></i><p>Nenhum log</p></div>}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

const App = () => {
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState('controle');

    useEffect(() => {
        const saved = localStorage.getItem('sdr_user');
        if (saved) setUser(JSON.parse(saved));
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('sdr_user', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('sdr_user');
    };

    if (!user) return <LoginPage onLogin={handleLogin} />;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar user={user} currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={handleLogout} />
            {currentPage === 'controle' && <ControlePage user={user} />}
            {currentPage === 'dashboard' && <DashboardPage />}
            {currentPage === 'logs' && <LogsPage />}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
