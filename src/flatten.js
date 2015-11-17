/**
 * Flattens a nested object into a non nested object, using '.' separators.
 *
 * Example:
 *
 * Calling    : flatten({a:{b:{c:1}}})
 * Results in : Object {a.b.c: 1}
 *
 * Use unflatten() to retrieve original object.
 *
 * @param {object} data
 * @param {string|null} numericPropertyPrefix If an object property is numeric, prefix the entry with this value.
 * @returns {{}}
 */
function flatten(data, numericPropertyPrefix) {
    var result = {};
    numericPropertyPrefix = !!numericPropertyPrefix ? numericPropertyPrefix : '~';

    function recurse(cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
            for (var i = 0, l = cur.length; i < l; i++) {
                recurse(cur[i], prop ? prop + "." + i : "" + i);
            }
            if (l == 0) {
                result[prop] = [];
            }
        } else {
            var isEmpty = true, k;
            for (var p in cur) {
                isEmpty = false;
                k = ((typeof p === 'string' && !isNaN(parseInt(p))) ? numericPropertyPrefix + p : p);
                recurse(cur[p], prop ? prop + "." + k : k);
            }
            if (isEmpty) {
                result[prop] = {};
            }
        }
    }

    recurse(data, "");
    return result;
}

/**
 * Unflatten a flattened object/array.
 *
 * Example:
 * Calling    : unflatten({'a.b.c':1})
 * Results in : {a:{b:{c:1}}}
 *
 * You can supply a set of separators and they will be used in turn.
 *
 * @param {object|array} data
 * @param {string|null} numericPropertyPrefix Any object property keys prefixed with this value will be treated as a string/property and not an array index.
 * @param {string[]|null} separators
 * @param {string|null} defaultSeparator
 * @returns {*}
 */
function unflatten(data, numericPropertyPrefix , separators, defaultSeparator) {
    if (Object(data) !== data || Array.isArray(data)) {
        return data;
    }
    numericPropertyPrefix = !!numericPropertyPrefix ? numericPropertyPrefix : '~';
    defaultSeparator = !!defaultSeparator ? defaultSeparator : '.';
    separators = !!separators ? separators : [];
    var result = {}, cur, prop, idx, last, temp;
    for (var p in data) {
        var count = 0;
        cur = result, prop = "", last = 0;
        do {
            idx = p.indexOf(count < separators.length ? separators[count++] : defaultSeparator, last);
            temp = p.substring(last, idx !== -1 ? idx : undefined);
            cur = cur[prop] || (cur[prop] = (!isNaN(parseInt(temp)) ? [] : {}));
            prop = (p.indexOf(numericPropertyPrefix) != -1) ? temp.replace(numericPropertyPrefix, '').toString() : temp;
            last = idx + 1;
        } while (idx >= 0);
        cur[prop] = data[p];
    }
    return result[""];
}
