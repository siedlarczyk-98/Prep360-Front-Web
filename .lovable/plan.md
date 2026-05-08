## Problema

A tela de disciplinas no Dashboard de flashcards está mostrando apenas 90 cards em Ginecologia/Obstetrícia porque o agrupamento é feito a partir do endpoint `/cards-para-hoje` (fila SRS do dia), e não do universo completo de cards da disciplina.

## Solução

Trocar a fonte de dados do agrupamento por disciplinas/aulas para o endpoint `/estudo-manual`, que retorna todos os cards do aluno (sem filtro SRS de "vence hoje"). Os cards de hoje continuam sendo buscados separadamente para o painel "Revisar hoje" e para iniciar a sessão de estudo SRS.

### Arquivo: `src/components/Dashboard.tsx`

1. Trocar o `useQuery` de `allCards`:
   - **Antes:** `queryFn: () => fetchCards()` (chama `/cards-para-hoje`)
   - **Depois:** `queryFn: () => fetchEstudoManual()` (chama `/estudo-manual`, retorna todos)
   - Atualizar `queryKey` para `["cards-todos", email]` para não colidir com cache existente.

2. Atualizar o import de `@/lib/api` para incluir `fetchEstudoManual`.

3. O agrupamento de `disciplines` (linhas 67-86) e `aulasUnicas` (linhas 123-129) continua igual — apenas a fonte muda.

4. Manter `todayCards` (`fetchCardsForToday`) e `newCards` (`fetchNewCards`) como estão — eles alimentam os botões "Revisar hoje" e "Cards novos" do topo, que continuam corretos.

5. Ao iniciar estudo de uma disciplina/aula a partir da listagem, os cards passados ao `StudyMode` vêm de `allCards` (agora completo). Verificar se isso continua coerente: como `StudyMode` aplica a lógica SRS local, passar todos os cards da disciplina é o comportamento esperado de "estudar tudo dessa matéria".

## Detalhes técnicos

- `fetchEstudoManual()` sem `aulaId` já retorna todos os cards do aluno via `/estudo-manual`.
- Não há mudança de backend nem de RLS.
- Não toca em outros componentes (StudyHub, Métricas, Agenda) — eles já usam endpoints próprios.

## Validação

Após o ajuste, abrir a tela de flashcards e conferir que o contador de Ginecologia e Obstetrícia bate com o total real (e não apenas 90).
