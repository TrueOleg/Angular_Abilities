export function safe(target: Object, propertyKey: string) {
  const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
  const originalMethod = descriptor.value;
  descriptor.value = function NoErrorWrapper() {
    try {
      originalMethod.apply(this, arguments);
    } catch (ex) {
      let message = ex.name + ' occured in call of ' +
        target.constructor.name + '.' + propertyKey + ': ' + ex.message + '\n';
      message += 'Arguments:\n';
      [].forEach.call(arguments, (x, i) =>
        message += '   [' + i + ']: ' + JSON.stringify(x) + ' \n');
      message += 'Callstack:' + ex.stack;
      console.error(message);
      document.body.innerHTML += '<br><pre style=\'color: red\'>' + message + '</pre>';
    }
  };
  Object.defineProperty(target, propertyKey, descriptor);
  return descriptor;
}

export function changeLog(target: Object, propertyKey: string) {
  const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
  const originalMethod = descriptor.value;
  descriptor.value = function changeLogWrapper(...args) {
    originalMethod.apply(this, arguments);
    const message = `Function ${propertyKey} say ${args[0]}! Decorator replied ${args[0].split('').reverse().join('')}`;
    document.body.innerHTML += '<br><pre style=\'color: green\'>' + message + '</pre>';
  };
  Object.defineProperty(target, propertyKey, descriptor);
  return descriptor;
}
