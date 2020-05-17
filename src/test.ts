export default class {
  // meta = {
  //   template: 'default',
  //   slug: '/',
  //   title: '',
  //   keywords: '',
  //   descripotion: '',
  // };

  // model = {
  //   foo: 'bar',
  // };
  public meta() {
    return {
      template: 'default',
      slug: '/',
      title: '',
      keywords: '',
      descripotion: '',
    };
  }

  public model() {
    return {
      foo: 'bar',
    };
  }

  public runtime() {
    const a = 1;
    console.log(a);
  }
}
