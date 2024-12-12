
const checkForDuplicates = (array, key) => {
    const seen = new Set();
    const duplicates = [];
    array.forEach((item) => {
        const value = key ? item[key] : item;
        if (seen.has(value)) {
            duplicates.push(item);
        } else {
            seen.add(value);
        }
    });
    return duplicates;
};

module.exports = checkForDuplicates;
