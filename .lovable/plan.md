

## Revisão dos Tooltips da Plataforma

### Problemas identificados

1. **`TooltipProvider` global sem `delayDuration`** — O provider em `App.tsx` não define delay, usando o padrão de 700ms do Radix, que é lento e causa a impressão de que o tooltip "não funciona".

2. **Tooltips em mobile (touch devices)** — Radix tooltips são ativados por hover. Em dispositivos touch, não há hover, então os tooltips simplesmente não aparecem. A plataforma é claramente mobile-first (tem `safe-area-inset`, `-webkit-tap-highlight-color`, etc.), então os tooltips ficam invisíveis para a maioria dos usuários.

3. **`TooltipProvider` aninhados com delays diferentes** — `SimuladoFiltros.tsx` usa `delayDuration={200}` e `sidebar.tsx` usa `delayDuration={0}`, criando conflito com o provider global.

4. **Estilo do tooltip genérico** — Usa `bg-popover` (branco sobre branco em cards brancos), pouco contraste visual. Tooltips informativos devem se destacar mais.

### Plano de correção

**Arquivo: `src/App.tsx`**
- Definir `delayDuration={300}` no `TooltipProvider` global para resposta mais rápida.

**Arquivo: `src/components/ui/tooltip.tsx`**
- Trocar estilo de `bg-popover text-popover-foreground border` para `bg-primary text-primary-foreground` (fundo escuro navy, texto branco) — padrão mais visível e profissional.
- Adicionar `Portal` do Radix para evitar problemas de overflow/clipping.
- Aumentar `sideOffset` para 6px.

**Arquivo: `src/pages/SimuladoFiltros.tsx`**
- Remover o `TooltipProvider` local redundante (o global já cobre).

### Detalhes técnicos

O componente `TooltipContent` será atualizado para:
```
bg-primary text-primary-foreground border-0 shadow-lg px-3 py-1.5 text-xs rounded-lg
```

Isso dá um tooltip escuro (navy) com texto branco, que se destaca sobre qualquer fundo — cards brancos, backgrounds cinzas, etc.

O `Radix.Portal` garante que o tooltip nunca fique cortado por `overflow: hidden` de containers pai.

### Arquivos alterados
- `src/components/ui/tooltip.tsx` — estilo + Portal
- `src/App.tsx` — `delayDuration={300}`
- `src/pages/SimuladoFiltros.tsx` — remover `TooltipProvider` local

