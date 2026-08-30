# Especificação técnica — Plataforma de autenticação e bloqueio de spoofing

**Status:** rascunho para análise da equipe (não implementado)  
**Data:** 30 de agosto de 2026  
**Público:** produto, desenvolvimento, operação de e-mail/DNS e comercial  
**Produto provisório:** Blindagem de Domínio (nome comercial a definir)  
**Referência de mercado:** Sendmarc, EasyDMARC, PowerDMARC  

Este documento descreve **o que construir**, **como opera no nosso stack** (Hostinger, Skymail, Registro.br) e **o que não prometemos**. Serve para decisão de escopo, não é um guia de implantação para o cliente final.

---

## 1. Resumo executivo

Queremos oferecer aos clientes de desenvolvimento web e e-mail uma plataforma que:

1. Diagnostica a proteção do domínio (score + semáforo).
2. Implanta e opera SPF, DKIM e DMARC.
3. Mostra quem tentou enviar e-mail usando o domínio do cliente.
4. Sobe a política até o bloqueio (`p=reject`), sem quebrar o e-mail legítimo.

**O bloqueio não é um filtro na caixa de entrada do cliente.**  
É a mesma mecânica da Sendmarc: os servidores de destino (Gmail, Outlook, Yahoo) leem o DMARC do domínio e **recusam** a mensagem forjada. Nós não interceptamos o SMTP do criminoso.

**Posição competitiva:** não vamos competir com a Sendmarc no mercado global. Vamos vender **serviço gerenciado na carteira que já operamos** (site + e-mail + acesso ao Registro.br). Isso é mais fácil de entregar e mais difícil de copiar do que um scanner público.

**Recomendação de produto:** app próprio (multi-tenant MSP), separado do site institucional de cartas de fiança. Mesmo stack do repositório atual (React + FastAPI + MongoDB), outro frontend/rota e outra marca.

---

## 2. Problema que resolvemos

O SMTP foi criado sem verificação de identidade. Qualquer pessoa com conhecimento básico consegue enviar um e-mail com `From:` no domínio do cliente (`financeiro@cliente.com.br`). Isso se chama **email spoofing** / personificação de marca.

Consequências típicas na nossa carteira:

- Boleto falso em nome da empresa do cliente.
- Phishing para fornecedores e consumidores.
- Queda de reputação e piora de entrega do e-mail **legítimo**.

A correção padrão da indústria são três registros TXT no DNS:

| Protocolo | Função | Analogia |
|---|---|---|
| **SPF** | Lista pública de IPs/servidores autorizados a enviar pelo domínio | Autorização de remetente |
| **DKIM** | Assinatura criptográfica invisível no e-mail; chave pública no DNS | Lacre de autenticidade |
| **DMARC** | Diz o que fazer se SPF/DKIM falharem; gera relatórios | Política de bloqueio + câmera |

Sem DMARC, SPF e DKIM **não bloqueiam** spoofing. Só ajudam na reputação. O botão de bloqueio é a política DMARC.

---

## 3. O que o produto é e o que não é

### 3.1 É

- Plataforma de **cibersegurança de domínio corporativo**.
- Operação gerenciada (nós implantamos e acompanhamos).
- Painel para o cliente ver score, política e tentativas de abuso.
- Painel MSP para a equipe ver a carteira inteira.

### 3.2 Não é

- Antivírus / filtro da caixa de entrada pessoal.
- Firewall que “segura o e-mail no caminho”.
- Proteção contra domínio **parecido** (`cliente.co` vs `cliente.com.br`) — isso é lookalike, outro produto.
- Publicação mágica no Registro.br sem um passo humano (não há API pública de zona DNS).
- BIMI com certificado VMC no MVP (logo na caixa de entrada; não bloqueia golpe; tem custo de CA).

### 3.3 Promessas comerciais permitidas

- Implantar autenticação no domínio que hospedamos.
- Mostrar quem tentou usar o nome da empresa (após `rua=` ativo).
- Chegar a bloqueio total (`p=reject`) sem quebrar o e-mail, **se** a promoção de política for segura.
- Melhorar reputação/entrega do e-mail legítimo.

### 3.4 Promessas proibidas

- “Antivírus da caixa de entrada”.
- “Bloqueio no mesmo dia” em domínio com vários disparadores não mapeados.
- Barrar imitação visual de domínio.
- Publicar zona no Registro.br 100% por API.

---

## 4. Personas e jornadas

