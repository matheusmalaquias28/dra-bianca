# Padrão de link page para médicos — receita técnica e visual

Documento de referência extraído do projeto **Dra. Bianca de Franco** (set/2026).
Serve para recriar a mesma página, com a mesma qualidade, trocando só a marca e
os dados. Escrito para ser colado no início de um projeto novo.

---

## 1. Stack

| Camada | Escolha | Por quê |
| --- | --- | --- |
| Framework | **Next.js 16** (App Router, Turbopack) | Deploy nativo na Vercel, home 100% estática |
| UI | **React 19** + **TypeScript** strict | Tipagem no config de links e nos componentes |
| Estilo | **Tailwind CSS v4** | Tokens em `@theme`, sem arquivo de config |
| Animação | **Motion** (`motion/react`) | Entrada em cascata e micro-interações |
| Fontes | `next/font/local` | Auto-hospedadas, zero requisição externa |
| Deploy | **Vercel** | Detecta o Next sozinho, sem variáveis de ambiente |

### Comando de scaffold

```bash
npx create-next-app@latest <projeto> \
  --ts --tailwind --eslint --app --src-dir \
  --import-alias "@/*" --use-npm --no-turbopack

cd <projeto>
npm install motion clsx tailwind-merge
rm -f public/*.svg src/app/favicon.ico AGENTS.md CLAUDE.md
```

**Meta obrigatória:** o build final tem que sair como `○ (Static)` na rota `/`.
Se aparecer `ƒ (Dynamic)`, algo quebrou a renderização estática.

---

## 2. Design tokens

Tudo em `src/app/globals.css`, dentro de `@theme`. Nada de arquivo de config.

```css
@import "tailwindcss";

@theme {
  /* Paleta — trocar pelos valores do manual de marca do cliente */
  --color-espresso: #48372a;   /* cor principal, texto */
  --color-gold:     #b18649;   /* acento */
  --color-sand:     #d0cac2;   /* neutro médio */
  --color-cloud:    #f2f2f2;   /* fundo */

  --font-display: var(--font-flatline), "Optima", serif;
  --font-sans:    var(--font-manrope), ui-sans-serif, system-ui, sans-serif;

  --ease-brand: cubic-bezier(0.22, 1, 0.36, 1);

  --animate-ring-spin: seal-spin 9s linear infinite;
  --animate-shimmer:   shimmer 2.6s var(--ease-brand) infinite;

  @keyframes seal-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes shimmer {
    0%, 100% { transform: translateX(-120%); opacity: 0; }
    45%      { opacity: 1; }
    100%     { transform: translateX(120%); }
  }
}
```

Uso: `text-espresso`, `bg-sand`, `border-gold/40`, `font-display`,
`animate-ring-spin`. O `/40` de opacidade funciona em qualquer token.

### Base obrigatória

```css
@layer base {
  body {
    background-color: var(--color-cloud);
    color: var(--color-espresso);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  /* Foco visível na cor da marca, em tudo que é clicável */
  :where(a, button):focus-visible {
    outline: 2px solid var(--color-gold);
    outline-offset: 3px;
    border-radius: 0.5rem;
  }

  ::selection {
    background-color: color-mix(in oklab, var(--color-gold) 28%, transparent);
  }
}

/* Quem pediu menos movimento no SO não vê nada girando */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 3. Tipografia

**Regra:** uma display de personalidade + uma sans neutra de apoio.
A display carrega o caráter da marca; a sans sai da frente.

- Se a marca tem fonte própria licenciada → use nos títulos.
- Apoio: **Manrope Variable** (SIL OFL). Um arquivo cobre 200–800.
  (DM Sans foi descartada: geométrica e simpática demais, competia com a display.)

### Converter .otf/.ttf da marca para .woff2 (~40% menor)

```bash
pip install fonttools brotli --break-system-packages
```

```python
from fontTools.ttLib import TTFont
t = TTFont('Fonte-Regular.otf')
t.flavor = 'woff2'
t.save('src/app/fonts/Fonte-Regular.woff2')
```

### Auto-hospedar a Manrope (sem Google Fonts)

```bash
npm pack @fontsource-variable/manrope
tar -xzf fontsource-variable-manrope-*.tgz \
  package/files/manrope-latin-wght-normal.woff2 package/LICENSE
