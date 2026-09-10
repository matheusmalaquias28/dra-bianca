# Dra. Bianca de Franco — Site institucional

Site institucional da Dra. Bianca de Franco (Dermatologia).
**Fase 1:** página inicial provisória em formato de *link page*, com os canais de
agendamento e as redes oficiais. O site institucional completo virá depois,
reaproveitando a mesma base de marca e design tokens.

---

## Stack

| Camada | Escolha | Por quê |
| --- | --- | --- |
| Framework | **Next.js 16** (App Router, Turbopack) | Deploy nativo na Vercel, renderização estática da home |
| UI | **React 19** + **TypeScript** (strict) | Tipagem forte no config de links e nos componentes |
| Estilo | **Tailwind CSS v4** | Tokens de marca declarados em `@theme`, zero config file |
| Animação | **Motion** (`motion/react`) | Entrada em cascata e micro-interações; a rotação do selo é CSS puro |
| Fontes | `next/font/local` | Flatline e Manrope auto-hospedadas — nenhuma requisição externa |

A página é **100% estática** (`○ Static` no build) e não faz nenhuma requisição a
domínio de terceiros em runtime.

---

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run start    # serve o build
npm run lint
```

---

## Publicando na Vercel

```bash
git init
git add .
git commit -m "feat: link page provisória"
git branch -M main
git remote add origin git@github.com:<usuario>/<repo>.git
git push -u origin main
```

Depois, em vercel.com → **Add New… → Project** → importe o repositório.
A Vercel detecta o Next.js sozinho; **não há variáveis de ambiente** a configurar.

Antes de apontar o domínio, troque `url` em `src/config/site.ts` pelo domínio
final — é ele que alimenta as tags Open Graph.

---

## Onde mexer

### Links dos botões

Tudo vive em **`src/config/site.ts`**. Para adicionar, remover ou reordenar um
botão, basta editar o array `links` — a página se reorganiza sozinha.

```ts
{
  id: "ipanema",
  label: "Clínica Ipanema",
  hint: "Agendar pelo WhatsApp",
  href: "https://wa.me/message/...",
  kind: "booking",        // "booking" | "featured" | "social"
  icon: "whatsapp",
}
```

Quando o site oficial estiver no ar, o card "Meu site" vira um link normal:
remova `comingSoon: true` e preencha o `href`.

### Cores

Definidas como tokens em `src/app/globals.css`, dentro de `@theme`, seguindo o
manual de marca:

| Token | Hex | Pantone |
| --- | --- | --- |
| `espresso` | `#48372a` | 7533 C |
| `gold` | `#b18649` | 7551 U |
| `sand` | `#d0cac2` | 7534 U |
| `cloud` | `#f2f2f2` | — |

Use como classe do Tailwind: `text-espresso`, `bg-sand`, `border-gold/40`…

### Tipografia

- **Flatline** (Up Up Creative) — títulos e rótulos → classe `font-display`
- **Manrope Variable** (SIL OFL 1.1) — textos e interface → padrão do `body`

Os `.otf` originais foram convertidos para `.woff2` (≈40% menores) em
`src/app/fonts/`. Flatline é uma fonte licenciada: mantenha a licença da cliente
em dia e não redistribua os arquivos fora deste projeto.

---

## Estrutura

```
src/
├── app/
│   ├── fonts/          Flatline (.woff2) + Manrope Variable + setup next/font
│   ├── globals.css     Design tokens (@theme) e estilos base
│   ├── icon.svg        Favicon
│   ├── layout.tsx      Metadata, SEO, Open Graph
│   └── page.tsx        Link page
├── components/
│   ├── brand/          Logotipo, anel do selo e monograma como componentes SVG
│   ├── icons/          Ícones de UI e redes sociais (glifos sólidos)
│   ├── AvatarRing.tsx  Retrato circular + anel de gradiente giratório
│   ├── BrandSeal.tsx   Selo da marca (fora de uso na home — ver acima)
│   ├── LinkCard.tsx    Card de link + estado "em breve"
│   ├── Reveal.tsx      Entrada em cascata
│   └── SocialTile.tsx  Tile de rede social
└── config/
    └── site.ts         Links e dados do site  ← comece por aqui
```

---

## Detalhes de implementação

- **Retrato com anel de stories** — o anel é um `conic-gradient` com as cores do
  Instagram, desenhado num elemento próprio que gira em 9s por trás da foto:
  o degradê se move, o retrato fica parado. `@keyframes` CSS na GPU, sem
  JavaScript. Trocar a foto = substituir
  `public/brand/dra-bianca-avatar.webp` (quadrada, rosto no terço superior).
- **Selo giratório da marca** — `BrandSeal.tsx` continua no projeto, pronto para
  o site institucional: o anel de texto gira e o monograma fica fixo no centro,
  para o "BF" nunca aparecer de cabeça para baixo. Hoje não está em uso na home.
- **SVG como componente** — os traçados originais viraram componentes React que
  herdam `currentColor`, então a cor da marca muda com uma classe do Tailwind.
- **Selo otimizado** — o `circle-logo.svg` original tinha um PNG de 2,4 MB
  embutido, redundante com os vetores. Removido: **3,2 MB → 13 KB**, sem
  diferença visual perceptível.
- **Acessibilidade** — foco visível dourado, `aria-label` nos links de rede
  social, contraste do texto principal acima de 4.5:1 e `prefers-reduced-motion`
  respeitado (a rotação e o brilho param).
- **Links limpos** — os parâmetros de rastreio das URLs de compartilhamento
  (`igsh`, `_t`, `_r`) foram removidos; os links funcionam igual e ficam legíveis.
"# dra-bianca" 
