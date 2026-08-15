# Checklist de Lançamento — Enzo Mariotto

**Base:** `06-mensuracao/measurement-plan.md` (validação) + `07-revisao/review-final.md`
**Usar:** dia do lançamento, antes de ativar o tráfego pago.

---

## 0. Dependências do cliente (Checkpoint 15)

- [ ] **WhatsApp comercial** confirmado e link `wa.me` ativo (número real no CONFIG da LP).
- [ ] **Endereços exatos** Taubaté (Jd. das Nações) e SJC (Aquarius).
- [ ] **Foto profissional** do Enzo/consultório (hero + seção Sobre) — senão manter placeholder.
- [ ] **Depoimentos autorizados** (CFN) — senão remover/marcar a seção como pendente.
- [ ] **Credenciais** exibidas corretas: CRN-3 66906 ✓ (já recebido).

> Regra do review-final: **sem WhatsApp e endereços não se lança.** Foto/depoimentos impactam autoridade (CPL), mas podem seguir como placeholder no lançamento mínimo viável — decidir com Lucas.

---

## 1. Landing Page (antes de publicar)

- [ ] `WHATSAPP_NUMBER` preenchido em `js/main.js` (CONFIG) e teste do link `wa.me` em desktop + mobile real.
- [ ] Testar em **375px** (mobile): hero, CTA flutuante, FAQ, rodapé — sem overflow horizontal.
- [ ] Dark mode e reduced motion funcionais.
- [ ] Lighthouse: LCP < 1.5s (placeholder não usa imagem), CLS ≈ 0, acessibilidade ≥ 90.
- [ ] Meta tags/OG/canonical apontando para o domínio real de produção.
- [ ] `robots.txt` e `sitemap.xml` referenciados (se aplicável).
- [ ] Substituir textos placeholder (depoimentos, endereços, foto) pelos dados confirmados.

---

## 2. GTM

- [ ] Container `enzo-mariotto-google-ads` criado e **publicado** na versão correta.
- [ ] Tags: `GA4 - click_whatsapp`, `GA4 - phone_click`, `GA4 - view_landing_page`.
- [ ] Triggers: `Click - WhatsApp` (URL contém `wa.me` ou `whatsapp.com`), `Click - Phone` (`^tel:`), `Page View - LP`.
- [ ] Variáveis `DLV - cta_location` e `DLV - utm_*` configuradas.
- [ ] **Apenas 1 tag** para `click_whatsapp` (sem duplicidade GA4/Ads direto).

---

## 3. GA4

- [ ] Property + data stream web criados.
- [ ] `click_whatsapp` marcado como **key event / conversão**.
- [ ] `phone_click` e `view_landing_page` como eventos (não key events).

---

## 4. Google Ads

- [ ] Conversão `click_whatsapp` importada do GA4 e marcada como **Primária**.
- [ ] **Enhanced Conversions** ativado (status "Ativo" ou "Sem dados" — aceitável sem tráfego).
- [ ] Template de tracking UTM aplicado na campanha.
- [ ] Keywords importadas (2 grupos) — conferir contagem: A=17, B=16.
- [ ] Negativas de campanha aplicadas (38 termos / CSV) + lista compartilhada dos 7 temas.
- [ ] RSAs completos (15 headlines + 4 descrições) e **pins** geográficos na posição 1.
- [ ] Extensões adicionadas (sitelinks, callouts, snippet, chamada/local se disponível).
- [ ] Segmentação geográfica: Taubaté + SJC, raio 20 km. Idioma pt-BR. Parceiros desmarcados.
- [ ] Lance: **Maximizar cliques** no início.

---

## 5. Validação fim-a-fim (obrigatório)

1. [ ] GA4 DebugView: abrir LP com UTMs → clicar WhatsApp → confirmar `click_whatsapp` com `cta_location` e `utm_*`.
2. [ ] Teste em **dispositivo móvel real**: botão sticky, link `tel:`, clique no WhatsApp.
3. [ ] GTM Preview: confirmar disparo no clique de telefone (`phone_click`).
4. [ ] Google Ads → Conversões: `click_whatsapp` listada como primária.
5. [ ] Enviar um clique de teste no anúncio (após ativar) e conferir o parâmetro na URL de destino e no GA4.

---

## 6. Pós-lançamento (semana 1)

- [ ] Revisar termos de pesquisa no dia 2 e dia 7 → adicionar negativas.
- [ ] Monitorar CTR, CPC, impressões, CPL real vs. alvo (R$ 60–100).
- [ ] Alinhar SLA de resposta do WhatsApp (< 5 min ideal).
- [ ] Registrar agendamentos/fechamentos para CPL real vs. CAC.

---

## Status final

- [ ] Todos os itens concluídos → **ativar campanha**.
