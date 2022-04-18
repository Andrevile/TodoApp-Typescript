const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',

  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'], // resolve.extenstions를 이용하면 import 할 때,
    // 해당 배열안의 확장자를 가진 파일들은 확장자를 입력하지 않아도 됨 리액트를 쓸때는 .jsx도 추가해줄 것
    alias: {
      // 해당 경로의 별칭을 정함으로써 import할 때, 해당 별칭을 사용하면 절대경로처럼 사용가능
      '@': path.resolve(__dirname, '../src'),
    },
  },

  //   target: ['web', 'es5'], 오래된 브라우저 고려시  설정
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/, //라이브러리가 많을 수록 바벨로더가 느리게 동작할 수 있으므로
        // node_modules를 제외
        loader: 'ts-loader', //babel-loader
      },
      {
        test: /\.(jpg|jpeg|png|gif|ico)$/, // 해당 확장자의 파일들을 불러와 줌
        // 웹팩 5부터는 url-loader와 file-loader 대신에 \
        // 기본 기능으로 추가 됨
        // type: 'asset/resource',
        type: 'asset', //네트워크 요청 부담을 줄이기 위해 40KB 미만은 인라인으로 번들링
        generator: {
          // 해당 경로에 생성
          filename: 'static/[name][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 40 * 1024,
          },
        },
      },
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      //경로의 html파일에 번들링한 결과물을 자동으로 주입해주는 역할
      template: './src/index.html',
      // favicon: "./src/static/assets/favicon.ico",
    }),
    new CopyPlugin({
      patterns: [{ from: 'public', to: 'public' }],
    }),
  ],
};
