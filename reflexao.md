# Reflexão sobre o GenIA-E2ETest

## 1. Qual problema a abordagem procura resolver?

Uma equipe pode saber descrever um teste em linguagem natural e ainda gastar bastante tempo para transformá-lo em automação. É preciso ordenar as ações, localizar elementos da interface e decidir o que comprova que cada etapa funcionou. O GenIA-E2ETest busca reduzir esse trabalho de tradução em fluxos que atravessam a aplicação do ponto de vista do usuário.

## 2. Como a IA generativa pode ajudar na criação de testes E2E?

A IA pode dividir uma descrição longa em passos menores, separar ações de verificações e preparar um primeiro script. No artigo, o processo é dividido em três etapas. Primeiro organiza o cenário, depois identifica e refina os elementos da interface e, por fim, gera um script para o Robot Framework. Na atividade do Crypto Alert, apliquei a mesma ideia de decompor e revisar os cenários antes de escrevê-los em YAML para o Maestro.

## 3. Quais limitações ou riscos existem?

Um roteiro pode pressupor um botão que só aparece depois de outra ação, usar um seletor que muda a cada execução ou esperar um valor que depende de uma API externa. O estudo encontrou dificuldades com navegação que dependia do estado anterior e com elementos inseridos dinamicamente. A avaliação envolveu duas aplicações web e doze casos, então os resultados dão uma referência para aquele contexto. Um teste também pode passar com uma verificação fraca, como confirmar só o título da tela após salvar um alerta.

## 4. Por que um teste gerado por IA precisa de revisão humana?

Quem conhece o aplicativo consegue decidir se o resultado esperado representa a regra de negócio e se o teste falharia diante de um defeito real. Um exemplo é o preço zero no Crypto Alert. Um rascunho pode sugerir tocar em `Save Alert` e esperar uma mensagem. Ao revisar o código, observei que o botão fica desabilitado. A verificação deve refletir esse comportamento e confirmar que nenhum alerta foi criado.

## 5. Como o Maestro pode validar um fluxo sugerido pela IA?

Com a versão nativa instalada, eu primeiro reproduziria o cenário manualmente e conferiria os textos e identificadores com o Maestro Studio. Depois, o YAML pode lançar o app, navegar até `Alerts`, preencher o formulário e conferir o cartão pelo nome, condição e preço. Para verificar a persistência, o Maestro pode encerrar e reabrir o app preservando os dados. Se alguma etapa falhar, o ponto da falha e a captura ajudam a distinguir um seletor incorreto de um problema no aplicativo.

## Referências

- JÚNIOR, Elvis et al. *GenIA-E2ETest: A Generative AI-Based Approach for End-to-End Test Automation*. SBES, 2025. [Versão publicada](https://doi.org/10.5753/sbes.2025.9927) · [Preprint](https://arxiv.org/abs/2510.01024).
- [Documentação do Maestro para React Native](https://docs.maestro.dev/get-started/supported-platform/react-native).
