module.exports = () => {
  const methods = [
    ['compile', 'pages'],

    ['styles', 'pages'],
    // ['styles', 'templates'],
    // ['styles', 'assets'],

    // ['scripts', 'pages'],
    // ['scripts', 'templates'],
    // ['scripts', 'assets'],
  ];

  methods.forEach((method) => {
    console.log(method);
    require(`./${method[0]}/methods/${method[0]}-${method[1]}`)();
  });
};
