import { InstanceAdvisorSelectionTubeIQ } from './instanceParts/InstanceAdvisorSelectionTubeIQ';
import { InstanceCollateralTubeIQ } from './instanceParts/InstanceCollateralTubeIQ';
import { InstanceActionsTubeIQ } from './instanceParts/InstanceActionsTubeIQ';
import { InstanceDocumentsTubeIQ } from './instanceParts/InstanceDocumentsTubeIQ';
import { InstanceRiskOpinionTubeIQ } from './instanceParts/InstanceRiskOpinionTubeIQ';

// Object.assign on class instances does not copy prototype methods.
// We merge prototype methods explicitly so onTubeIQInstanceView.methodName() works.
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

export const onTubeIQInstanceView = assignWithPrototype(
  {},
  new InstanceAdvisorSelectionTubeIQ(),
  new InstanceCollateralTubeIQ(),
  new InstanceActionsTubeIQ(),
  new InstanceDocumentsTubeIQ(),
  new InstanceRiskOpinionTubeIQ()
);
