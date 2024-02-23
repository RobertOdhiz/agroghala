import React, { useEffect } from 'react';

const ChatWidget = () => {
  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: "72a3b049-e0b9-4fd0-b451-6a4c0e4930a1",
      region: "au-syd",
      serviceInstanceID: "e2c5cdec-124b-426c-96ae-24de5cf34605",
      onLoad: function(instance) { instance.render(); }
    };

    const t = document.createElement('script');
    t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);

    // Clean up the script tag when the component is unmounted
    return () => {
      document.head.removeChild(t);
    };
  }, []);

  return (
    <div>
      {/* The chat widget will be loaded here */}
    </div>
  );
};

export default ChatWidget;