export namespace HomePage {
  export const config: PageConfig = {
    template: 'default',
    slug: '/',
    meta: {
      title: '',
    },
    title: 'Home Page',
    test: '123',
  };

  export const model = {
    foo: 'bar',
  };

  export function runtime() {
    console.log(1);
  }
}
