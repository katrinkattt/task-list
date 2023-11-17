import {useAppState} from './hooks/useAppState';
import React, {ReactElement, ReactNode, useEffect} from 'react';
import {AppState, AppStateStatus} from 'react-native';

interface IAppLogic {
  children: ReactNode | ReactElement;
}

const AppLogic = (props: IAppLogic) => {
  const appState = useAppState();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  // App state
  useEffect(() => {}, [appState]);

  const handleAppStateChange = (appStateProps: AppStateStatus) => {
    if (appStateProps === 'active') {
    }
  };

  return <>{props.children}</>;
};

export default AppLogic;
