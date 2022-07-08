const config = {
  appenders: {
    // 標準出力
    stdout: {
      type: "stdout",
    },
    // ファイル出力
    system: {
      type: "dateFile",
      filename: "./logs/server.log", // プロジェクトルートディレクトリを起点とした相対パスで解釈される
      pattern: ".yyyy-MM-dd", // `filename` の後ろにこのパターンでファイル名が付けられる
      keepFileExt: true, // `true` を指定すると、ローテートしたファイル名の末尾に拡張子が付く
      // compress: true, // `true` を指定すると、ローテートしたファイルを .gz 形式で圧縮してくれる
      numBackups: 30, // この数以上にログファイルが溜まると、古いファイルを削除してくれる
    },
  },
  categories: {
    // 標準出力とファイルの両方に出力する
    default: {
      appenders: ["stdout", "system"],
      level: "debug",
    },
  },
};

export { config };