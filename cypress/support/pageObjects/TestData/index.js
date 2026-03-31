import { ProposalData } from './proposalData';
import { CollateralData } from './collateralData';
import { DocumentData } from './documentData';
import { AttachmentData } from './attachmentData';
import { AOFIFormData } from './aofiFormData';
import { RiskData } from './riskData';

// Note: Object.assign on class instances does not copy prototype methods.
// We merge prototype methods explicitly so getTestData.methodName() works.
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

export const getTestData = assignWithPrototype(
  {},
  new ProposalData(),
  new CollateralData(),
  new DocumentData(),
  new AttachmentData(),
  new AOFIFormData(),
  new RiskData()
);