# copiar para src/app/fonts/Manrope-Variable.woff2 e Manrope-LICENSE.txt
```

O subset **latin** já cobre todo o português. `latin-ext` é para leste europeu —
não precisa.

### `src/app/fonts/index.ts`

```ts
import localFont from "next/font/local";

export const display = localFont({
  src: [
    { path: "./Fonte-Regular.woff2",  weight: "400", style: "normal" },
    { path: "./Fonte-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./Fonte-Bold.woff2",     weight: "700", style: "normal" },
  ],
  variable: "--font-flatline",
  display: "swap",
  preload: true,
  fallback: ["Optima", "serif"],
});

export const manrope = localFont({
  src: [{ path: "./Manrope-Variable.woff2", weight: "200 800", style: "normal" }],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});
```

E no `layout.tsx`, aplique as duas variáveis no `<html>`:

```tsx
<html lang="pt-BR" className={`${display.variable} ${manrope.variable}`}>
```

> **Por que não `next/font/google`:** ele baixa da internet no momento do build.
> Funciona na Vercel, mas quebra em ambiente sem rede. Auto-hospedar é sempre
> mais robusto e não custa nada.

---

## 4. Logo e SVGs como componentes React

Nunca use `<img src="logo.svg">`. Transforme cada SVG em componente que herda
`currentColor` — assim a cor muda com uma classe do Tailwind.

```tsx
export function Wordmark({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg viewBox="0 0 1140 195" fill="currentColor"
         role={title ? "img" : undefined}
         aria-hidden={title ? undefined : true}
         focusable="false" {...props}>
      {title ? <title>{title}</title> : null}
      <path d="..." />   {/* traçados originais, sem atributo fill */}
    </svg>
  );
}
```

Uso: `<Wordmark className="w-full max-w-[13rem] text-espresso/45" />`.

### Checar o peso dos SVGs antes de usar

Arquivos de agência costumam vir com **PNG embutido em base64** — cópia raster
redundante dos vetores. No projeto da Bianca isso era 2,4 MB dentro de um SVG
de 3,2 MB.

```bash
grep -c 'base64' arquivo.svg          # se > 0, investigar
```

```python
import re
s = open('arquivo.svg', encoding='utf-8').read()
limpo = re.sub(r'<image\b.*?/>', '', s, flags=re.S)   # 3,2 MB → 13 KB
```

Sempre renderize antes e depois e compare pixel a pixel antes de descartar.

---

## 5. Anatomia da página

```
┌ Backdrop (2 gradientes radiais suaves, -z-10)
│
│  [ retrato circular + anel giratório ]    ← hero
│  Dra. Fulana de Tal                       ← font-display, 1.75rem / 2rem
│  Bio de uma ou duas linhas                ← 0.875rem, cor/65, max-w-[19rem]
│  CRM-UF 00000-0                           ← 0.625rem, cor/35, discreto
│  ──── IPANEMA · NITERÓI ────              ← unidades, uppercase tracking largo
│
│  AGENDAMENTOS                             ← SectionLabel
│  [ card WhatsApp unidade 1 ]
│  [ card WhatsApp unidade 2 ]
│  [ card "em breve" ]                      ← se o site ainda não existe
│
│  REDES SOCIAIS                            ← SectionLabel
│  [ tile ] [ tile ] [ tile ]               ← grid-cols-3
│
│  [ logotipo, cor/45 ]                     ← assinatura no rodapé
│  © ano Nome
└
```

Container: `max-w-md`, `px-5`, `py-14 sm:py-20`, tudo centralizado.

> **Decisão de hierarquia:** se o nome aparece como texto sob a foto, o
> logotipo **não** fica no topo — seriam as mesmas palavras duas vezes seguidas.
> Ou o logotipo é o título (e não há texto de nome), ou o nome é texto e o
> logotipo assina o rodapé. Escolha um.

---

## 6. Componentes

| Arquivo | Papel |
| --- | --- |
| `config/site.ts` | **Fonte única da verdade**: nome, bio, CRM, unidades, array de links |
| `components/AvatarRing.tsx` | Retrato circular + anel de gradiente giratório |
| `components/LinkCard.tsx` | Card de link + variante "em breve" |
| `components/SocialTile.tsx` | Tile de rede social |
| `components/Reveal.tsx` | `RevealGroup` / `RevealItem` — entrada em cascata |
| `components/icons/index.tsx` | Ícones de UI e redes |
| `components/brand/*.tsx` | Logotipo e marcas como SVG inline |

### `config/site.ts` — o formato

```ts
export const site = {
  name: "Dr. Fulano de Tal",
  specialty: "Cardiologia",
  bio: "Cardiologista pela SBC. Especialista em ...",
  crm: "CRM-RJ 00000-0",
  locations: "Ipanema · Niterói",
  url: "https://dominio.com.br",
  description: "...",   // alimenta Open Graph
} as const;

export type SiteLink = {
  id: string;
  label: string;
  hint?: string;
  href: string | null;
  kind: "booking" | "featured" | "social";
  icon: "whatsapp" | "instagram" | "tiktok" | "youtube" | "globe";
  comingSoon?: boolean;
};

export const links: SiteLink[] = [ /* ... */ ];

