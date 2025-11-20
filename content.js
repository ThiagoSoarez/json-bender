// content.js

// Função auxiliar para substituir texto em inputs/textareas
function replaceActiveElementText(newText) {
  const el = document.activeElement;
  
  // Verifica se é um elemento de texto editável
  if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) {
    const start = el.selectionStart;
    const end = el.selectionEnd;
    
    // Preserva o scroll original
    const scrollTop = el.scrollTop;
    
    // Substituição cirúrgica: Texto antes + Novo Texto + Texto depois
    el.value = el.value.substring(0, start) + newText + el.value.substring(end);
    
    // Reposiciona o cursor logo após o texto inserido
    el.selectionStart = el.selectionEnd = start + newText.length;
    el.scrollTop = scrollTop;
    
    return true; // Sucesso na substituição
  }
  return false; // Não era um campo editável
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    let originalText = request.text;
    let processedText = "";

    // Lógica de Processamento
    if (request.action === "jb-stringify") {
      processedText = JSON.stringify(originalText);
      // Remove as aspas externas adicionadas pelo JSON.stringify para ficar limpo na inserção
      // Apenas se o usuário quiser escapar aspas internas. 
      // Se o objetivo é criar uma string literal válida, mantemos as aspas.
      // Vamos manter o padrão do JSON.stringify completo para segurança.
    } 
    else if (request.action === "jb-unstringify") {
      // Se o usuário selecionou algo como "{\"a\":1}", ele quer {"a":1}
      // Tratamento para remover aspas envolventes caso o usuário tenha selecionado a string inteira
      let textToParse = originalText.trim();
      if (!textToParse.startsWith('"') && !textToParse.startsWith("'")) {
         // Tenta adicionar aspas se não tiver, para o JSON.parse funcionar em fragmentos
         textToParse = `"${textToParse}"`;
      }
      processedText = JSON.parse(textToParse);
      
      // Se o resultado for um objeto, formatamos bonito. Se for string, devolvemos texto.
      if (typeof processedText === 'object') {
        processedText = JSON.stringify(processedText, null, 2);
      }
    }

    // Tentativa de Substituição no DOM
    const replaced = replaceActiveElementText(processedText);

    if (replaced) {
      // Feedback visual discreto (opcional: log no console)
      console.log("Json Bender: Texto substituído in-loco.");
    } else {
      // Fallback: Copiar para Clipboard se não for campo editável
      navigator.clipboard.writeText(processedText).then(() => {
        alert("Resultado copiado para a área de transferência (campo não editável detectado).");
      });
    }

  } catch (e) {
    console.error(e);
    alert("Erro: O texto selecionado não pôde ser processado. Verifique a sintaxe.");
  }
});