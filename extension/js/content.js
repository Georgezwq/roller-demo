// 插入的 html
const rollerIframeHtml = `
<style id="roller-style">
  #roller-iframe{
    position: fixed;
    top: 24px;
    right: 24px;
    height: 178px;
    width: 276px;
    background: white; 
    z-index: 2147483647;
    border: none;
    border-radius: 16px;
    box-shadow: 0px 0.4px 0.7px rgba(113, 81, 78, 0.04), 0px 1px 2px rgba(113, 81, 78, 0.06), 0px 2.4px 4.8px rgba(113, 81, 78, 0.08), 0px 8px 16px rgba(113, 81, 78, 0.12);
    animation: slidein 0.75s cubic-bezier(0.11, 0, 0.02, 1) 1;
    transition: ease-in height 0.3s;
  }
  #roller-iframe::-webkit-scrollbar { 
    display: none;
  }
  @keyframes slidein{
    0%  {top: -200px;}
    85% {top: 26px;}
    100% {top: 20px;}
  }
  @keyframes slideout {
    0% {top: 20px; opacity: 1}
    60% {opacity: 0}
    100% {opacity: 0; top: -200px}
  }
</style>
<iframe
  id="roller-iframe"
  src="http://127.0.0.1:5173/"
  frameBorder="0"
  allow="clipboard-write"
></iframe>`;

// 监听 iframe 中的消息
const iframeListener = async (e) => {
  const messageType = e?.data?.type;
  if (["cancel", "submit"].includes(messageType)) {
    // 把消息转发给 service_worker
    chrome.runtime.sendMessage(messageType).then();
  }
};

// 插入 iframe
const insertIframe = () => {
  document.body.insertAdjacentHTML("afterbegin", rollerIframeHtml);
  window.addEventListener("message", iframeListener, true);
};

// 移除 iframe
const removeIframe = () => {
  window.removeEventListener("message", iframeListener);
  document.getElementById("roller-iframe").style.animationName = "slideout";
  setTimeout(() => {
    document.getElementById("roller-iframe").remove();
    document.getElementById("roller-style").remove();
  }, 700);
};

// 监听 service_worker 发来的消息
chrome.runtime.onMessage.addListener((message) => {
  const { type } = message;
  const iframe = document.getElementById("roller-iframe");

  switch (type) {
    case "clicked":
      if (iframe) {
        removeIframe();
      } else {
        insertIframe();
      }
      break;
    case "close":
      if (iframe) {
        removeIframe();
      }
      break;
    default:
      break;
  }
});
