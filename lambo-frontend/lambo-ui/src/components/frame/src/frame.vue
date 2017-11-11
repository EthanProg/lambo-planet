<style lang="less">
    @import "../styles/css/frame.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': hideMenuText}">
        <div class="sidebar-menu-con" :style="{width: hideMenuText?'60px':'200px', overflow: hideMenuText ? 'visible' : 'auto', background: menuTheme === 'dark'?'#495060':'white'}">
            <div class="logo-con">
                <img v-show="!hideMenuText"  :src="logoPath ? logoPath : defaultLogo" key="max-logo" />
                <img v-show="hideMenuText" :src="minLogoPath ? minLogoPath : defaultMinLogo" key="min-logo" />
            </div>
            <sidebar-menu v-if="!hideMenuText"
              :menuList="menuList" :menuTheme="menuTheme"
              :iconSize="14" @currentPath = "changeCurrentPath"
              @pageOpenedList = "changePageOpenedList" @currentPageName = "changeCurrentPageName"
            />
            <sidebar-menu-shrink v-else
                :icon-color="menuIconColor" :menuTheme="menuTheme"
                :menuList="menuList" @currentPath = "changeCurrentPath"
                @pageOpenedList = "changePageOpenedList" @currentPageName = "changeCurrentPageName"
            />
        </div>
        <div class="main-header-con" :style="{paddingLeft: hideMenuText?'60px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (hideMenuText ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>
                <div class="header-avator-con">
                    <div @click="goUiDoc" class="tool-btn-con">
                        <Tooltip content="ui文档" placement="bottom">
                            <Icon type="ios-navigate-outline" :size="22"></Icon>
                        </Tooltip>
                    </div>
                    <div @click="goDubbo" class="tool-btn-con">
                        <Tooltip content="dubbo监控台" placement="bottom">
                            <Icon type="android-stopwatch" :size="22"></Icon>
                        </Tooltip>
                    </div>
                    <div @click="goSwagger" class="tool-btn-con">
                        <Tooltip content="后台接口文档" placement="bottom">
                            <Icon type="ios-paper-outline" :size="22"></Icon>
                        </Tooltip>
                    </div>
                    <div @click="handleFullScreen" v-if="showFullScreenBtn" class="tool-btn-con">
                        <Tooltip :content="isFullScreen ? '退出全屏' : '全屏'" placement="bottom">
                            <Icon :type="isFullScreen ? 'arrow-shrink' : 'arrow-expand'" :size="23"></Icon>
                        </Tooltip>
                    </div>
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem v-for="item in dropItem" :name="item.id">{{item.name}}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar :src="avatarPath ? avatarPath : defaultImg" style="background: #619fe7;margin-left: 10px;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
            <div class="tags-con">
                <tags-page-opened :pageOpenedList="pageOpenedList" :currentPageName="currentPageName"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: hideMenuText?'60px':'200px'}">
            <div class="single-page">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
    import sidebarMenu from './main_components/sidebarMenu.vue';
    import tagsPageOpened from './main_components/tagsPageOpened.vue';
    import breadcrumbNav from './main_components/breadcrumbNav.vue';
    import themeDropdownMenu from './main_components/themeDropdownMenu.vue';
    import sidebarMenuShrink from './main_components/sidebarMenuShrink.vue';
    import Cookies from 'js-cookie';
    import avatarImg from '../styles/images/avatar.jpg';
    import logoImg from '../styles/images/logo.jpg';
    import minLogoImg from '../styles/images/logo-min.jpg';

    export default {
        components: {
            sidebarMenu,
            tagsPageOpened,
            breadcrumbNav,
            themeDropdownMenu,
            sidebarMenuShrink
        },
        props:{
            menuList : Array,
            logoPath:String,
            minLogoPath:String,

            avatarPath : String,
            userId: String,
            userName: String,
            dropItem:Array,
        },
        data () {
            return {
                spanLeft: 4,
                spanRight: 20,
                currentPageName: 0,
                hideMenuText: false,
                showFullScreenBtn: window.navigator.userAgent.indexOf('MSIE') < 0,
                lockScreenSize: 0,
                defaultImg:avatarImg,
                defaultLogo:logoImg,
                defaultMinLogo:minLogoImg,
                isFullScreen:false,
                currentPath:[],
                pageOpenedList:[],
                tagsList:[],
            };
        },
        computed: {
            menuTheme(){
                return localStorage.menuTheme ? localStorage.menuTheme : 'dark';
            },
            menuIconColor(){
                return localStorage.menuTheme === 'dark' ? 'white' : '#495060';
            }
        },
        methods: {
            init () {
                // 问候信息相关
                if (!Cookies.get('hasGreet')) {
                    let now = new Date();
                    let hour = now.getHours();
                    let greetingWord = {
                        title: '',
                        words: ''
                    };
                    let userName = Cookies.get('user');
                    if (hour > 5 && hour < 6) {
                        greetingWord = {title: '凌晨好~' + userName, words: '早起的鸟儿有虫吃~'};
                    } else if (hour >= 6 && hour < 9) {
                        greetingWord = {title: '早上好~' + userName, words: '来一杯咖啡开启美好的一天~'};
                    } else if (hour >= 9 && hour < 12) {
                        greetingWord = {title: '上午好~' + userName, words: '工作要加油哦~'};
                    } else if (hour >= 12 && hour < 14) {
                        greetingWord = {title: '中午好~' + userName, words: '午饭要吃饱~'};
                    } else if (hour >= 14 && hour < 17) {
                        greetingWord = {title: '下午好~' + userName, words: '下午也要活力满满哦~'};
                    } else if (hour >= 17 && hour < 19) {
                        greetingWord = {title: '傍晚好~' + userName, words: '下班没事问候下爸妈吧~'};
                    } else if (hour >= 19 && hour < 21) {
                        greetingWord = {title: '晚上好~' + userName, words: '工作之余品一品书香吧~'};
                    } else {
                        greetingWord = {title: '深夜好~' + userName, words: '夜深了，注意休息哦~'};
                    }
                    this.$Notice.config({
                        top: 130
                    });
                    this.$Notice.info({
                        title: greetingWord.title,
                        desc: greetingWord.words,
                        duration: 4,
                        name: 'greeting'
                    });
                    Cookies.set('hasGreet', 1);
                }
                //初始化变量
                this.currentPath = localStorage.currentPath ? JSON.parse(localStorage.currentPath) : [];
                this.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [];
                this.currentPageName = localStorage.currentPageName ? localStorage.currentPageName*1 : 0;
            },
            toggleClick () {
                this.hideMenuText = !this.hideMenuText;
            },
            changeCurrentPath(data){
                this.currentPath = data;
            },
            changePageOpenedList(data){
                this.pageOpenedList = data;
            },
            changeCurrentPageName(data){
                this.currentPageName = data;
            },
            handleFullScreen(){
                var main = document.body;
                if (this.isFullScreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (main.requestFullscreen) {
                        main.requestFullscreen();
                    } else if (main.mozRequestFullScreen) {
                        main.mozRequestFullScreen();
                    } else if (main.webkitRequestFullScreen) {
                        main.webkitRequestFullScreen();
                    } else if (main.msRequestFullscreen) {
                        main.msRequestFullscreen();
                    }
                }
            },
            handleClickUserDropdown(name){
                this.$emit("dropAction",name);
            },
            goSwagger() {
                window.open("http://127.0.0.1:1111/swagger-ui.html");
            },
            goUiDoc(){
                window.open("https://www.iviewui.com/");
            },
            goDubbo(){
                window.open("http://127.0.0.1:8091");
            },
            setTagsList(menuList){
                for(var i=0;i<menuList.length;i++){
                    if(menuList[i].children){
                        this.setTagsList(menuList[i].children);
                    }else{
                        this.tagsList.push(menuList[i]);
                    }
                }
            }
        },
        watch: {
            menuList(data){
                if(data){
                    localStorage.menuList = JSON.stringify(data);
                    this.setTagsList(data);
                    localStorage.tagsList = JSON.stringify(this.tagsList);
                }
            }
        },
        mounted () {
            this.init();
        }
    };
</script>