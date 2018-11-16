import injector from 'vue-inject';

export class Service {
  public static getInstance() {
    let instance
    const key = this.name.replace(this.name.charAt(0), this.name.charAt(0).toLocaleLowerCase())

    if (!injector.$$factories[key]) {
      injector.service(key, this);
    }

    try {
      instance = injector.get(key)
    } catch (ex) {
      instance = new this()
    }
    return instance
  }
}