### 4.1 Operador interno (nós)

Técnico que já acessa Hostinger, Skymail e/ou Registro.br do cliente.

**Jornada de onboarding (uma vez por domínio):**

1. Cadastra o cliente e o domínio no painel MSP.
2. Informa o provedor de e-mail (Hostinger, Skymail, ambos, outro).
3. O sistema varre o DNS e mostra o gap.
4. O sistema gera os registros exatos.
5. O operador publica no DNS autoritativo (Registro.br, hPanel ou Skymail).
6. O sistema revalida e marca “implantado”.
7. Relatórios DMARC passam a chegar na nossa caixa `rua`.

**Jornada contínua:**

- Semanalmente revisa remetentes novos.
- Quando todos os envios conhecidos autenticam, promove `none` → `quarantine` → `reject` **no nosso DNS** (via CNAME), sem reabrir o Registro.br.

### 4.2 Cliente final (empresa que nos contrata)

Dono ou financeiro. Não entende DNS.

**O que ele vê:**

- Score e risco (Baixo / Moderado / Alto).
- Status em linguagem simples: Monitorando / Quarentena / Bloqueio total.
- Relatório: “esta semana houve N tentativas; M foram tratadas”.
- PDF/e-mail mensal (fase posterior).

Ele **não** edita TXT. Se o DNS não for nosso, ele só autoriza o operador.

### 4.3 Comercial / CS

Usa o score e o relatório mensal como argumento de upsell no pacote de e-mail/hospedagem.

---

## 5. Como a Sendmarc faz (e o que copiamos)

A Sendmarc não reescreve o TXT `_dmarc` do cliente a cada mudança. Ela pede **delegação por CNAME**:

```text
_dmarc.cliente.com.br.  CNAME  cliente.com.br.dmarc.sdmarc.net.
```

Quem consulta o DMARC do cliente segue o CNAME e lê um TXT **hospedado pela Sendmarc**. Trocar `p=none` por `p=reject` é update no DNS *deles*.

Eles também:

- Colocam o `rua=` apontando para a caixa deles.
- Recebem XML diário (Gmail, Microsoft, Yahoo, etc.).
- Parseiam e mostram remetentes, volumes, pass/fail.
- Orientam a promoção de política.

**O que copiamos de arquitetura:**

1. Delegação CNAME do `_dmarc` para zona **nossa**.
2. Inbox própria de relatórios agregados (RUA).
3. Parser XML + painel.
4. Motor de política com promoção segura.

**O que não copiamos no MVP:** BIMI/VMC, intel global de ameaças, marketplace de milhares de ESPs, white-glove enterprise.

---

## 6. Realidade do nosso stack

Este é o ponto que decide automação vs. operação assistida.

### 6.1 Registro.br

- Temos acesso à conta do cliente em muitos casos.
- A zona DNS **só é editável** se o domínio usa o DNS do próprio Registro.br (`a.dns.br`, `b.dns.br`, …) e o modo avançado está ativo.
- Se o NS aponta para Hostinger, Cloudflare ou Skymail, o login no Registro.br **não publica** TXT.
- **Não há API pública de zona** para conta comum. EPP é de registrador credenciado.
- Conclusão: publicação inicial = **passo humano** (nós). Isso não impede o produto, se o CNAME for criado uma vez.

### 6.2 Hostinger Email

Registros oficiais típicos:

```text
; MX
cliente.com.br.  MX  10 mx1.hostinger.com.
cliente.com.br.  MX  10 mx2.hostinger.com.

; SPF (um único TXT v=spf1 no apex)
cliente.com.br.  TXT  "v=spf1 include:_spf.mail.hostinger.com ~all"

; DKIM (CNAME)
hostingermail-a._domainkey  CNAME  hostingermail-a.dkim.mail.hostinger.com.
hostingermail-b._domainkey  CNAME  hostingermail-b.dkim.mail.hostinger.com.
hostingermail-c._domainkey  CNAME  hostingermail-c.dkim.mail.hostinger.com.
```

Se o NS está na Hostinger, o hPanel (“Connect automatically”) já aplica MX + SPF + DKIM. **DMARC costuma continuar manual.**  
A API de e-mail da Hostinger cobre caixas/envio; **não substitui** a operação de zona no Registro.br.

### 6.3 Skymail / Skynova

