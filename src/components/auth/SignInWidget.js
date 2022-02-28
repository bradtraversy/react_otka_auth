import React, { useEffect, useRef } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

const OktaSignInWidget = ({ onSuccess, onError }) => {
  const widgetRef = useRef();

  useEffect(() => {
    if (!widgetRef.current) {
      return false;
    }
    const widget = new OktaSignIn({
      logo: 'logo.png',
      issuer: 'https://dev-2530788.okta.com/oauth2/default',
      clientId: '0oa4091th4FTpalJf5d7',
      redirectUri: window.location.origin + '/login/callback',
      scopes: ['openid', 'profile', 'email'],
    });

    widget.showSignInToGetTokens({
      el: widgetRef.current,
    }).then(onSuccess).catch(onError);

    return () => widget.remove();

  }, [onSuccess, onError]);
  return (<div ref={widgetRef} />);
};

export default OktaSignInWidget;
