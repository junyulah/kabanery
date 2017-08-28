'use strict';

let uuidv4 = require('uuid/v4');

let seed = uuidv4();

module.exports = {
    eventMapHook: `__eventMap_${seed}`,
    globalEventTypePrefix: `__event_type_id_${seed}_`,
    stopPropagationFlag: '__stopPropagation'
};
