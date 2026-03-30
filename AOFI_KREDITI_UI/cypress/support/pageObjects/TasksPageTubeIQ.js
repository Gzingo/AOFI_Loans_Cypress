import { TaskSearchTubeIQ } from './taskParts/TaskSearchTubeIQ';
import { TaskSelectionTubeIQ } from './taskParts/TaskSelectionTubeIQ';
import { TaskActionsTubeIQ } from './taskParts/TaskActionsTubeIQ';

// Object.assign on class instances does not copy prototype methods.
// We merge prototype methods explicitly so onTubeIQTasksPage.methodName() works.
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

export const onTubeIQTasksPage = assignWithPrototype(
  {},
  new TaskSearchTubeIQ(),
  new TaskSelectionTubeIQ(),
  new TaskActionsTubeIQ()
);
