import './commands';
import addContext from 'mochawesome/addContext';

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('appendChild') || err.message.includes('autocomplete')) {
    return false;
  }
  return true;
});

// Adicionar vídeo ao relatório após cada teste
Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed' || test.state === 'passed') {
    const videoPath = `videos/${Cypress.spec.name}.mp4`;
    addContext({ test }, {
      title: 'Vídeo do Teste',
      value: `../../${videoPath}`
    });
  }
});