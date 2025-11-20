document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('inputArea');
  const status = document.getElementById('statusMsg');

  const showStatus = (msg, isError = false) => {
    status.textContent = msg;
    status.style.color = isError ? '#f48771' : '#89d185'; // Cores do tema
    setTimeout(() => status.textContent = '', 3000);
  };

  // Função auxiliar para validar entrada vazia
  const getInput = () => {
    const val = input.value.trim();
    if (!val) {
      showStatus("O campo está vazio!", true);
      return null;
    }
    return val;
  };

  // 1. STRINGFY
  document.getElementById('btnStringify').addEventListener('click', () => {
    const val = getInput();
    if (val === null) return;

    try {
      // Se já for um objeto JSON válido, minifica antes de escapar para economizar espaço
      try {
         const obj = JSON.parse(val);
         input.value = JSON.stringify(JSON.stringify(obj));
      } catch (e) {
         // Se for texto comum, apenas escapa
         input.value = JSON.stringify(val);
      }
      showStatus("Texto escapado!");
    } catch (e) {
      showStatus("Erro ao processar.", true);
    }
  });

  // 2. UNSTRINGFY
  document.getElementById('btnUnstringify').addEventListener('click', () => {
    const val = getInput();
    if (val === null) return;

    try {
      // Remove aspas externas se o usuário colou apenas o conteúdo
      let textToParse = val;
      
      // Correção para o erro "Unexpected end of JSON input" ou inputs parciais
      if (!textToParse.startsWith('"') && !textToParse.startsWith('{') && !textToParse.startsWith('[')) {
          textToParse = `"${textToParse}"`;
      }

      const parsed = JSON.parse(textToParse);
      
      // Se o resultado do parse for um objeto, mostra bonito. Se for string, mostra texto.
      if (typeof parsed === 'object') {
        input.value = JSON.stringify(parsed, null, 2);
      } else {
        input.value = parsed;
      }
      
      showStatus("Texto restaurado!");
    } catch (e) {
      console.error(e); // Para debug
      showStatus("Não é uma string JSON válida.", true);
    }
  });

  // 3. JSON BEAUTIFIER
  document.getElementById('btnBeautify').addEventListener('click', () => {
    const val = getInput();
    if (val === null) return;

    try {
      // Tenta corrigir aspas simples para duplas (erro comum: property name expected)
      // CUIDADO: Isso é um fix simples, pode quebrar strings que contenham aspas simples reais.
      // Use com cautela ou remova a linha abaixo se preferir validação estrita.
      const fixedVal = val.replace(/'/g, '"'); 

      const jsonObj = JSON.parse(fixedVal);
      input.value = JSON.stringify(jsonObj, null, 2);
      showStatus("JSON formatado!");
    } catch (e) {
      console.error(e);
      // Feedback específico para o erro de sintaxe
      if (e instanceof SyntaxError) {
        showStatus("JSON Inválido (Aspas ou Vírgulas?)", true);
      } else {
        showStatus("Erro desconhecido.", true);
      }
    }
  });
});