```text
; SPF
cliente.com.br.  TXT  "v=spf1 include:spf.skymail.net.br -all"

; DKIM
; gerado no painel (Envios SMTP). Se o DNS for Skymail, pode aplicar sozinho.
; Se o DNS for externo, o painel devolve tipo + valor para colar.

; DMARC inicial sugerido por eles
_dmarc.cliente.com.br.  TXT  "v=DMARC1; p=none;"
```

Há API admin (caixas, domínios, JWT). DKIM/DMARC **não são o fluxo principal da API**. Na prática: gerar no painel + gravar no DNS.

### 6.4 Matriz de automação

| Tarefa | Automático? | Como |
|---|---|---|
| Score DNS de qualquer domínio | Sim | Lookups públicos |
| Gerar SPF Hostinger e/ou Skymail | Sim | Templates |
| Mesclar SPF de vários remetentes | Sim (com cuidado) | Um único TXT; máx. 10 lookups |
| Ligar DKIM Hostinger se DNS = Hostinger | Quase | hPanel / registros conhecidos |
| Ligar DKIM Skymail | Semi | Painel Skymail + DNS |
| Publicar `_dmarc` no Registro.br | Manual (1 vez) | Sem API de zona |
| Mudar política depois do CNAME | **Sim** | Nosso DNS |
| Ver tentativas de spoofing | Sim, após RUA | Parser XML |
| BIMI + certificado VMC | Não no MVP | CA paga |

### 6.5 Regra de ouro do DNS autoritativo

O sistema deve **sempre** resolver `NS` do domínio e classificar o alvo de publicação:

| NS detectado | Onde publicar |
|---|---|
| `*.dns.br` | Zona avançada do Registro.br |
| Hostinger (`*.hostinger.com` / equivalentes) | hPanel → DNS |
| Skymail | Painel Skymail (se hospedar DNS) |
| Cloudflare / outro | Checklist genérico (fase 1) ou “fora do pacote gerenciado” |

Publicar no lugar errado é o erro operacional nº 1.

---

## 7. Arquitetura alvo

```text
                    ┌─────────────────────────────────────┐
                    │         Painel Web (React)          │
                    │  Cliente  │  MSP (equipe)           │
                    └─────────────────┬───────────────────┘
                                      │ HTTPS / JWT
                    ┌─────────────────▼───────────────────┐
                    │           API (FastAPI)             │
                    │  scan │ policies │ reports │ users  │
                    └─┬───────────┬─────────────┬─────────┘
                      │           │             │
           ┌──────────▼──┐  ┌─────▼─────┐  ┌────▼─────────┐
           │ Worker DNS  │  │ Policy    │  │ Ingest RUA   │
           │ (lookups)   │  │ Engine    │  │ (XML/gzip)   │
           └─────────────┘  └─────┬─────┘  └────┬─────────┘
                                  │             │
                           ┌──────▼──────┐  ┌───▼────────────┐
                           │ DNS nosso   │  │ Mailbox rua@   │
                           │ (TXT DMARC  │  │ ou HTTPS rua   │
                           │  hospedado) │  └───┬────────────┘
                           └─────────────┘      │
                                         Gmail / Microsoft / Yahoo
                                         enviam relatórios diários
```

### 7.1 Componentes

| Componente | Responsabilidade |
|---|---|
| **Scanner** | Consulta DNS/HTTPS e devolve score + registros crus |
| **Assistente de implantação** | Gera SPF/DKIM/DMARC/CNAME conforme provedor |
| **Zona hospedada (nós)** | TXT DMARC (e depois TLS-RPT / MTA-STS) por cliente |
| **Policy engine** | `none` / `quarantine` / `reject` + validação de segurança |
| **Ingest RUA** | Recebe, descompacta, parseia, idempotência, agrega |
| **Painel cliente** | Score, política, gráfico simples |
| **Painel MSP** | Carteira, filas, promoção, alertas |
| **Auth** | Admin interno cria tenant; cliente tem usuário limitado |

### 7.2 Relação com o repositório atual

O repo `analysis-S-A` hoje é o site institucional (React CRA + FastAPI + MongoDB).  
**Decisão proposta:** novo app no mesmo monorepo (`frontend-shield/` + rotas `/api/shield`) **ou** repositório separado. Não misturar rotas de marketing de fiança com o produto de segurança.

Stack sugerido (reaproveita o que a equipe já usa):

- Frontend: React, Tailwind, shadcn, Recharts (já no `package.json`).
- Backend: FastAPI, Pydantic v2.
- Banco: MongoDB (já há Motor).
- Auth: JWT + bcrypt (já há dependências).
- DNS: `dnspython` no worker.
- XML: parser padrão (stdlib / `lxml`).

