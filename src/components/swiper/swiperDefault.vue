<template>
    <div>
        <swiper class="swipe" :options="swiperOption">
            <swiper-slide v-for="(item,index) in slide" :key="index">
                slide{{item}}
            </swiper-slide>
           
        </swiper>
         <div class="point" slot="pagination"></div>
    </div>
</template>

<script>
import "swiper/dist/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";
    export default {
        data() {
            return {
                slide: [1,2,3,4,5,6],
                swiperOption:{
                    loop:true,
                    // direction:"vertical",
                    pagination:{
                        el:".point",
                        clickable:true,
                    }
                }
            }
        },
        components:{
            swiper, swiperSlide
        }
    }
</script>

<style scoped>
.swipe{
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    background-color: bisque;

}

</style>