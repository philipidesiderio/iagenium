import streamlit as st
import os
import json
from datetime import datetime
from crewai import Agent, Task, Crew, Process

st.set_page_config(
    page_title="CrewAI Studio",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded"
)

st.markdown("""
<style>
    .main-header { font-size: 2rem; font-weight: bold; color: #1f77b4; }
    .status-box { padding: 1rem; border-radius: 0.5rem; margin: 0.5rem 0; }
    .success-box { background-color: #d4edda; border: 1px solid #c3e6cb; }
    .info-box { background-color: #d1ecf1; border: 1px solid #bee5eb; }
</style>
""", unsafe_allow_html=True)

if "history" not in st.session_state:
    st.session_state.history = []

with st.sidebar:
    st.image("https://raw.githubusercontent.com/joaomdmoura/crewAI/main/docs/crewai_logo.png",
             use_column_width=True) if False else st.title("🤖 CrewAI Studio")

    st.subheader("⚙️ Configuração")

    openai_key = st.text_input(
        "OpenAI API Key",
        type="password",
        value=os.getenv("OPENAI_API_KEY", ""),
        placeholder="sk-..."
    )
    if openai_key:
        os.environ["OPENAI_API_KEY"] = openai_key

    model = st.selectbox(
        "Modelo LLM",
        ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-4", "gpt-3.5-turbo"],
        index=0
    )

    st.divider()

    if st.button("🗑️ Limpar Histórico", use_container_width=True):
        st.session_state.history = []
        st.success("Histórico limpo!")

    st.divider()
    st.caption("CrewAI Studio • iagenium.online")
    st.caption("Powered by CrewAI Framework")

st.markdown('<div class="main-header">🤖 CrewAI Studio</div>', unsafe_allow_html=True)
st.caption("Crie e execute equipes de agentes de IA para automatizar tarefas complexas")

tab_run, tab_templates, tab_history = st.tabs(["🚀 Nova Crew", "📦 Templates", "📊 Histórico"])

