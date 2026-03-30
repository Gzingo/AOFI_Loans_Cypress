import { LoginAssertions } from './loginAssertions';
import { AOFIPageAssertions } from './aofiPageAssertions';
import { AOFIDataAssertions } from './aofiDataAssertions';
import { AOFIPopupAssertions } from './aofiPopupAssertions';
import { TubeIQTaskAssertions } from './tubeiqTaskAssertions';
import { TubeIQInstanceAssertions } from './tubeiqInstanceAssertions';
import { TubeIQDocumentAssertions } from './tubeiqDocumentAssertions';

// Object.assign on class instances does not copy prototype methods.
// We merge prototype methods explicitly so Assert.methodName() works.
function assignWithPrototype(target, ...instances) {
  for (const instance of instances) {
    const proto = Object.getPrototypeOf(instance);
    for (const name of Object.getOwnPropertyNames(proto)) {
      if (name !== 'constructor' && typeof proto[name] === 'function') {
        target[name] = proto[name].bind(target);
      }
    }
  }
  return target;
}

export const Assert = assignWithPrototype(
  {},
  new LoginAssertions(),
  new AOFIPageAssertions(),
  new AOFIDataAssertions(),
  new AOFIPopupAssertions(),
  new TubeIQTaskAssertions(),
  new TubeIQInstanceAssertions(),
  new TubeIQDocumentAssertions()
);
