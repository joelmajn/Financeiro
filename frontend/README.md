# Financeiro Frontend

Aplicação React Native/Expo (compatível com web) isolada em `frontend/` para facilitar deploys independentes.

## Como rodar
1. `npm install`
2. Ambiente web: `npm run web`
3. Ambiente nativo (Metro): `npm run start`

## Deploy no Vercel
- Configure o projeto apontando para a pasta `frontend/`.
- Comandos sugeridos:
  - Instalação: `npm install`
  - Build/preview web: `npm run web`
- Nenhum backend é necessário; toda a persistência atual é local no dispositivo/navegador.

## Estrutura principal
- `App.tsx`: ponto de entrada do app.
- `screens/`: telas de navegação.
- `components/`: componentes compartilhados.
- `contexts/`: providers de estado (auth/dados/tema).
- `utils/` e `constants/`: utilitários, máscaras e estilos.
- `scripts/`: ferramentas de build (ex.: export web/Replit).
