import { delay } from 'app/common/util/util';
import { sampleData } from 'app/api/sample-data';

export function fetchSampleData() {
  return delay(2000).then(function () {
    return Promise.resolve(sampleData);
  });
}
