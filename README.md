# 📱 iGreen Telecom - Landing Page de Portabilidade (Alta Conversão)

Landing page moderna, rápida e 100% responsiva (mobile-first), desenvolvida especificamente para campanhas de **Meta Ads (Instagram e Facebook Ads)** e tráfego direto para a **iGreen Telecom**, com foco exclusivo em gerar solicitações de portabilidade móvel e fechamento assistido no **WhatsApp**.

---

## 🌟 Principais Recursos & Seções

1. **Identidade Visual Oficial**:
   - Paleta de cores tecnológica da marca (Verde Neon `#00E676`, Dark Glassmorphism e contrastes limpos).
   - Logotipo oficial da iGreen Telecom e ilustrações 3D de alta definição.
   - Design responsivo adaptado para qualquer celular, tablet e computador.

2. **Primeira Dobra (Hero) Persuasiva**:
   - Headline com alto impacto: *"Troque sua operadora e receba 11GB de internet grátis"*.
   - Subtítulo focado nos 30 dias grátis, 5G e manutenção do número.
   - Badges de alto destaque (11GB grátis, Chip Grátis e Mantenha seu número).
   - Botão de rolagem suave com animação de pulso para o formulário.

3. **Bloco de Autoridade (Márcio Garcia)**:
   - Apresentador e embaixador oficial da marca.
   - VSL com player de vídeo no formato vertical 9:16.

4. **Seção "Conectado em Todo o Brasil" (Cobertura Nacional)**:
   - 4 cards reforçando segurança de sinal, tecnologia 5G, estabilidade e uso em viagens mantendo o número.

5. **8 Benefícios Exclusivos**:
   - 11GB de internet nos 30 dias
   - Rede 5G ultrarrápida
   - WhatsApp ilimitado sem descontar da franquia
   - Ligações ilimitadas para todo o Brasil
   - Internet acumulativa (não expira)
   - iGreen Club com descontos em farmácias e lojas parceiras
   - Sem fidelidade e sem multas
   - eSIM digital com ativação imediata

5. **Quebra de Objeções ("Por que fazer sua portabilidade?")**:
   - Ênfase em *"Você não precisa trocar de número"*.
   - Checklist com garantia de manter contatos, WhatsApp e transição sem interrupção de sinal.

6. **Como Funciona em 3 Passos**:
   - Jornada didática e sem atritos para o cliente.

7. **Formulário de Conversão Inteligente**:
   - Campos: Nome completo, WhatsApp, Número que deseja manter, Operadora atual, Tipo de Chip (Físico ou eSIM) e CEP.
   - Máscaras automáticas de digitação para telefone e CEP.
   - Checkbox inteligente *"É o mesmo número do WhatsApp"* (preenche o número no clique).
   - Integração com a API do ViaCEP (identifica automaticamente bairro, cidade e estado).
   - Texto de conformidade com segurança de dados (LGPD).

8. **Geração Automática de Mensagem no WhatsApp**:
   - Ao submeter, abre o WhatsApp com a mensagem padronizada:
     ```
     Olá, quero fazer minha portabilidade.

     Nome: [Nome]
     WhatsApp: [WhatsApp]
     Número atual: [Numero]
     Operadora atual: [Operadora]
     Tipo de chip: [Tipo]
     CEP: [CEP]

     Aguardo a confirmação para concluir minha ativação.
     ```

9. **Barra Fixa Inferior no Mobile (Sticky CTA)**:
   - Acompanha o usuário no celular após a primeira dobra para garantir máxima conversão.

10. **Modais de Termos de Uso e Política de Privacidade**:
    - Abertura rápida sem redirecionar o usuário para fora da página de vendas.

---

## ⚙️ Como Configurar o WhatsApp do Licenciado

Existem duas formas fáceis de definir para qual WhatsApp os clientes serão enviados:

### Forma 1: Definir o Número Padrão no Código
Abra o arquivo `assets/js/main.js` e altere a linha 10:

```javascript
const CONFIG = {
  DEFAULT_WHATSAPP: '553598754516', // WhatsApp configurado
  VIDEO_URL: 'https://imagenscarregadas.cloudmindsapp.com/wp-content/uploads/2026/09/videoplayback.mp4'
};
```

### Forma 2: Passar na URL do Anúncio (Ideal para Múltiplos Afiliados)
Você pode enviar o link com o parâmetro `?tel=` no final. A página detectará e enviará as mensagens diretamente para o número indicado:

```
https://seusite.com.br/?tel=5511999999999
```

Também aceita os parâmetros `?wa=`, `?whatsapp=` ou `?ref=`.

---

## 📊 Como Adicionar o Meta Pixel (Facebook Ads)

Para rastrear visualizações de página e conversões (`Lead`):

1. Abra o arquivo `index.html`.
2. Cole o código base do seu **Meta Pixel** logo antes do fechamento da tag `</head>`.
3. O script `assets/js/main.js` já possui o disparador automático do evento `fbq('track', 'Lead')` ao enviar o formulário!

---

## 📂 Estrutura de Arquivos

```
Igreen Telecom/
├── index.html                  # Estrutura principal da Landing Page
├── README.md                   # Documentação do projeto
├── assets/
│   ├── css/
│   │   └── style.css           # Estilização visual, animações e glassmorphism
│   ├── js/
│   │   └── main.js             # Lógica de máscaras, ViaCEP e WhatsApp
│   └── images/
│       ├── logo.png            # Logo oficial da iGreen Telecom
│       ├── igreen-hero-banner.jpg # Banner visual oficial
│       ├── marcio-garcia.png   # Foto do embaixador Márcio Garcia
│       ├── phone-hero.webp     # Celular 3D com interface iGreen
│       └── vsl-thumb.jpg       # Thumbnail do vídeo VSL
```

---

## 🚀 Como Visualizar e Publicar

1. **Visualizar Localmente**: Basta abrir o arquivo `index.html` com duplo clique em qualquer navegador (Google Chrome, Edge, Safari).
2. **Hospedagem**: Como é um projeto estático ultra-otimizado (HTML, CSS e JavaScript puros sem servidor backend), você pode hospedá-lo gratuitamente em plataformas como **Vercel**, **Netlify**, **GitHub Pages**, ou em hospedagens convencionais (Hostinger, cPanel, Locaweb) simplesmente enviando a pasta completa via FTP ou Git.

