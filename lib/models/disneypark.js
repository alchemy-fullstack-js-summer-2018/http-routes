/* MODEL */

module.exports = {
    get(id) {
        return id ? this.getOne(id) : this.getAll();
    },
    getAll() {
        return { name: 'DLR' };
    }
    getOne() {
        return { name: 'DLR' };
    }
};