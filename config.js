const enableProductionSourceMap = false;

const pageList = [
    {
        name: 'app', // 输出的js文件名
        filename: 'index', // 输入的jsx文件名，输出的html文件名
        template: 'index' // 模板名
    }
];

const publicPath = '/';

module.exports = { pageList, enableProductionSourceMap, publicPath };
