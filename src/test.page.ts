export default class {
  public meta() {
    return {
      template: 'default',
      slug: '/',
      title: '',
      keywords: '',
      description: '',
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
