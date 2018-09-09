const prodSourceMap = true;
const publicPath = '/';

const pageList = [
    {
        name: 'app', // 输出的js文件名
        title: 'Hello React', // 输出的html title
        filename: 'index', // 输入的jsx文件名，输出的html文件名
        template: 'index' // 模板名
    }
];

module.exports = { prodSourceMap, publicPath, pageList };
