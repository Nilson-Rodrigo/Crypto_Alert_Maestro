# Planejamento dos testes E2E com IA

## Prompt utilizado

> Você está ajudando a planejar testes E2E com Maestro para o React Native Crypto Alert. O app tem as abas List, Convert e Alerts. A lista consulta a CoinGecko. A conversão usa Bitcoin e USD por padrão, permite trocar a moeda fiduciária e recalcula automaticamente. Em Alerts, o usuário pode abrir Create Alert, selecionar uma criptomoeda, preencher um preço, escolher uma condição e salvar. Os alertas ficam armazenados localmente. Proponha seis cenários com ação, resultado observável e uma dependência ou risco. Inclua casos de sucesso e entrada inválida. Marque como hipótese qualquer comportamento que precise ser confirmado no app e não escreva YAML ainda.

## Resposta original da IA (ChatGPT)

> 1. **Consultar criptomoedas.** Abra List e espere a lista carregar. Confira se aparece um cartão de Bitcoin com identificação e preço. A CoinGecko precisa responder e a cotação pode mudar.
> 2. **Converter Bitcoin para reais.** Abra Convert, informe 2, troque USD por BRL e confira se o resultado é recalculado e aparece em reais. O valor exato depende da cotação usada.
> 3. **Criar e reabrir um alerta.** Abra Alerts, crie um alerta de Bitcoin acima de USD 50.000 e confira se o cartão aparece. Feche o app e abra de novo para verificar se o alerta foi mantido. O relançamento precisa preservar os dados locais.
> 4. **Bloquear alerta com preço zero.** Selecione Bitcoin, informe 0 e tente salvar. Confira se o formulário impede a criação. Uma mensagem de erro ao tocar em salvar é uma hipótese a conferir na interface.
> 5. **Excluir um alerta.** Crie um alerta para preparar o cenário, toque na lixeira e confira se o cartão some. Se for o único, verifique o estado vazio. A existência de uma confirmação é uma hipótese a conferir.
> 6. **Receber notificação ao atingir o preço.** Crie um alerta e simule uma cotação que atravesse o limite. Confira se o sistema mostra a notificação. O envio real, a permissão do sistema e a possibilidade de controlar a cotação precisam ser confirmados.

## Cenários selecionados

| Cenário | Fluxo | Resultado que o Maestro deve verificar |
| --- | --- | --- |
| 2 | `01-converter-bitcoin-para-brl.yaml` | A conversão de 2 BTC exibe um valor em USD e passa a exibir um valor em BRL após a troca. |
| 4 | `02-bloquear-alerta-com-preco-zero.yaml` | Com Bitcoin selecionado e preço zero, o botão de salvar fica desabilitado. Ao voltar, a lista continua vazia. |
| 3 | `03-criar-e-reabrir-alerta.yaml` | O cartão Bitcoin com condição acima do alvo e preço de USD 50.000 aparece antes e depois de reabrir o app. |
| 5 | `04-excluir-alerta.yaml` | Após criar e excluir o único alerta, o cartão some e aparece `No alerts yet`. |

## Análise crítica

- **Conversão.** O resultado muda com a CoinGecko e o conversor tem dados locais de reserva. O teste verifica a seleção de BRL e a presença de um valor positivo com formato monetário. A precisão da cotação ao vivo fica fora desse cenário.
- **Preço zero.** O código de `CreateAlertScreen` desabilita `Save Alert` antes do envio. O fluxo verifica o estado do botão e o retorno à lista vazia. A hipótese de mensagem de erro ao tocar em salvar foi descartada.
- **Persistência.** O código grava os alertas no AsyncStorage. O fluxo começa com dados limpos e relança o app com `clearState: false` antes de consultar o cartão novamente.
- **Exclusão.** A lixeira tem o rótulo de acessibilidade `Delete alert` e chama a exclusão diretamente. O fluxo cria seu próprio alerta e verifica a lista vazia após o toque.
- **Lista de criptomoedas.** O cenário foi adiado porque a tela de lista depende de uma resposta bem-sucedida da CoinGecko. As verificações escolhidas podem ser repetidas sem uma chave da API.
- **Notificação.** O cenário foi descartado porque o código registra os alertas localmente e não implementa monitoramento de cotação ou disparo de notificação.

Na primeira execução no Android, conferi a tela e a hierarquia de acessibilidade. Os campos selecionados mostram `Bitcoin (BTC)` e `BRL (R$)`. O cartão de alerta mostra apenas `Bitcoin`. Ajustei as verificações para distinguir esses rótulos e acrescentei uma espera pela aba visível na inicialização. Os resultados e as capturas estão no [README](../README.md).
