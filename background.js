// background.js

// Criação dos Menus ao instalar
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "jb-stringify",
    title: "Stringfy Selection (Escape)",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "jb-unstringify",
    title: "Unstringfy Selection (Parse)",
    contexts: ["selection"]
  });
});

// Ouvinte de cliques no menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "jb-stringify" || info.menuItemId === "jb-unstringify") {
    // Envia mensagem para a aba ativa executar a lógica
    chrome.tabs.sendMessage(tab.id, {
      action: info.menuItemId,
      text: info.selectionText
    }).catch(err => console.log("Erro ao conectar com a aba: ", err));
  }
});