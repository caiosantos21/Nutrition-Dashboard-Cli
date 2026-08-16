# NutriTrack — Nutrition Dashboard

Projeto React Native CLI + TypeScript replicando a tela de dashboard nutricional.

## ⚠️ Importante: pastas nativas (`android` / `ios`)

Este pacote contém todo o **código-fonte JS/TS** do app (componentes, telas, tema,
tipos e dados). As pastas nativas `android/` e `ios/` **não foram incluídas**,
pois dependem do seu ambiente local (Android SDK / Xcode) para serem geradas
corretamente.

### Como finalizar a configuração

1. Extraia este `.zip` dentro de:
   `C:\Users\caio_.CAIO\OneDrive\Documentos\GitHub\Nutrition-Dashboard-Test`

2. No terminal, dentro da pasta do projeto, gere as pastas nativas com o template
   oficial (isso não sobrescreve os arquivos JS/TS que já vieram prontos):

   ```bash
   npx @react-native-community/cli init NutritionDashboardTemp --version 0.75.4
   ```

   Depois copie apenas as pastas `android/` e `ios/` geradas em
   `NutritionDashboardTemp` para dentro deste projeto, e apague a pasta temporária.

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Rode o projeto:

   ```bash
   npx react-native run-android
   # ou
   npx react-native run-ios
   ```

> Alternativa mais simples: se preferir, rode `npx @react-native-community/cli init NutritionDashboard`
> direto na pasta desejada primeiro, e depois substitua o conteúdo gerado de
> `App.tsx`, `index.js`, `package.json` (dependências) e crie a pasta `src/`
> com os arquivos deste pacote.

> 💡 Se quiser evitar toda essa configuração nativa (Android SDK / adb / Xcode),
> existe também uma versão **Expo** deste mesmo projeto, que roda direto no
> celular via app Expo Go, sem precisar de nada disso.

## Arquitetura

```
src/
  theme/          → design tokens (cores, espaçamento, tipografia) usados em todo o app
  types/          → tipos de domínio (Meal, MealFoodEntry, MacroNutrient, DailySummary, AppSettings, etc.)
  utils/          → date.ts (data do header), units.ts (rótulo g/oz), confirmDelete.ts (Alert de exclusão)
  data/           → mock data — apenas o estado INICIAL (seed) do app
  context/
    AppDataContext.tsx  → único lugar com estado mutável (refeições, alimentos, metas); hook useAppData()
  components/     → peças de UI puras e reutilizáveis
    CircularProgress.tsx   → anel de progresso (kcal)
    ProgressTrack.tsx      → barra linear reutilizada pelo MacroBar e pelo header
    MacroBar.tsx            → linha de macro (label + valores [+ barra opcional])
    MealCard.tsx             → card de refeição (aba Today), com edição e exclusão
    InfoRow.tsx               → linha genérica (título/subtítulo + valor/chevron), usada em History, Foods e Settings
    SectionTitle.tsx           → título de seção ("MEALS", "PAST DAYS", etc.)
    ScreenContainer.tsx         → casca de tela (ScrollView + padding + footer opcional), usada por todas as abas
    TabBar.tsx                   → abas Today/History/Foods/Settings
    AppButton.tsx                  → botão único (solid/outline) usado em "Add Meal", "Add Food" e "Log Food"
    PlusIcon.tsx                    → ícone "+" circular
    DailySummaryHeader.tsx            → composição do cabeçalho verde (usa CircularProgress + MacroBar)
    modals/                            → ver seção "Modais" abaixo
  navigation/
    AppShell.tsx        → mantém header + tabs fixos e alterna a tela ativa (sem lib de navegação)
  screens/
    TodayScreen.tsx      → lista de refeições + Add Meal + Log Food
    HistoryScreen.tsx     → dias anteriores (kcal consumido vs meta)
    FoodsScreen.tsx        → alimentos salvos + Add Food
    SettingsScreen.tsx      → preferências do app
App.tsx             → ponto de entrada, injeta SafeAreaProvider + AppDataProvider + AppShell
```

### Princípios seguidos

