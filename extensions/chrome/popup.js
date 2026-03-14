// FlowGuard Chrome Extension Popup

document.addEventListener('DOMContentLoaded', async () => {
  const statusDot = document.getElementById('statusDot');
  const tabsCount = document.getElementById('tabsCount');
  const captureBtn = document.getElementById('captureBtn');
  const openDashboardBtn = document.getElementById('openDashboard');

  // Get current tabs count
  try {
    const tabs = await chrome.tabs.query({ currentWindow: true });
    tabsCount.textContent = `当前窗口 ${tabs.length} 个标签页`;
    statusDot.classList.remove('inactive');
  } catch (error) {
    tabsCount.textContent = '无法获取标签页信息';
    statusDot.classList.add('inactive');
  }

  // Capture snapshot
  captureBtn.addEventListener('click', async () => {
    try {
      captureBtn.disabled = true;
      captureBtn.textContent = '捕获中...';

      // Get all tabs in current window
      const tabs = await chrome.tabs.query({ currentWindow: true });
      const tabsData = tabs.map(tab => ({
        title: tab.title,
        url: tab.url,
        favIconUrl: tab.favIconUrl
      }));

      // Send to backend API
      const response = await fetch('https://flowguard.vercel.app/api/snapshots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `快照 - ${new Date().toLocaleString('zh-CN')}`,
          browserTabs: tabsData,
          vscodeFiles: [],
        }),
      });

      if (response.ok) {
        captureBtn.textContent = '✓ 已捕获';
        setTimeout(() => {
          captureBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            捕获快照
          `;
          captureBtn.disabled = false;
        }, 2000);
      } else {
        throw new Error('Failed to create snapshot');
      }
    } catch (error) {
      console.error('Capture failed:', error);
      captureBtn.textContent = '捕获失败';
      setTimeout(() => {
        captureBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          捕获快照
        `;
        captureBtn.disabled = false;
      }, 2000);
    }
  });

  // Open dashboard
  openDashboardBtn.addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://flowguard.vercel.app' });
  });
});