---

## 8. Delegação DMARC (peça central da eficiência)

### 8.1 Fluxo

1. Criamos um identificador estável por domínio, ex.: `cli_8f3a`.
2. No **nosso** DNS (zona `dmarc.empresa.com.br`):

```text
cli_8f3a.dmarc.empresa.com.br.  TXT  "v=DMARC1; p=none; rua=mailto:rua+cli_8f3a@reports.empresa.com.br; fo=1; adkim=r; aspf=r;"
```

3. No DNS **do cliente** (uma vez):

```text
_dmarc.cliente.com.br.  CNAME  cli_8f3a.dmarc.empresa.com.br.
```

4. Trocas de política atualizam só o TXT do passo 2.

### 8.2 Cuidados técnicos

- Alguns registradores (e o modo simples do Registro.br) são chatos com CNAME em `_dmarc`. Precisamos validar na prática em zona avançada. Fallback: TXT direto no cliente (aí cada promoção de política volta a ser edição manual).
- RFC 7489 descreve DMARC como TXT. CNAME para um nome que responde TXT é o padrão de mercado (Sendmarc, Valimail). Testar com `dig TXT _dmarc.cliente.com.br`.
- TTL baixo (300–600s) na zona nossa, para promoção não ficar presa em cache.
- Um CNAME `_dmarc` **não pode** coexistir com TXT `_dmarc` no mesmo nome.

### 8.3 Alternativa se CNAME falhar no Registro.br

Publicar TXT `_dmarc` direto no cliente, com `rua=` nosso. Política muda com novo atendimento. Produto continua viável, menos “um clique”.

---

## 9. Relatórios DMARC (como medimos resultado)

### 9.1 O que chega

Provedores enviam **relatórios agregados (RUA)** em XML, em geral diários, compactados (`.gz` / `.zip`), para o endereço do tag `rua=`.

Não trazem corpo do e-mail. Trazem:

- IP de origem
- volume (`count`)
- domínio do `From:`
- resultado SPF / DKIM
- disposição (`none` / `quarantine` / `reject`)
- alinhamento

Relatórios forenses (RUF) são raros (privacidade). Fora do MVP.

### 9.2 Estrutura (RFC 7489)

```xml
<feedback>
  <report_metadata>
    <org_name>google.com</org_name>
    <report_id>...</report_id>
    <date_range><begin>…</begin><end>…</end></date_range>
  </report_metadata>
  <policy_published>
    <domain>cliente.com.br</domain>
    <p>none</p>
  </policy_published>
  <record>
    <row>
      <source_ip>203.0.113.10</source_ip>
      <count>42</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>fail</spf>
      </policy_evaluated>
    </row>
    <identifiers><header_from>cliente.com.br</header_from></identifiers>
    <auth_results>…</auth_results>
  </record>
</feedback>
```

### 9.3 Ingest

Opções (decidir na implementação da Fase 2):

| Método | Prós | Contras |
|---|---|---|
| **Mailbox IMAP** (`rua@reports…`) | Simples, todo provedor sabe `mailto:` | Precisa de mailbox robusta; volume cresce |
| **HTTPS rua** (`rua=https://…`) | Parse direto na API | Nem todo reporter implementa bem |
| **Híbrido** | `mailto:` + worker que baixa anexos | Mais peças |

**Proposta:** mailbox dedicada + worker a cada 5–15 min. Endereço por tenant (`rua+cli_8f3a@…`) para roteamento.

Idempotência: chave `org_name + report_id`. Relatórios duplicados são ignorados.

### 9.4 Enriquecimento

Por `source_ip`:

- PTR / hostname
- ASN / org (MaxMind ou equivalente)
- Classificação inicial: `hostinger` | `skymail` | `conhecido` | `desconhecido` | `suspeito`

Tabela interna de CIDRs/includes conhecidos (Hostinger, Skymail) reduz falso positivo.

### 9.5 O que o painel mostra

- Volume 30 dias, autenticado vs. falho.
- Top IPs / organizações.
- Tendência após mudança de política.
- Alerta: IP novo que não é Hostinger/Skymail.

Sem RUA o produto só prova que “a chave existe”. **Com RUA prova que o golpe parou.** É o que justifica mensalidade.

---

## 10. Modelo de pontuação (proposta)

