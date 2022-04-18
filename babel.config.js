module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage', // 폴리필 사용 방식 지정 기본값은 false 이다
        targets: '> 0.25%, not dead', //브라우저 점유율을 나타냄, 해당 비율을 넘는 사용률을 가진 브라우저에서 작용
        corejs: {
          // 폴리필 버전 지정 기본값은 2
          version: 3,
        },
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],

  plugins: ['@babel/plugin-proposal-class-properties', ['@babel/plugin-transform-runtime', { corejs: 3 }]], // 플러그인들을 따로 추가할 수 있음, preset은 플러그인들을 모아 놓은 것
};
