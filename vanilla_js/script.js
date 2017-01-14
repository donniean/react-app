(function() {
    /* 数据处理 */
    var todos = {
        get: function() {
            var json = localStorage.getItem("todos");
            var list = JSON.parse(json) || [];
            return list;
        },
        set: function(list) {
            localStorage.setItem("todos", JSON.stringify(list));
        },
        find: function(id) {
            var self = this;
            var list = self.get();
            for (var i = 0, len = list.length; i < len; i++) {
                var item = list[i] || {};
                if (id === item.id) {
                    return i;
                }
            }
        },
        add: function(newItem) {
            var self = this;
            var list = self.get();
            list.push(newItem);
            self.set(list);
        },
        del: function(id) {
            var self = this;
            var list = self.get();
            var index = self.find(id);
            list.splice(index, 1);
            self.set(list);
        },
        update: function(newItem) {
            var self = this;
            var list = self.get();
            var id = newItem.id;
            var index = self.find(id);
            list.splice(index, 1, newItem);
            self.set(list);
        },
        filter: function(status) {
            var self = this;
            var list = self.get();
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
            var self = this;
            var list = self.filter(status);
            return list.length;
        },
        isAllTheSameStatus: function(status) {
            var self = this;
            var list = self.get();
            return list.every(function(item) {
                return item.status === status;
            });
        },
        hasStatus: function(status) {
            var self = this;
            var list = self.get();
            return list.some(function(item) {
                return item.status === status;
            });
        },
        changeAllStatus: function(status) {
            var self = this;
            var list = self.get();
            for (var i = 0, len = list.length; i < len; i++) {
                list[i].status = status;
            }
            self.set(list);
        },
        clear: function(status) {
            var self = this;
            var list = self.get();
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

    /* 视图 */
    var view = {
        init: function() {
            var self = this;
            self.updateList("All");
            self.addTodo();
            self.deleteTodo();
            self.updateTodo();
            self.changeStatus();
            self.changeAllStatus();
            self.showActiveStatusList();
            self.clearCompleted();
        },
        getlistElement: function() {
            return document.getElementById("list");
        },
        getTodo: function(itemElement) {
            var id = itemElement.id;
            var status = itemElement.getAttribute("data-status");
            var content = itemElement.getElementsByClassName("todo")[0].innerText;
            var todo = {
                id: id,
                status: status,
                content: content
            };
            return todo;
        },
        updateList: function(activeStatus) {
            var self = this;
            var listElement = self.getlistElement();
            var list = todos.filter(activeStatus);
            var htmlCodes = "";
            var arr = [];
            for (var i = 0, len = list.length; i < len; i++) {
                var item = list[i] || {};
                var id = item.id;
                var status = item.status;
                var content = item.content;
                var str = [
                    '<div id="' + id + '" class="item ' + status.toLowerCase() + '" data-status="' + status + '">',
                    '    <input type="checkbox" class="change-status" ' + (status === "Completed" ? "checked" : "") + ' />',
                    '    <label class="todo">' + content + '</label>',
                    '    <input type="text" class="todo hide" value="' + content + '" />',
                    '    <button type="button" class="delete hide">X</button>',
                    '</div>'
                ].join("");
                arr.push(str);
            }
            htmlCodes = arr.join("");
            listElement.innerHTML = htmlCodes;
            self.showDeleteButton();
            self.showFooter();
            self.updateActiveCount();
            self.showActiveButton(activeStatus);
            self.showClearCompletedButton();
        },
        addTodo: function() {
            var self = this;
            document.getElementById("addTodo").addEventListener("submit", function(e) {
                var newTodoElement = document.getElementById("newTodo");
                var id = String((new Date()).valueOf()); // 以时间戳作为id
                var status = "Active";
                var content = newTodoElement.value;
                var newItem = {
                    id: id,
                    status: status,
                    content: content
                };
                todos.add(newItem);
                self.updateList();
                newTodoElement.value = "";
                e.preventDefault();
            }, false);
        },
        deleteTodo: function() {
            var self = this;
            document.getElementById("list").addEventListener("click", function(e) {
                var target = e.target;
                if (target.tagName.toLowerCase() === "button" && target.className === "delete hide") {
                    var itemElement = target.parentNode;
                    var todo = self.getTodo(itemElement);
                    todos.del(todo.id);
                    self.updateList();
                }
            }, false);
        },
        updateTodo: function() {
            var self = this;
            document.getElementById("list").addEventListener("dblclick", function(e) {
                var target = e.target;
                var input = target.nextSibling.nextSibling;
                if (target.tagName.toLowerCase() === "label" && target.className === "todo") {
                    var content = input.value;
                    target.style.display = "none";
                    input.style.display = "inline-block";
                    input.focus();
                    input.value = content; // 光标在右边
                }
            }, false);
            document.getElementById("list").addEventListener("blur", function(e) {
                var target = e.target;
                var todo = target.previousSibling.previousSibling;
                if (target.tagName.toLowerCase() === "input" && target.className === "todo hide") {
                    var itemElement = target.parentNode;
                    target.style.display = "none";
                    todo.style.display = "inline-block";
                    todo.innerText = target.value;
                    var todo = self.getTodo(itemElement);
                    todos.update(todo);
                    self.updateList();
                }
            }, true);
        },
        changeStatus: function() {
            var self = this;
            document.getElementById("list").addEventListener("change", function(e) {
                var target = e.target;
                if (target.tagName.toLowerCase() === "input" && target.className === "change-status") {
                    var itemElement = target.parentNode;
                    if (target.checked) {
                        itemElement.setAttribute("data-status", "Completed");
                    } else {
                        itemElement.setAttribute("data-status", "Active");
                    }
                    var todo = self.getTodo(itemElement);
                    todos.update(todo);
                    self.updateList();
                }
            }, false);
        },
        showDeleteButton: function() {
            var self = this;
            var listElement = self.getlistElement();
            var items = document.getElementsByClassName("item");
            var arr = Array.prototype.slice.call(items); // 将HTMLCollection（Object）转换为Array
            for (var i = 0, len = arr.length; i < len; i++) {
                var item = arr[i];
                item.addEventListener("mouseover", function() {
                    var deleteButton = this.lastChild;
                    deleteButton.style.display = "inline-block";
                }, false);
                item.addEventListener("mouseout", function() {
                    var deleteButton = this.lastChild;
                    deleteButton.style.display = "none";
                }, false);
            }
        },
        changeAllStatus: function() {
            var self = this;
            document.getElementById("allCompleted").addEventListener("click", function() {
                var isAllCompleted = todos.isAllTheSameStatus("Completed");
                if (isAllCompleted) {
                    todos.changeAllStatus("Active");
                } else {
                    todos.changeAllStatus("Completed");
                }
                self.updateList();
            }, false);
        },
        showFooter: function() {
            var footer = document.getElementById("footer");
            if (todos.get().length > 0) {
                footer.style.display = "block";
            } else {
                footer.style.display = "none";
            }
        },
        updateActiveCount: function() {
            var activeCountElement = document.getElementById("activeCount");
            var activeCount = todos.getCount("Active");
            activeCountElement.innerText = activeCount;
        },
        showActiveStatusList: function() {
            var self = this;
            document.getElementById("footer").addEventListener("click", function(e) {
                var target = e.target;
                if (target.tagName.toLowerCase() === "a") {
                    var activeStatus = target.innerText;
                    self.updateList(activeStatus);
                }
            }, false);
        },
        showActiveButton: function(activeStatus) {
            var children = document.getElementById("footer").children;
            var childrenArray = Array.prototype.slice.call(children);
            for (var i = 0, len = childrenArray.length; i < len; i++) {
                var element = childrenArray[i];
                if (element.tagName.toLowerCase() === "a") {
                    element.style.color = "rgb(119, 119, 119)";
                    if (element.innerText === activeStatus) {
                        element.style.color = "red";
                    }
                }
            }
        },
        showClearCompletedButton: function() {
            var hasCompleted = todos.hasStatus("Completed");
            var clearCompletedButton = document.getElementById("clearCompleted");
            if (hasCompleted) {
                clearCompletedButton.style.display = "inline-block";
            } else {
                clearCompletedButton.style.display = "none";
            }
        },
        clearCompleted: function() {
            var self = this;
            document.getElementById("clearCompleted").addEventListener("click", function() {
                todos.clear("Completed");
                self.updateList();
            }, false);
        }
    };

    view.init();
})();
