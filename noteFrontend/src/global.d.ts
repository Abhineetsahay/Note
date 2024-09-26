declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_BACKENDURL: string;
  }
}

declare var process: {
  env: NodeJS.ProcessEnv;
};