export const bookingLinks  = links.filter((l) => l.kind === "booking");
export const featuredLinks = links.filter((l) => l.kind === "featured");
export const socialLinks   = links.filter((l) => l.kind === "social");
```

Adicionar, remover ou reordenar botão = editar esse array. A página se
reorganiza sozinha.

---

## 7. As três animações

### Anel de stories no retrato (9s)

O truque: o `conic-gradient` vive num elemento **próprio, atrás da foto**.
O degradê gira, o retrato fica parado.

```tsx
<div className="relative isolate size-25 sm:size-29">
  <span aria-hidden
    className="absolute inset-0 rounded-full animate-ring-spin motion-reduce:animate-none"
    style={{ backgroundImage:
      "conic-gradient(from 180deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5, #962fbf, #d62976, #fa7e1e, #feda75)" }} />
  <span aria-hidden className="absolute inset-[3px] rounded-full bg-cloud" />
  <span className="absolute inset-[6px] overflow-hidden rounded-full">
    <Image src={avatar} alt="..." fill sizes="(min-width:640px) 116px, 100px"
           priority placeholder="blur" className="object-cover" />
  </span>
</div>
```

O gradiente é espelhado (volta pelas mesmas cores) para não ter emenda visível.
Anel de 3px + respiro de 3px = proporção do Instagram.

**Foto:** recorte quadrado com o **rosto no terço superior**. Exporte em WebP
q90 na resolução de 3× do tamanho de exibição (410×410 ≈ 16 KB). Compare
enquadramentos no tamanho real antes de escolher — o que parece bom a 260px
costuma ficar ilegível a 100px.

### Selo de marca giratório (opcional, 84s)

Se a marca tiver logo circular com texto ao redor: separe o **anel de texto** do
**monograma central** em dois componentes. Só o anel gira — senão o monograma
passa metade do tempo de cabeça para baixo.

### Brilho no card "em breve" (2,6s)

Faixa de gradiente branco atravessando o card, `skew-x-12`, `overflow-hidden`
no pai.

---

## 8. Micro-interações

- **Cards de link:** `whileHover={{ y: -2 }}`, `whileTap={{ scale: 0.985 }}`,
  spring `stiffness: 420, damping: 30`. Preenchimento dourado que cresce da
  esquerda (`origin-left scale-x-0 → scale-x-100`), seta que desliza 4px.
- **Entrada em cascata:** `staggerChildren: 0.075`, cada item
  `{ opacity: 0, y: 14, filter: "blur(6px)" }` → `{ opacity: 1, y: 0, blur: 0 }`,
  `duration: 0.65`, ease `[0.22, 1, 0.36, 1]`.
- **Card "em breve":** rótulo que troca no hover sem mudar a altura (dois spans
  absolutos num container `h-4 overflow-hidden`, um sobe e o outro entra) +
  ícone girando 360° + badge que escala.

---

## 9. Armadilhas já resolvidas

Cada uma dessas custou tempo. Não repita.

**Ícones de marca com pesos diferentes.** O glifo do Instagram em contorno fino
fica gritante ao lado de TikTok e YouTube, que são sólidos. Solução: squircle
sólido com lente e ponto vazados por `fill-rule="evenodd"`, reduzido ~8% para
igualar a mancha visual dos outros.

**Rótulo longo quebrando diferente em cada tela.** "Instagram da clínica"
quebrava como "INSTAGRAM DA / CLÍNICA" no desktop e "INSTAGRAM / DA CLÍNICA" no
celular. Solução: espaço não-separável (`\u00A0`) no rótulo, entre as palavras
que devem ficar juntas.

**Badge + rótulo disputando a mesma linha.** Sempre **meça** antes de aprovar:

```js
// no navegador, com Playwright ou no DevTools
const cs = getComputedStyle(tile);
const util = tile.getBoundingClientRect().width
           - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
