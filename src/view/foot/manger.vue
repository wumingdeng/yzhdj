<template>
    <f7-page>
        <f7-navbar sliding>
            <f7-nav-left>
                <f7-link icon="icon-back color-black" @click="$router.push('/shoeDetail')"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding style="left:-22px;" title="我的管家"></f7-nav-center>
            <f7-nav-right></f7-nav-right>
        </f7-navbar>
         <f7-page-content style="margin-top:44px;">
        <foot></foot>
        </f7-page-content>
    </f7-page>
</template>
<script>
import foot from './Foot'
export default {
    data(){
        return
    },
    components: {
    'foot': foot
    },
}
</script>
