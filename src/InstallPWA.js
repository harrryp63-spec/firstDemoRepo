// File: src/components/PWAInstallPrompt/PWAInstallPrompt.js
import React, { useState, useEffect } from 'react';
import './InstallPWA.css';

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop');
  const [browser, setBrowser] = useState('other');

  // Detect device type and browser
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    
    // Detect device type
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setDeviceType('ios');
    } else if (/android/.test(userAgent)) {
      setDeviceType('android');
    } else {
      setDeviceType('desktop');
    }
    
    // Detect browser
    if (/edg/.test(userAgent)) {
      setBrowser('edge');
    } else if (/chrome/.test(userAgent) && !/edg/.test(userAgent)) {
      setBrowser('chrome');
    } else if (/safari/.test(userAgent) && !/chrome/.test(userAgent)) {
      setBrowser('safari');
    } else if (/firefox/.test(userAgent)) {
      setBrowser('firefox');
    } else {
      setBrowser('other');
    }
  }, []);

  // Check if app is already installed
  const isAppInstalled = () => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return true;
    }
    if (window.navigator.standalone) {
      return true;
    }
    if (document.referrer.includes('android-app://')) {
      return true;
    }
    return false;
  };

  // Check if user has recently dismissed the prompt
  const isPromptDismissedRecently = () => {
    const dismissed = localStorage.getItem('pwaPromptDismissed');
    const dismissedTime = localStorage.getItem('pwaPromptDismissedTime');
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    
    return dismissed === 'true' && dismissedTime && (Date.now() - parseInt(dismissedTime)) < oneWeek;
  };

  // Show the prompt if conditions are met
  useEffect(() => {
    if (isAppInstalled() || isPromptDismissedRecently()) {
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Listen for beforeinstallprompt event (for Android/Desktop)
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  // Listen for appinstalled event
  useEffect(() => {
    const handler = () => {
      setIsVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handler);

    return () => {
      window.removeEventListener('appinstalled', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      
      setDeferredPrompt(null);
    }
    handleDismiss();
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('pwaPromptDismissed', 'true');
    localStorage.setItem('pwaPromptDismissedTime', Date.now().toString());
  };

  if (!isVisible || isAppInstalled()) {
    return null;
  }

  // Render appropriate content based on device and browser
  const renderPromptContent = () => {
    // Android/Chrome with beforeinstallprompt support
    if (deferredPrompt && (deviceType === 'android' || deviceType === 'desktop')) {
      return (
        <>
          <h3>Install Our App</h3>
          <p>Get the full experience with our installable app.</p>
          <div className="pwa-prompt-buttons">
            <button className="pwa-install-btn" onClick={handleInstallClick}>
              Install Now
            </button>
            <button className="pwa-dismiss-btn" onClick={handleDismiss}>
              Not Now
            </button>
          </div>
        </>
      );
    }
    
    // iOS devices
    if (deviceType === 'ios') {
      return (
        <>
          <h3>Add to Home Screen</h3>
          <p>To install this app, tap the share button and then "Add to Home Screen".</p>
          <div className="pwa-ios-steps">
            <div className="pwa-step">
              <span className="pwa-step-number">1</span>
              <p>Tap the <span className="pwa-icon">⎋</span> Share button</p>
            </div>
            <div className="pwa-step">
              <span className="pwa-step-number">2</span>
              <p>Scroll down and tap "Add to Home Screen"</p>
            </div>
            <div className="pwa-step">
              <span className="pwa-step-number">3</span>
              <p>Tap "Add" in the top right corner</p>
            </div>
          </div>
          <div className="pwa-prompt-buttons">
            <button className="pwa-dismiss-btn" onClick={handleDismiss}>
              Got It
            </button>
          </div>
        </>
      );
    }
    
    // Other browsers without beforeinstallprompt support
    return (
      <>
        <h3>Install Our App</h3>
        <p>Look for the "Install" or "Add to Home Screen" option in your browser menu.</p>
        <div className="pwa-prompt-buttons">
          <button className="pwa-dismiss-btn" onClick={handleDismiss}>
            Got It
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="pwa-install-prompt">
      <div className="pwa-prompt-content">
        <button className="pwa-close-btn" onClick={handleDismiss} aria-label="Close">
          &times;
        </button>
        <div className="pwa-app-icon">
          <span role="img" aria-label="App">📱</span>
        </div>
        {renderPromptContent()}
      </div>
    </div>
  );
};

export default InstallPWA;