Inspirado nos produtos de referência (Imitação / Privacidade / Branding), com peso no que **bloqueia**.

### 10.1 Categorias

**Imitação (peso 70 no score 0–100)** — máx. 5 pontos internos

| Check | Pontos | Critério |
|---|---|---|
| SPF presente e único | 1 | Exatamente um TXT `v=spf1` |
| SPF sintaxe + ≤10 lookups | 1 | Softfail `~all` = parcial (0,5); `-all` = cheio |
| DKIM encontrado | 1 | Seletor conhecido ou descoberto |
| DMARC presente | 1 | TXT/CNAME `_dmarc` válido |
| DMARC enforcement | 1 | `p=quarantine` 0,5; `p=reject` 1; `p=none` 0 |

**Privacidade (peso 20)** — máx. 5

| Check | Pontos |
|---|---|
| TLS-RPT (`_smtp._tls`) | 2,5 |
| MTA-STS (DNS `_mta-sts` + policy HTTPS válida) | 2,5 |

**Branding (peso 10)** — máx. 5

| Check | Pontos |
|---|---|
| BIMI TXT | 2 |
| Certificado VMC válido | 2 |
| SVG/logo acessível | 1 |

NS / MX entram como **selos de infraestrutura** (verde/vermelho), não como score de segurança. Domínio sem MX ainda pode ser spoofado no `From:`.

### 10.2 Semáforo geral

| Score | Risco | Copy (cliente) |
|---|---|---|
| 80–100 | Baixo risco | E-mails protegidos contra personificação. |
| 50–79 | Risco moderado | Há medidas, mas o bloqueio ainda não está completo. |
| 0–49 | Alto risco | Faltam controles; o domínio pode ser usado em golpes. |

### 10.3 Cores por registro

- **Verde:** presente e alinhado à boa prática.
- **Laranja:** presente com falha (SPF com 2 registros, `+all`, >10 lookups, DMARC sem `rua`).
- **Vermelho:** ausente ou inválido.

A fórmula acima é **proposta**. A equipe pode calibrar com 10–20 domínios reais da carteira antes de ir a produção.

---

## 11. Descoberta de DKIM

DKIM não tem um único hostname. A chave fica em `{seletor}._domainkey.dominio`.

Ordem de busca do scanner:

1. Seletores do provedor informado (Hostinger: `hostingermail-a/b/c`; Skymail: o gerado no painel, se soubermos).
2. Seletores comuns: `default`, `google`, `selector1`, `selector2`, `k1`, `s1`, `s2`, `dkim`, `mail`.
3. Fase 2: seletores vistos em `auth_results` dos XMLs.

Se nada for encontrado, o card DKIM fica vermelho mesmo com o provedor “assinando” — e o assistente pede o seletor do painel Skymail/Hostinger.

---

## 12. SPF: regras que evitam incidente

1. **Um único** registro `v=spf1` no apex. Dois TXT SPF = falha (softfail/neutral imprevisível).
2. Máximo **10 lookups** DNS (`include`, `a`, `mx`, `ptr`, `exists`, `redirect`). Estouro = SPF fail intermitente.
3. Hostinger + Skymail + ESP de marketing + emissor de NF-e estoura fácil. Por isso **SPF flattening** entra na Fase 3 (resolver includes e gravar IPs, com job de refresh).
4. Qualificadores: `~all` no começo (alinhado à Hostinger); `-all` só depois de relatórios limpos. `+all` é proibido no gerador.
5. Se o cliente usa **os dois** provedores:

```text
v=spf1 include:_spf.mail.hostinger.com include:spf.skymail.net.br ~all
```

Só incluir o que realmente envia.

6. Nunca apagar um `include` só porque “não reconhecemos”. O XML RUA decide o que é legítimo.

---

## 13. Motor de política (promoção segura)

Estados: `none` → `quarantine` → `reject` (e rollback).

**Pré-requisitos para `quarantine`:**

- DMARC válido com `rua=` nosso recebendo dados ≥ 7 dias (configurável).
- ≥ 95% do volume classificado como Hostinger/Skymail/conhecido passando SPF **ou** DKIM alinhado.
- Nenhum remetente “conhecido” com falha sistemática.

**Pré-requisitos para `reject`:**

- Mesmas regras, janela ≥ 14 dias em `quarantine` (ou 21 em `none` se o volume for baixo).
- Zero remetente conhecido falhando nos últimos 7 dias.
- Confirmação explícita do operador MSP (não automática no MVP).

