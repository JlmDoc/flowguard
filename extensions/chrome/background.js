// FlowGuard Chrome Extension Background Service Worker

// Listen for keyboard shortcut
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'capture-snapshot') {
    await captureSnapshot();
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'capture') {
    captureSnapshot().then(sendResponse);
    return true; // Keep the message channel open for async response
  }
});

async function captureSnapshot() {
  try {
    const tabs = await chrome.tabs.query({ currentWindow: true });
    const tabsData = tabs.map(tab => ({
      title: tab.title,
      url: tab.url,
      favIconUrl: tab.favIconUrl
    }));

    // Store locally for now (will sync with backend when user is authenticated)
    const snapshot = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      browserTabs: tabsData,
    };

    // Save to chrome storage
    const result = await chrome.storage.local.get('snapshots');
    const snapshots = result.snapshots || [];
    snapshots.unshift(snapshot);
    await chrome.storage.local.set({ snapshots: snapshots.slice(0, 100) }); // Keep last 100

    // Show notification
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: 'FlowGuard',
      message: `已捕获 ${tabsData.length} 个标签页`,
    });

    return { success: true, snapshot };
  } catch (error) {
    console.error('Capture failed:', error);
    return { success: false, error: error.message };
  }
}

// Periodic sync with backend (every 5 minutes)
chrome.alarms.create('sync', { periodInMinutes: 5 });

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'sync') {
    // TODO: Sync local snapshots with backend
    console.log('Syncing with backend...');
  }
});
