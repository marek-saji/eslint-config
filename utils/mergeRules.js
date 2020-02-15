function mergeRules (rule, ...rest)
{
    const newRule = JSON.parse(JSON.stringify(rule));
    if (typeof newRule[1] === 'object')
    {
        newRule.splice(1, 0, undefined);
    }
    if (newRule[2] === undefined)
    {
        newRule.push({});
    }

    if (typeof rest[0] === 'string')
    {
        newRule[0] = rest.shift();
    }

    if (typeof rest[0] !== 'object')
    {
        newRule[1] = rest.shift();
    }

    if (typeof rest[0] === 'object')
    {
        Object.assign(newRule[2], rest.shift());
    }

    if (Object.keys(newRule[2]).length === 0)
    {
        newRule.splice(2, 1);
    }

    if (newRule[1] === undefined)
    {
        newRule.splice(1, 1);
    }

    return newRule;
}

module.exports = mergeRules;
