# Enzo Mariotto — Entrega de Construção (LP + Google Ads)

Pacote criado em **2026-08-04** a partir dos recursos recebidos do cliente.
Base: documentos aprovados em `opensquad/clientes/enzo-mariotto/` (checkpoints 01–15).

```
enzo-mariotto/
├── landing-page/          ← Site estático da LP (pronto para hospedar)
│   ├── index.html
│   ├── css/styles.css
│   ├── js/main.js
│   └── assets/logo/       ← logo-preto.png · logo-branco.png · logo-vetorizado.ai
└── google-ads/            ← Implementação da campanha
    ├── 01-campanha-setup.md
    ├── 02-keywords.csv          (71 linhas — 2 grupos + 38 negativas)
    ├── 03-rca-assets.md
    ├── 04-extensoes.md
    └── 05-checklist-lancamento.md
```

---

## ✅ Dados já confirmados (recursos recebidos)

| Item | Valor |
|---|---|
| Nome | Enzo Soares Mariotto |
| Registro | **CRN-3 66906** — Nutricionista (CERTIDÃO 290718/26) |
| Logos | preto + branco (PNG) + vetorizado (.ai) |
| Comunicação | Resolução CFN 599/2018 (sem promessas) |
| Oferta | Pacote de 3 consultas — R$ 799 |

> O PDF "NUTRI ENZO MARIOTTO - CONSULTAS.pdf" é imagem escaneada e não pôde ser lido por este modelo — verificar manualmente se contém a tabela de preços para confirmar o valor divulgado.

---

## ⚠️ LUGARES PARA PREENCHER ANTES DE PUBLICAR

Tudo está concentrado em **um único lugar**: `landing-page/js/main.js` → `CONFIG`:

```js
WHATSAPP_NUMBER: "55XXXXXXXXXX",  // ← número comercial (DDI+DDD+número)
WHATSAPP_MESSAGE: "Olá! ...",     // ← mensagem pré-preenchida
SITE_URL: "https://www.enzo-mariotto.com.br/",  // ← domínio real
```

Outros pendentes, com local marcado no código:

| Pendência | Onde | Como |
|---|---|---|
| **WhatsApp número** | `js/main.js` CONFIG | único ponto; todos os botões herdam |
| **Endereços** | `index.html` footer + JSON-LD | substituir placeholders |
| **Foto hero** | `index.html` seção hero | comentário mostra o `<picture>` pronto |
| **Foto "Sobre"** | `index.html` seção autoridade | substituir placeholder "EM" |
| **Depoimentos** | `index.html` seção depoimentos | ⚠️ são EXEMPLOS — substituir por depoimentos REAIS autorizados (CFN) antes do ar |
| **Telefone (ext. chamada)** | `google-ads/04-extensoes.md` | a confirmar |
| **CFN resolution** | LP mostra "CFN 599/2018" (copy aprovada); os docs de LP mais recentes citam "CFN 856/2026" | confirmar com Lucas qual selo usar |

---

## LP — Resumo técnico

- Estático (HTML/CSS/JS puro), mobile-first, sem build — basta hospedar os arquivos.
- Conversão = clique no WhatsApp; todos os botões têm `data-cta-location` (hero, header, pacote, como-funciona, autoridade, faq, footer, sticky).
- Data layer de UTMs + evento `click_whatsapp` prontos para GTM/GA4 (segue `measurement-plan.md`).
- Dark mode, reduced motion, schema.org (LocalBusiness + FAQPage), acessibilidade WCAG AA.
- Design system: Inter, verde clínico (#16a34a), azul ciência (#0ea5e9), grid mobile-first.

**Pendências de infra que não estão neste pacote:** domínio, hospedagem, Google Business Profile, conta Google Ads, GTM/GA4 do cliente.

---

## Google Ads — Resumo

- 1 campanha Search única (R$ 50/dia ≈ R$ 1.500/mês), 2 grupos por praça.
- Keywords prontas para import em massa (`02-keywords.csv`), negativas dos 7 temas.
- RSA completos com contagem de caracteres e pins geográficos (`03-rca-assets.md`).
- Extensões, fases de lance e checklist de lançamento nos demais arquivos.
- NÃO ativar antes do checklist (`05-checklist-lancamento.md`) e antes do WhatsApp/endereços.
