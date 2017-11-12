import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import frame from '@/components/frame/frame'
import systemIndex from '@/components/system/index'
import organizationIndex from '@/components/organization/index'
import userIndex from '@/components/user/index'
import roleIndex from '@/components/role/index'
import permissionIndex from '@/components/permission/index'
import sessionIndex from '@/components/session/index'
import logIndex from '@/components/log/index'

Vue.use(Router)

export default new Router({

  routes: [
    {
      path: '/',
      redirect: {name:'登录页'}
    },
    {
      path: '/login',
      name: '登录页',
      component: login
    },
    {
      path: "/frame",
      name: "菜单框架",
      component: frame,
      children: [
        {
          path: 'manage/system/index',
          meta:{
            title: '系统管理',
          },
          name:'2',
          component: systemIndex
        },
        {
          path: 'manage/organization/index',
          meta:{
            title: '组织管理',
          },
          name:'3',
          component: organizationIndex
        },
        {
          path: 'manage/user/index',
          meta:{
            title: '用户管理',
          },
          name:'6',
          component: userIndex
        },
        {
          path: 'manage/role/index',
          meta:{
            title: '角色管理',
          },
          name:'5',
          component: roleIndex
        },
        {
          path: 'manage/permission/index',
          meta:{
            title: '权限管理',
          },
          name:'39',
          component: permissionIndex
        },
        {
          path: 'manage/session/index',
          meta:{
            title: '回话管理',
          },
          name:'14',
          component: sessionIndex
        },
        {
          path: 'manage/log/index',
          meta:{
            title: '日志记录',
          },
          name:'15',
          component: logIndex
        }
      ]
    }
  ]
})