- Nenhum valor de cor/espaçamento/fonte hardcoded — tudo vem de `theme/theme.ts`.
- `MacroBar`, `InfoRow`, `AppButton` e `ScreenContainer` eliminam repetição de
  JSX entre macros, listas (History/Foods/Settings) e botões.
- Navegação simples por estado (`AppShell`), sem dependência de lib de rotas —
  fácil de trocar depois por React Navigation se o app crescer.
- Dados mockados isolados em `src/data`, servindo apenas como estado **inicial**.

## Estado editável (Context)

Todo o estado que pode ser alterado pelo usuário (refeições, alimentos salvos,
metas diárias e unidade) vive em `src/context/AppDataContext.tsx`, acessado
via o hook `useAppData()`. Nenhuma tela guarda cópia própria dos dados —
todas leem e escrevem através do context.

## Modais (`src/components/modals`)

- `AppModal` — casca genérica (backdrop + card + título + fechar), usada por todos os outros.
- `FormField` — label + input padronizado, usado nos formulários.
- `ToggleRow` — linha selecionável (checkmark), reaproveitada pelo `SelectModal` (Units) e pelo seletor de alimentos do `MealFormModal`.
- `MealFormModal` — cria **e** edita refeições, com seletor de alimentos cadastrados (ver seção abaixo).
- `AddFoodModal` — adicionar alimento salvo (nome, porção, kcal).
- `EditGoalModal` — genérico, reaproveitado pelas 4 metas de Settings.
- `SelectModal` — seleção única genérica, usada hoje para trocar "Units".
- `AboutModal` — conteúdo estático de "About NutriTrack".

## Exclusão de itens

`MealCard` e `InfoRow` aceitam uma prop `onDelete`. Ao tocar no ícone "✕",
é exibido um `Alert` de confirmação (`src/utils/confirmDelete.ts`) antes de
remover o item do context.

## Refeições ligadas aos alimentos cadastrados

- `kcal consumido` do tracker é **derivado**: soma real dos `kcal` de todas
  as refeições do dia (nada de valor fixo). Qualquer alteração na lista de
  refeições atualiza o anel/resumo do header automaticamente.
- `Meal.foods` (não mais texto livre): cada refeição guarda uma lista de
  `MealFoodEntry` (`foodId`, `name`, `kcal`), sempre originada dos alimentos
  cadastrados na aba Foods.
- **`MealFormModal`** cobre tanto criar quanto editar uma refeição:
  - lista os alimentos salvos com um seletor tipo checklist (`ToggleRow`);
  - calcula o total de kcal automaticamente pela soma dos itens marcados;
  - calcula quanto ainda resta da meta diária (excluindo a própria refeição
    quando em modo de edição, para não descontá-la duas vezes);
  - bloqueia o botão de salvar e mostra uma mensagem de erro em vermelho se
    o total ultrapassar o restante da meta diária;
  - tocar em um card de refeição (`MealCard`) abre esse mesmo modal em modo
    de edição, já com os alimentos atuais marcados.
- **Metas em Settings**: `Protein/Carbs/Fat Goal` exibem a unidade conforme
  `Units` (g para Metric, oz para Imperial) — **sem conversão de valor**, só
  troca do rótulo, por decisão de produto. `Daily Calorie Goal` continua
  sempre em `kcal`. Isso é resolvido por `src/utils/units.ts` (`getWeightUnit`).
- Qualquer edição de meta em Settings já reflete imediatamente no header
  (Today), pois tudo lê do mesmo `AppDataContext`.

## Outros ajustes de correção

- **Sobreposição com a barra de navegação do Android**: corrigido fazendo o
  `SafeAreaView` do `AppShell` respeitar `edges={['top', 'bottom']}`, então
  os botões "LOG FOOD" e "Add Food" não ficam mais atrás dos botões de
  gesto/navegação do sistema.
- **Horário fixo removido**: o relógio já aparece na barra de status do
  Android, então foi retirado do header do app.
- **Data dinâmica**: `src/utils/date.ts` calcula a data atual real (`SAT, AUG 15`,
  por exemplo) em vez do valor fixo `SUN, FEB 1`.