const range = document.createRange(); range.selectNodeContents(label);
const maior = Math.max(...[...range.getClientRects()].map(r => r.width));
console.log(util, maior, maior <= util ? 'OK' : 'ESTOURA');
```

Larguras de teste: **320** (raro mas existe), **360** (Android comum),
**390** (iPhone), **1440**. Use `flex-wrap` como degradação elegante:
se não couber inline, o elemento desce para a própria linha alinhado à direita.

**Google Fonts em ambiente sem rede.** Ver seção 3 — auto-hospede.

**Servidor servindo build velho.** Depois de `npm run build`, reinicie o
`npm run start` antes de tirar screenshot. Sintoma: CSS antigo, animação que
"não funciona" mas está correta no código.

**`prefers-reduced-motion` ligado no headless.** O Chromium headless pode vir
com movimento reduzido por padrão e suas animações somem no teste. No
Playwright: `newContext({ reducedMotion: 'no-preference' })`.

---

## 10. Acessibilidade e compliance

- Foco visível na cor da marca em todos os links (seção 2).
- `aria-label` descritivo nos tiles de rede social.
- `<nav aria-label="...">` em cada grupo de links.
- Contraste do texto principal acima de 4.5:1.
- `prefers-reduced-motion` respeitado.
- **CFM:** conteúdo médico deve exibir nome e registro. Formato correto é
  **`CRM-UF 00000-0`** — sempre confirme a UF com o cliente, não deduza.
- **Limpe parâmetros de rastreio** das URLs de compartilhamento:
  Instagram `?igsh=...`, TikTok `?_t=...&_r=...`. Os links funcionam igual e
  ficam legíveis.

---

## 11. Checklist para um cliente novo

1. [ ] Scaffold + dependências (seção 1)
2. [ ] Trocar os 4 tokens de cor pelo manual de marca
3. [ ] Converter as fontes da marca para `.woff2`, ajustar `fonts/index.ts`
4. [ ] Checar SVGs com `grep -c base64`; limpar se necessário
5. [ ] Converter logotipo em componente com `currentColor`
6. [ ] `src/app/icon.svg` = favicon
7. [ ] Recortar o retrato (rosto no terço superior) → WebP q90
8. [ ] Preencher `config/site.ts`: nome, bio, CRM+UF, unidades, links
9. [ ] Decidir: logotipo no topo **ou** nome em texto + logotipo no rodapé
10. [ ] `npm run build` → conferir `○ (Static)`
11. [ ] Medir a 320 / 360 / 390 / 1440: sem overflow horizontal, sem texto cortado
12. [ ] Conferir hover, tap e `prefers-reduced-motion`
13. [ ] `url` em `config/site.ts` = domínio final (alimenta o Open Graph)
14. [ ] Imagem de Open Graph 1200×630
15. [ ] `git init` → push → importar na Vercel

---

## 12. Publicação

```bash
npm install
git init
git add .
git commit -m "feat: link page"
git branch -M main
git remote add origin git@github.com:<usuario>/<repo>.git
git push -u origin main
```

Vercel → **Add New… → Project** → importar o repositório. Detecta o Next
sozinho, sem variáveis de ambiente.

---

## 13. Fica igual ou fica diferente?

Se o cliente novo é da mesma família de marca (mesmo consultório, casal de
médicos), vale manter estrutura, animações e componentes **idênticos** e trocar
só paleta, fontes, foto e conteúdo — as duas páginas ficam irmãs, o que é bom.

Se a marca é totalmente independente, mantenha a **arquitetura** (config único,
SVG como componente, tokens em `@theme`, as três animações) e refaça as decisões
visuais do zero. A receita técnica viaja; a direção de arte, não.