with tab_run:
    col_agents, col_tasks = st.columns(2)

    with col_agents:
        st.subheader("👥 Agentes")
        num_agents = st.slider("Quantidade de Agentes", 1, 5, 2)

        agents_data = []
        for i in range(num_agents):
            with st.expander(f"🤖 Agente {i + 1}", expanded=(i == 0)):
                role = st.text_input("Papel / Função", key=f"role_{i}",
                                     placeholder="Ex: Pesquisador Sênior")
                goal = st.text_area("Objetivo", key=f"goal_{i}", height=80,
                                    placeholder="Ex: Pesquisar e sintetizar informações relevantes sobre o tema")
                backstory = st.text_area("Contexto / História", key=f"backstory_{i}", height=80,
                                         placeholder="Ex: Você é um especialista com 10 anos de experiência em...")
                allow_delegation = st.checkbox("Permitir delegação", key=f"deleg_{i}", value=False)

                agents_data.append({
                    "role": role,
                    "goal": goal,
                    "backstory": backstory,
                    "allow_delegation": allow_delegation
                })

    with col_tasks:
        st.subheader("📋 Tarefas")
        num_tasks = st.slider("Quantidade de Tarefas", 1, 5, 2)

        tasks_data = []
        for i in range(num_tasks):
            with st.expander(f"📌 Tarefa {i + 1}", expanded=(i == 0)):
                description = st.text_area("Descrição da Tarefa", key=f"tdesc_{i}", height=100,
                                           placeholder="Descreva detalhadamente o que deve ser feito...")
                expected_output = st.text_input("Output Esperado", key=f"texp_{i}",
                                                placeholder="Ex: Relatório com 500 palavras em português")
                agent_idx = st.selectbox(
                    "Agente Responsável",
                    options=list(range(num_agents)),
                    format_func=lambda x: agents_data[x]["role"] if agents_data[x]["role"] else f"Agente {x + 1}",
                    key=f"tagent_{i}"
                )
                context_tasks = st.multiselect(
                    "Depende das Tarefas",
                    options=[j for j in range(i)],
                    format_func=lambda x: f"Tarefa {x + 1}",
                    key=f"tctx_{i}"
                )

                tasks_data.append({
                    "description": description,
                    "expected_output": expected_output,
                    "agent_idx": agent_idx,
                    "context_tasks": context_tasks
                })

    st.divider()

    col_cfg1, col_cfg2, col_cfg3 = st.columns(3)
    with col_cfg1:
        process_type = st.selectbox("Processo", ["Sequential", "Hierarchical"])
    with col_cfg2:
        verbose = st.checkbox("Verbose (logs detalhados)", value=True)
    with col_cfg3:
        max_iter = st.number_input("Max Iterações por Agente", 5, 25, 10)

    crew_name = st.text_input("Nome da Crew (opcional)", placeholder="Ex: Pesquisa de Mercado")

    run_btn = st.button("🚀 Executar Crew", type="primary", use_container_width=True)

    if run_btn:
        if not os.getenv("OPENAI_API_KEY"):
            st.error("❌ Configure sua OpenAI API Key na barra lateral antes de executar!")
        else:
            missing = []
            for i, a in enumerate(agents_data):
                if not a["role"] or not a["goal"] or not a["backstory"]:
                    missing.append(f"Agente {i + 1}")
            for i, t in enumerate(tasks_data):
                if not t["description"] or not t["expected_output"]:
                    missing.append(f"Tarefa {i + 1}")

            if missing:
                st.warning(f"⚠️ Preencha todos os campos de: {', '.join(missing)}")
            else:
                result_placeholder = st.empty()
                log_placeholder = st.empty()

                with st.spinner("⚙️ Executando Crew... Aguarde."):
                    try:
                        agents = []
                        for a in agents_data:
                            agent = Agent(
                                role=a["role"],
                                goal=a["goal"],
                                backstory=a["backstory"],
                                allow_delegation=a["allow_delegation"],
                                llm=model,
                                max_iter=max_iter,
                                verbose=verbose
                            )
                            agents.append(agent)

                        task_objects = []
                        for t in tasks_data:
                            context = [task_objects[ci] for ci in t["context_tasks"]] if t["context_tasks"] else None
                            task = Task(
                                description=t["description"],
                                expected_output=t["expected_output"],
                                agent=agents[t["agent_idx"]],
                                context=context
                            )
                            task_objects.append(task)

                        process = Process.sequential if process_type == "Sequential" else Process.hierarchical
                        crew = Crew(
                            agents=agents,
                            tasks=task_objects,
                            process=process,
                            verbose=verbose
                        )

                        result = crew.kickoff()

                        result_str = str(result)
                        run_record = {
                            "id": len(st.session_state.history) + 1,
                            "name": crew_name or f"Crew #{len(st.session_state.history) + 1}",
                            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                            "agents": [a["role"] for a in agents_data],
                            "tasks": [t["description"][:60] + "..." for t in tasks_data],
                            "result": result_str,
                            "model": model,
                            "process": process_type
                        }
                        st.session_state.history.append(run_record)

                        st.success("✅ Crew executada com sucesso!")
                        st.subheader("📄 Resultado Final")
                        st.markdown(result_str)

                        with st.expander("💾 Exportar Resultado"):
                            st.download_button(
                                "⬇️ Baixar como JSON",
                                data=json.dumps(run_record, ensure_ascii=False, indent=2),
                                file_name=f"crewai_resultado_{run_record['id']}.json",
                                mime="application/json"
                            )
                            st.download_button(
                                "⬇️ Baixar como TXT",
                                data=result_str,
                                file_name=f"crewai_resultado_{run_record['id']}.txt",
                                mime="text/plain"
                            )

                    except Exception as e:
                        st.error(f"❌ Erro ao executar Crew: {str(e)}")
                        st.exception(e)