**Rollback:** um clique volta `reject` → `quarantine` ou `none` (TTL baixo na zona nossa).

Subir `reject` no escuro é o maior risco do produto: NF-e, CRM e disparo de marketing somem da caixa do destinatário.

---

## 14. Modelo de dados (MongoDB — proposta)

### 14.1 `tenants`

```text
_id, name, slug, brand (logo, cor), plan, created_at
```

### 14.2 `users`

```text
_id, tenant_id, email, password_hash, role: admin | operator | client
```

`admin` / `operator` = equipe. `client` = portal do domínio dele.

### 14.3 `domains`

```text
_id
tenant_id
fqdn
email_provider: hostinger | skymail | both | other
dns_provider: registro_br | hostinger | skymail | cloudflare | other
ns_hosts: [ ]
delegation_id          # cli_8f3a
dmarc_mode: cname | txt_direct
policy: none | quarantine | reject
rua_address
onboarding_status: draft | records_ready | published | verified | monitoring | enforcing
last_scan_at
last_score
```

### 14.4 `scans`

```text
_id, domain_id, at
records: { spf, dkim[], dmarc, mx, ns, tlsrpt, mtasts, bimi }
score, category_scores, risk, raw
```

### 14.5 `dmarc_reports`

```text
_id, domain_id, org_name, report_id, begin, end, received_at
```

### 14.6 `dmarc_rows`

```text
_id, report_id, domain_id, source_ip, count, dkim, spf, disposition
header_from, asn, org, classification, at
```

Índices: `domains.fqdn` unique; `dmarc_reports (org_name, report_id)` unique; `dmarc_rows (domain_id, at)`; `domains.tenant_id`.

---

## 15. API (rascunho)

Prefixo sugerido: `/api/shield`.

| Método | Rota | Quem | Função |
|---|---|---|---|
| `POST` | `/auth/login` | todos | JWT |
| `GET` | `/msp/domains` | operator | Carteira + score |
| `POST` | `/msp/domains` | operator | Cadastra domínio |
| `POST` | `/domains/{id}/scan` | operator, client | Dispara scan |
| `GET` | `/domains/{id}/scan/latest` | operator, client | Último resultado |
| `GET` | `/domains/{id}/setup` | operator | TXT/CNAME gerados |
| `POST` | `/domains/{id}/setup/verify` | operator | Reconsulta DNS |
| `GET` | `/domains/{id}/senders` | operator, client | Agregado RUA |
| `POST` | `/domains/{id}/policy` | operator | Promove política |
| `GET` | `/domains/{id}/report.pdf` | client | Fase 3 |

Scanner também pode expor `POST /public/score` (domínio só, sem PII) para o comercial colar um print. Rate-limit obrigatório.

---

## 16. Telas

### 16.1 Portal do cliente

1. Login.
2. Home do domínio: campo “Nome de domínio” (somente leitura se já vinculado) + score circular + risco + texto + selos NS/MX + cards Imitação / Privacidade / Branding.
3. Relatório detalhado: cada registro, valor atual, o que falta em português claro.
4. Visibilidade: gráfico 30 dias + tabela de origens (fase 2).
5. Relatório por e-mail (fase 3).

Referência visual: os três estados já analisados (score ~95 baixo, ~56 moderado, ~40 alto).

### 16.2 Painel MSP

1. Lista de domínios: score, política, último XML, alerta.
2. Fila: “publicar CNAME”, “validar DKIM Skymail”, “candidato a quarantine”.
3. Detalhe: scan + setup + senders + botões de política (com checklist de promoção).
4. Auditoria: quem mudou política, quando.

### 16.3 Linguagem no UI (cliente)

Evitar jargão solto. Sempre o par técnico + humano:

- `p=none` → **Apenas monitoramento**
- `p=quarantine` → **Quarentena (vai para spam)**
- `p=reject` → **Bloqueio total**

---

## 17. Fases de entrega

### Fase 1 — Ofertável como implantação assistida

**Objetivo:** já mostrar valor e fechar o add-on no pacote de e-mail.

- Auth admin + cliente (login simples; admin cria o usuário).
- Cadastro de domínio + provedor (Hostinger / Skymail / ambos / outro).
- Scanner ao vivo (SPF, DKIM, DMARC, MX, NS, TLS-RPT, MTA-STS, BIMI).
- Score e os 3 cards.
- Gerador de registros + checklist do DNS detectado (Registro.br / Hostinger / Skymail).
- Revalidação pós-publicação.
- Painel MSP da carteira.

