<template>
    <f7-page>
        <f7-block style="margin:50px 0px 50px 0px;background-color:#ffffff;padding:0 15px 0px 5px;">
            <f7-grid>
                <f7-col width=33 @click.native="onClickIcon(1)">
                    <img class="home_icon_img" src='/static/client/home/item1.jpg'>
                </f7-col>
                <f7-col width=33 @click.native="onClickIcon(2)">
                    <img class="home_icon_img" src='/static/client/home/item2.png'>
                </f7-col>
            </f7-grid>
        </f7-block>
        <f7-card>
            <f7-card-content style="height:200px;text-align:center">月子初体验</f7-card-content>
        </f7-card>
        <f7-swiper :params="{slidesPerView: 3, spaceBetween: 10}" pagination  scrollbar style="height:100px">
            <f7-swiper-slide v-for="n in meun" :key="n.id" class="bg-white color-black" @click.native='onSelectMeun(n)'>{{n.name}}</f7-swiper-slide>
        </f7-swiper>
    </f7-page>
</template>
<script>
export default {
    name: 'home',
    data() {
        return {
            meun: [{id:1,name:'催乳师'}, {id:2,name:'新生儿专家'}, {id:3,name:'妇产科专家'}, {id:4,name:'营养调理师'}]
        }
    },
    methods: {
        onClickIcon(index) {

        },
        onSelectMeun(n) {
            console.log(n)
            this.$router.push({name:'adpage',params:{m:n}})
        }
    },
}
</script>