with tab_templates:
    st.subheader("📦 Templates Prontos")
    st.info("Carregue um template para preencher os campos automaticamente na aba 'Nova Crew'.")

    templates = {
        "🔍 Pesquisa de Mercado": {
            "description": "Pesquise e analise um mercado específico, identificando tendências, concorrentes e oportunidades.",
            "agents": [
                {"role": "Pesquisador de Mercado", "goal": "Coletar dados abrangentes sobre o mercado alvo", "backstory": "Especialista em pesquisa de mercado com ampla experiência em análise competitiva."},
                {"role": "Analista de Dados", "goal": "Analisar e interpretar os dados coletados para gerar insights", "backstory": "Analista sênior com habilidade em transformar dados brutos em insights acionáveis."},
                {"role": "Redator de Relatórios", "goal": "Criar relatórios claros e profissionais com as descobertas", "backstory": "Especialista em comunicação empresarial com foco em relatórios executivos."}
            ],
            "tasks": [
                {"description": "Pesquise o mercado alvo identificando os principais players, tamanho do mercado e tendências atuais.", "expected_output": "Relatório de pesquisa com dados sobre os top 10 concorrentes e 5 tendências do mercado"},
                {"description": "Analise os dados coletados e identifique oportunidades e ameaças para o negócio.", "expected_output": "Análise SWOT detalhada com 3 oportunidades e 3 ameaças identificadas"},
                {"description": "Compile todas as informações em um relatório executivo profissional.", "expected_output": "Relatório executivo de 1000 palavras em formato markdown"}
            ]
        },
        "✍️ Criação de Conteúdo": {
            "description": "Crie conteúdo de alta qualidade para blog, redes sociais ou marketing.",
            "agents": [
                {"role": "Estrategista de Conteúdo", "goal": "Definir a estratégia e pauta de conteúdo", "backstory": "Especialista em marketing de conteúdo com foco em SEO e engajamento."},
                {"role": "Redator Criativo", "goal": "Criar textos envolventes e persuasivos", "backstory": "Redator experiente com portfólio em diversas indústrias."},
                {"role": "Editor", "goal": "Revisar e aperfeiçoar o conteúdo criado", "backstory": "Editor com olho crítico para qualidade, clareza e consistência de marca."}
            ],
            "tasks": [
                {"description": "Defina o tema, palavras-chave e estrutura para o conteúdo a ser criado.", "expected_output": "Pauta detalhada com título, subtítulos e principais pontos a cobrir"},
                {"description": "Escreva o conteúdo completo baseado na pauta definida.", "expected_output": "Artigo de 800-1200 palavras otimizado para SEO"},
                {"description": "Revise o conteúdo, corrija erros e aprimore a qualidade geral.", "expected_output": "Versão final do conteúdo pronto para publicação"}
            ]
        },
        "💻 Análise de Código": {
            "description": "Analise, revise e melhore código de software.",
            "agents": [
                {"role": "Revisor de Código", "goal": "Analisar o código em busca de bugs e problemas de qualidade", "backstory": "Engenheiro sênior com experiência em code review e boas práticas."},
                {"role": "Especialista em Segurança", "goal": "Identificar vulnerabilidades e problemas de segurança", "backstory": "Especialista em segurança de software com foco em OWASP e boas práticas."},
                {"role": "Arquiteto de Software", "goal": "Sugerir melhorias de arquitetura e design", "backstory": "Arquiteto com experiência em design patterns e arquitetura escalável."}
            ],
            "tasks": [
                {"description": "Revise o código fornecido e liste todos os bugs, code smells e problemas de qualidade encontrados.", "expected_output": "Lista detalhada de problemas com localização e severidade"},
                {"description": "Analise o código em busca de vulnerabilidades de segurança.", "expected_output": "Relatório de segurança com CVEs relevantes e recomendações"},
                {"description": "Proponha melhorias de arquitetura e refatorações para o código.", "expected_output": "Plano de refatoração priorizado com estimativas de esforço"}
            ]
        }
    }

    for template_name, template_data in templates.items():
        with st.expander(template_name):
            st.write(template_data["description"])
            st.write(f"**Agentes:** {', '.join([a['role'] for a in template_data['agents']])}")
            st.write(f"**Tarefas:** {len(template_data['tasks'])} tarefas configuradas")

            if st.button(f"Usar este template", key=f"tpl_{template_name}"):
                st.info("ℹ️ Copie as configurações abaixo e preencha manualmente na aba 'Nova Crew':")
                st.json(template_data)

with tab_history:
    st.subheader("📊 Histórico de Execuções")

    if not st.session_state.history:
        st.info("Nenhuma execução realizada ainda. Execute uma Crew para ver o histórico aqui.")
    else:
        for record in reversed(st.session_state.history):
            with st.expander(f"#{record['id']} — {record['name']} ({record['timestamp']})"):
                col1, col2, col3 = st.columns(3)
                with col1:
                    st.metric("Modelo", record["model"])
                with col2:
                    st.metric("Processo", record["process"])
                with col3:
                    st.metric("Agentes", len(record["agents"]))

                st.write("**Agentes:**", ", ".join(record["agents"]))
                st.write("**Tarefas:**")
                for i, t in enumerate(record["tasks"], 1):
                    st.write(f"  {i}. {t}")

                st.subheader("Resultado")
                st.markdown(record["result"])

                st.download_button(
                    "⬇️ Exportar JSON",
                    data=json.dumps(record, ensure_ascii=False, indent=2),
                    file_name=f"crewai_{record['id']}.json",
                    mime="application/json",
                    key=f"dl_{record['id']}"
                )