**Fora:** ingest XML, CNAME hospedado, promoção automática, BIMI real, flattening.

### Fase 2 — Parece Sendmarc

- Zona nossa + CNAME `_dmarc`.
- Mailbox RUA + worker + parser + gráficos.
- Classificação Hostinger/Skymail/desconhecido.
- Policy engine com checklist e rollback.
- Alertas de remetente novo.

**Pré-requisito de infra (empresa, não código):** domínio nosso com DNS controlado + caixa que aguente XML diário.

### Fase 3 — Escala e acabamento

- SPF flattening + job de refresh.
- MTA-STS hospedado (`mta-sts.` + HTTPS `/.well-known/mta-sts.txt`).
- TLS-RPT delegado.
- White-label (logo, `painel.empresa.com.br`).
- PDF / e-mail mensal.
- “Outro DNS” (Cloudflare) no checklist.

### Fora de roadmap inicial

- BIMI + VMC.
- Lookalike / typosquatting.
- Publicação automática no Registro.br (só faria sentido com credenciamento EPP).
- Integração profunda de API Skymail para gerar DKIM (avaliar se a API evoluir).

---

## 18. Infraestrutura que a empresa precisa (não é software)

| Item | Para quê | Sem isso |
|---|---|---|
| Domínio/zona DNS **nossa** | Hospedar TXT/CNAME de política | Cada `reject` = edição no cliente |
| Mailbox `rua@` (ou equivalente) | Relatórios dos provedores | Painel sem prova de bloqueio |
| Acesso que já temos (Registro.br / Hostinger / Skymail) | Publicar o dia 1 | Continua o checklist — aceitável |
| Marca e URL do painel | Portal do cliente | Produto genérico |
| Política comercial (mensalidade no pacote de e-mail) | Encaixe, não SaaS solto vs. Sendmarc | Dispersão de posicionamento |

Estimativa operacional (ordem de grandeza, não compromisso):

- Onboarding Fase 1: 20–40 min por domínio (scan + DNS + DKIM Skymail).
- Onboarding Fase 2 já com CNAME conhecido: 15–25 min.
- Revisão semanal MSP: poucos minutos por domínio após os relatórios existirem.

---

## 19. Segurança, LGPD e operação

- Relatórios RUA **não** trazem corpo de e-mail; mesmo assim são metadados de tráfego. Tratar como dado de cliente: isolamento por `tenant_id`, retenção definida (sugestão: 13 meses).
- Não guardar senhas de Registro.br/Hostinger/Skymail no produto no MVP. O operador usa o painel do provedor. Se um dia houver OAuth/API, cofre de segredos (nunca Mongo em texto).
- JWT com papéis; cliente só vê os domínios do tenant.
- Rate-limit no scanner público (abuso / DoS de DNS).
- Logs de promoção de política (quem, de→para, timestamp).
- Worker RUA: anexos só XML/gz/zip; rejeitar executáveis; limite de tamanho.
- Ambiente de staging com domínios de teste **nossos**, nunca política `reject` em cliente real sem checklist.

---

## 20. Riscos e mitigações

| Risco | Impacto | Mitigação |
|---|---|---|
| `reject` cedo demais | E-mail fiscal/marketing some | Checklist + confirmação humana + rollback |
| Dois TXT SPF | SPF inválido | Scanner marca laranja; gerador substitui, não adiciona |
| >10 lookups | Fail intermitente | Contador no scan; flattening na Fase 3 |
| Publicar no DNS errado | “Não mudou nada” | Detectar NS e travar o checklist no alvo certo |
| CNAME `_dmarc` recusado no Registro.br | Delegação inviável | Fallback TXT direto |
| DKIM Skymail não publicado | Score mente | Passo “validar” no painel Skymail |
| Caixa RUA cai | Cegueira operacional | Monitorar volume diário; alerta se 0 XML em 48h em domínio ativo |
| Cliente acha que é antivírus | Expectativa errada | Copy fixo no comercial e no onboarding |
| Misturar com o site de fianças | Marca/confusão | App e domínio próprios |

---

## 21. Testes de aceite (quando formos implementar)

### Fase 1

