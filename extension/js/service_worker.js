// 监听点击扩展按钮事件
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { type: "clicked" }); // 通知 content 执行 clicked
});

// 监听发给 service_worker 的消息
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  sendResponse(null);
  if (message === "submit" || message === "cancel") {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });

    chrome.tabs.sendMessage(tab.id, { type: "close" }); // 通知 content 执行 close
  }
});
