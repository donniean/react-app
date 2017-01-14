const store = {
    get: function() {
        const json = localStorage.getItem("todos");
        const list = JSON.parse(json) || [];
        return list;
    },
    set: function(list) {
        localStorage.setItem("todos", JSON.stringify(list));
    },
    find: function(id) {
        const self = this;
        const list = self.get();
        for (let i = 0, len = list.length; i < len; i++) {
            const item = list[i] || {};
            if (id === item.id) {
                return i;
            }
        }
    },
    add: function(newItem) {
        const self = this;
        const list = self.get();
        list.push(newItem);
        self.set(list);
    },
    del: function(id) {
        const self = this;
        const list = self.get();
        const index = self.find(id);
        list.splice(index, 1);
        self.set(list);
    },
    update: function(newItem) {
        const self = this;
        const list = self.get();
        const id = newItem.id;
        const index = self.find(id);
        list.splice(index, 1, newItem);
        self.set(list);
    },
    filter: function(status) {
        const self = this;
        const list = self.get();
        if (status) {
            if (status === "All") {
                return list;
            } else {
                return list.filter(function(item) {
                    return item.status === status;
                });
            }
        } else {
            return list;
        }
    },
    getCount: function(status) {
        const self = this;
        const list = self.filter(status);
        return list.length;
    },
    isAllTheSameStatus: function(status) {
        const self = this;
        const list = self.get();
        return list.every(function(item) {
            return item.status === status;
        });
    },
    hasStatus: function(status) {
        const self = this;
        const list = self.get();
        return list.some(function(item) {
            return item.status === status;
        });
    },
    changeAllStatus: function(status) {
        const self = this;
        const list = self.get();
        for (let i = 0, len = list.length; i < len; i++) {
            list[i].status = status;
        }
        self.set(list);
    },
    clear: function(status) {
        const self = this;
        let list = self.get();
        if (status) {
            list = list.filter(function(item) {
                return item.status !== status;
            });
        } else {
            list = [];
        }
        self.set(list);
    }
};

export default store;