- Scan de domínio com SPF+DKIM+DMARC → score alto, Imitação verde.
- Scan de domínio só com SPF/DKIM, sem DMARC → Imitação baixa, risco alto.
- Dois TXT SPF → SPF laranja e texto de correção.
- Gerador Hostinger produz os 3 CNAMEs `hostingermail-*` e o include oficial.
- Gerador Skymail produz `include:spf.skymail.net.br`.
- Gerador “ambos” produz **um** SPF com os dois includes.
- Detecção de NS Registro.br vs Hostinger escolhe o checklist certo.
- Cliente não vê a carteira de outro tenant.

### Fase 2

- `dig TXT _dmarc.cliente` resolve o TXT hospedado após CNAME.
- Troca de política no painel reflete no `dig` após TTL.
- XML de fixture (Google/Microsoft) é parseado uma vez só (idempotência).
- IP Hostinger/Skymail classificado como conhecido.
- `reject` bloqueado pela API se o checklist falhar.

---

## 22. Decisões em aberto (preencher na reunião)

| # | Decisão | Opções | Sugestão |
|---|---|---|---|
| D1 | Nome comercial e URL do painel | a definir | Nome próprio, não “Sendmarc” |
| D2 | Repo | monorepo atual vs. repo novo | Repo novo **ou** pasta isolada; não misturar com fiança |
| D3 | Provedores no MVP | só Hostinger+Skymail+Registro.br vs. já “outro DNS” | Só os três; “outro” = checklist genérico |
| D4 | Primeira entrega | só Fase 1 vs. Fase 1 + esqueleto Fase 2 | Fase 1 completa + telas/API stub da Fase 2 |
| D5 | Auth | admin cria usuário vs. convite por e-mail | Admin cria (bate com operação atual) |
| D6 | Delegação | CNAME primeiro vs. TXT direto | CNAME, com fallback TXT |
| D7 | Ingest RUA | IMAP vs. HTTPS | IMAP + worker |
| D8 | Encaixe comercial | add-on mensal no e-mail vs. SaaS avulso | Add-on no pacote que já vendemos |
| D9 | White-label | nossa marca só vs. marca do cliente | Nossa marca no MVP |
| D10 | Calibração do score | fórmula §10 vs. ajuste empírico | Empírico em 10–20 domínios reais |

---

## 23. Perguntas para a reunião

1. Quantos domínios da carteira hoje usam DNS do Registro.br vs. Hostinger vs. Skymail? (define o % realmente “gerenciável” no dia 1.)
2. Quantos clientes usam **os dois** e-mails, ou NF-e / RD Station / Mailchimp além do corporativo? (define urgência do flattening.)
3. Já temos um domínio e uma caixa que possam ser `dmarc.` + `rua@` ou isso é compra nova?
4. O comercial vende isso como linha de **segurança** ou como “e-mail profissional que não cai em spam”? (muda copy e tela.)
5. Quem autoriza `reject` no cliente — só técnico, ou CS também?

---

## 24. Conclusão para decisão

**É possível e vale a pena no nosso modelo de negócio**, com três condições:

1. Tratar como **serviço gerenciado da carteira**, não clone público da Sendmarc.
2. Aceitar que o dia 1 no Registro.br é **humano**; a eficiência vem do CNAME + relatórios depois.
3. Não ligar `p=reject` sem XML e sem mapear remetentes.

O protocolo é padrão, barato de consultar e bem documentado. O produto difícil — e o que o cliente paga todo mês — é **operar a política sem derrubar o e-mail e provar que o spoofing parou**.

**Próximo passo sugerido após esta análise:** fechar D1–D10 e autorizar a Fase 1 (código do scanner + painéis + gerador). Infra de CNAME/RUA pode andar em paralelo no operacional.

---

## 25. Referências

- RFC 7208 — SPF  
- RFC 6376 — DKIM  
- RFC 7489 — DMARC  
- RFC 8461 — MTA-STS  
- RFC 8460 — SMTP TLS Reporting  
- BIMI (padrão de grupo da indústria; VMC via CA)  
- Hostinger: SPF `include:_spf.mail.hostinger.com`; DKIM `hostingermail-a/b/c._domainkey`  
- Skymail: SPF `include:spf.skymail.net.br`; DKIM via painel Envios SMTP  
- Registro.br: edição de zona apenas com NS próprio e modo avançado; sem API pública de zona  
- Sendmarc: delegação CNAME de `_dmarc` + RUA hospedado (modelo a replicar, não a copiar em marca)

---

*Documento gerado para análise interna. Nenhuma implementação deste produto foi feita neste repositório no momento da redação.*
