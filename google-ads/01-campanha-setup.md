# Google Ads — Implementação da Campanha — Enzo Mariotto

**Base aprovada:** `05-google-ads/google-ads-structure.md` (rev.2, Entrada 008)
**Orçamento:** R$ 1.500/mês (validação) · **Conversão:** clique no WhatsApp (`click_whatsapp`)
**Preparado para:** Lucas · **Data:** 2026-08-04

---

## 1. Dados pendentes antes de criar a conta/campanha

| # | Item | Status |
|---|---|---|
| 1 | **Número comercial WhatsApp** (para o link `wa.me`) | ❌ Definir com Enzo |
| 2 | Endereços exatos Taubá + SJC (extensão de local) | ❌ Confirmar |
| 3 | Acesso à conta Google Ads (ou criação) | ❌ |
| 4 | Domínio/hospedagem da LP + GTM/GA4 publicados | ❌ |
| 5 | Orçamento diário confirmado (proposta: R$ 50/dia) | ✅ Proposta aprovada |

> **Regra:** a campanha **não vai ao ar** sem os itens 1–4. (Checkpoint 15)

---

## 2. Estrutura de conta (criar manualmente ou via Editor)

```
Conta: [Nova conta / conta do Enzo]
└── Campanha: Search — Nutrição Esportiva — Taubate + SJC   (R$ 50/dia)
    ├── Grupo de anúncios: Taubate / Jd. das Nacoes
    │     ├── 17 keywords (5 exata + 12 frase)
    │     └── 1 RSA (15 headlines + 4 descrições)
    └── Grupo de anúncios: SJC / Aquarius
          ├── 16 keywords (4 exata + 12 frase)
          └── 1 RSA (15 headlines + 4 descrições)
    └── Negativas de campanha (38 termos / 7 temas)
```

**Import:** usar `02-keywords.csv` (Google Ads → Ferramentas → Carregamentos em massa → Keywords) ou Google Ads Editor (importar → planilha).

---

## 3. Configurações da campanha

| Configuração | Valor |
|---|---|
| **Nome** | `Search — Nutrição Esportiva — Taubate + SJC` |
| **Objetivo** | Leads |
| **Tipo** | Pesquisa (Search) — incluir parceiros de pesquisa: **desmarcar** |
| **Rede** | Pesquisa apenas (sem Display) |
| **Idioma** | Português (Brasil) |
| **Segmentação geográfica** | Taubaté + São José dos Campos, **raio de 20 km** de cada centro (nível de campanha). Sem segmentação por idioma adicional. |
| **Orçamento** | R$ 50,00/dia (~R$ 1.500/mês) |
| **Lance** | **Maximizar cliques** (sem histórico) → após ~15 conversões: maximizar conversões → depois Target CPA R$ 60–100 |
| **Data de início** | [definir] · **Data de término**: não definir |
| **Rotações de anúncios** | Otimizar (padrão) |
| **Conversões** | `click_whatsapp` importada do GA4 → marcar como **Primária** |
| **Enhanced Conversions** | **Ativado** |
| **Janela de conversão** | 30 dias |
| **Modelagem de dados** | Ativada |

**Template de tracking (nível de campanha):**

```
?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={adgroupid}&utm_term={keyword}
```

---

## 4. Ordem de criação (checklist passo a passo)

1. **Antes de tudo:** GA4 + GTM publicados na LP; conversão `click_whatsapp` validada (ver `05-checklist-lancamento.md`).
2. Criar conta Google Ads (ou usar a do Enzo) → **faturamento** (cartão/banco do cliente).
3. Criar **ação de conversão**: Google Ads → Conversões → Nova → Importar → GA4 → `click_whatsapp` → **Primária**.
4. Criar campanha com as configurações da seção 3.
5. Criar 2 grupos de anúncios e adicionar keywords (importar CSV ou colar).
6. Adicionar **negativas de campanha** (nível de campanha, ver CSV) + criar **lista de negativas compartilhada** com os 7 temas para reuso (conta).
7. Adicionar **RSA** (ver `03-rca-assets.md`) — fixar (pin) headlines geográficas na posição 1 de cada grupo.
8. Adicionar **extensões** (ver `04-extensoes.md`).
9. Definir **URL final** = URL da LP (ex.: `https://www.enzo-mariotto.com.br/`).
10. **Revisão final** + validação (checklist) antes de ativar.

---

## 5. Fases de lance

| Fase | Condição | Lance |
|---|---|---|
| Lançamento (semanas 1–2) | Sem histórico | **Maximizar cliques** |
| Acúmulo (semanas 3–4) | ~10–15 conversões | **Maximizar conversões** |
| Otimização (mês 2+) | 15+ conversões / 30 dias | **Target CPA R$ 60–100** |

Revisão semanal: termos de pesquisa → novas negativas; CTR, CPC, CPL vs. alvo.

---

## 6. Notas

- **Não** usar Campanhas de performance máx. nem expansão de anúncios no mês 1 (manter controle).
- Marca Enzo Mariotto: **sem campanha de marca no mês 1** (sem demanda de marca ainda).
- Acompanhar relatório de termos de pesquisa toda semana (7 dias de dados).
- Gate do mês 1: CPL real vs. alvo (R$ 60–100), taxa de resposta no WhatsApp e agendamentos → decidir manter/expandir/dividir campanhas.
