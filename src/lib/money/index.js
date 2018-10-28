// @flow
function format(value: number, precision: number = 2) {
    return value.toFixed(precision);
}

function formatRate(value: number) {
    return format(value, 4);
}

export default {
    format,
    formatRate,
};
