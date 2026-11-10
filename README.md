# Crypto Alert · Testes E2E com Maestro

Atividade sobre o [React Native Crypto Alert da Rocketseat](https://github.com/rocketseat-education/react-native-crypto-alert). A suíte exercita a conversão e o gerenciamento de alertas pela interface Android.

## Pré-requisitos no Linux

- Node.js 20.19 ou superior compatível com o Expo SDK 55 e npm.
- Android Studio com Android SDK Platform 36, Android SDK Build-Tools, Platform-Tools e Android Emulator. Aceite as licenças no SDK Manager. O Gradle pode baixar o NDK e o CMake requeridos no primeiro build.
- JDK 17 para o build Android e Java 17 ou superior para o Maestro.
- [Maestro CLI](https://docs.maestro.dev/maestro-cli/how-to-install-maestro-cli). Os arquivos foram escritos para Maestro 2.x.

## Instalar o app no emulador

1. Na raiz do projeto, instale as dependências com `npm ci`.
2. No Android Studio, abra **Tools → Device Manager**. Crie um dispositivo virtual, por exemplo um Pixel com Android 15 (API 35) ou Android 16 (API 36). Inicie-o e aguarde a tela inicial do Android.
3. Se o SDK estiver no diretório padrão do Linux, configure o terminal assim. Ajuste o caminho se instalou o SDK em outro local.

   ```bash
   export ANDROID_HOME="$HOME/Android/Sdk"
   export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$HOME/.maestro/bin:$PATH"
   adb devices
   maestro --version
   ```

4. Com o emulador listado como `device`, compile e instale a versão nativa.

   ```bash
   npx expo run:android --variant release
   adb shell pm path com.cryptoalert.app
   ```

   A segunda linha deve listar o APK instalado. O pacote vem de `app.json` e corresponde ao `appId` dos YAMLs. O build release incorpora o JavaScript e roda sem Metro.

A chave da CoinGecko é opcional para os quatro fluxos. Para consultar a lista ao vivo, copie `.env.example` para `.env`, preencha `EXPO_PUBLIC_COINGECKO_API_KEY` e gere o build com essa configuração. Se a consulta falhar, a lista pode mostrar `Failed to load` e o conversor usa os preços locais.

## Revisar manualmente e rodar a suíte

Use um emulador de teste. Cada fluxo principal limpa os dados de `com.cryptoalert.app` na inicialização para começar sem alertas anteriores.

| Fluxo | Verificação manual |
| --- | --- |
| [01 · Converter](.maestro/01-converter-bitcoin-para-brl.yaml) | Na aba `Convert`, informe 2 com Bitcoin e USD selecionados. Confira o resultado em dólar, troque USD por BRL e confira se o valor agora aparece com `R$`. |
| [02 · Rejeitar preço zero](.maestro/02-bloquear-alerta-com-preco-zero.yaml) | Em `Alerts → New Alert`, selecione Bitcoin, informe 0 e confira se `Save Alert` está desabilitado. Volte e confirme que aparece `No alerts yet`. |
| [03 · Criar e reabrir](.maestro/03-criar-e-reabrir-alerta.yaml) | Crie um alerta de Bitcoin acima de 50000 USD. Confira a condição e o cartão com `$50,000.00`. Encerre o processo do app, abra de novo e confirme que o mesmo cartão ainda aparece. |
| [04 · Excluir](.maestro/04-excluir-alerta.yaml) | Em uma lista vazia, crie um alerta e toque na lixeira. Confira se aparece `No alerts yet`. |

Na raiz, execute todos os fluxos ou somente um deles.

```bash
maestro test .maestro
maestro test .maestro/03-criar-e-reabrir-alerta.yaml
```

Se houver vários dispositivos conectados, selecione o serial mostrado por `adb devices`. Exemplo com `emulator-5554`.

```bash
maestro --device emulator-5554 test .maestro
```

Se um seletor falhar, reproduza a ação e examine a interface com `maestro hierarchy`. A suíte usa textos visíveis e `testID` nos campos e controles em que um seletor estável ajuda a distinguir os elementos.

## Gravar dois fluxos para a entrega

Com o app instalado e o emulador aberto, rode os comandos abaixo. Para a gravação local, instale também o FFmpeg e deixe-o no `PATH`.

```bash
mkdir -p evidencias
maestro record --local .maestro/01-converter-bitcoin-para-brl.yaml evidencias/01-conversao.mp4
maestro record --local .maestro/03-criar-e-reabrir-alerta.yaml evidencias/03-persistencia.mp4
```

Abra os vídeos para conferir se mostram as verificações finais. Versione as gravações junto com o projeto quando estiverem prontas.

## Publicar o repositório da atividade

Se estiver usando a cópia entregue em ZIP, extraia-a e abra o terminal dentro de `Crypto_Alert_Maestro`. O histórico Git está incluído.

Crie um repositório vazio no GitHub, sem README inicial. Substitua os dois marcadores pelo seu usuário e pelo nome do repositório. Configure o remoto somente uma vez e envie a branch.

```bash
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

## Reflexão e planejamento

- [Reflexão sobre o artigo GenIA-E2ETest](reflexao.md)
- [Prompt, resposta original da IA e revisão dos cenários](ia/planejamento.md)
