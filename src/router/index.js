import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '华数网管系统' },
            children:[
                {
                    path: '/index',
                    component: resolve => require(['../components/page/index/index.vue'], resolve),
                    meta: { title: '首页' }
                },
                {
                    path: '/allCount',
                    component: resolve => require(['../components/page/allCount/allCount.vue'], resolve),
                    meta: { title: '总量统计' }
                },
                {
                    path: '/officeCount',
                    component: resolve => require(['../components/page/officeCount/officeCount.vue'], resolve),
                    meta: { title: '科室统计' }
                },
                {
                    path: '/putCount',
                    component: resolve => require(['../components/page/putCount/putCount.vue'], resolve),
                    meta: { title: '入库统计' }
                },
                {
                    path: '/outCount',
                    component: resolve => require(['../components/page/outCount/outCount.vue'], resolve),
                    meta: { title: '出库统计' }
                },
                {
                    path: '/traceCode',
                    component: resolve => require(['../components/page/traceCode/traceCode.vue'], resolve),
                    meta: { title: '溯源码申请' }
                },
                {
                    path: '/codeAnalyze',
                    component: resolve => require(['../components/page/codeAnalyze/codeAnalyze.vue'], resolve),
                    meta: { title: '溯源码统计分析' }
                },
                {
                    path: '/recycleList',
                    component: resolve => require(['../components/page/recycleList/recycleList.vue'], resolve),
                    meta: { title: '回收公司列表' }
                },
                {
                    path: '/jobList',
                    component: resolve => require(['../components/page/jobList/jobList.vue'], resolve),
                    meta: { title: '岗位列表' }
                },
                {
                    path: '/officeEdit',
                    component: resolve => require(['../components/page/officeEdit/officeEdit.vue'], resolve),
                    meta: { title: '科室编辑' }
                },
                {
                    path: '/personEdit',
                    component: resolve => require(['../components/page/personEdit/personEdit.vue'], resolve),
                    meta: { title: '人员编辑' }
                },
                {
                    path: '/operate',
                    component: resolve => require(['../components/page/operate/operate.vue'], resolve),
                    meta: { title: '补操作' }
                },
                {
                    path: '/unNormal',
                    component: resolve => require(['../components/page/unNormal/unNormal.vue'], resolve),
                    meta: { title: '异常记录' }
                },
                {
                    path: '/carList',
                    component: resolve => require(['../components/page/carList/carList.vue'], resolve),
                    meta: { title: '车辆管理' }
                },
                {
                    path: '/warnValue',
                    component: resolve => require(['../components/page/warnValue/warnValue.vue'], resolve),
                    meta: { title: '警戒值' }
                },
                {
                    path: '/nameSet',
                    component: resolve => require(['../components/page/nameSet/nameSet.vue'], resolve),
                    meta: { title: '名称设置' }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
