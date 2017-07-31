<template>
  <f7-page>
    <f7-list>
      <checkDetail :dataList='checkList'></checkDetail>
    </f7-list>
  </f7-page>
</template>

<script>
import checkDetail from "./checkDetail.vue";
import moment from 'moment'
export default {
  name: 'check',
  data() {
    return {
      checkList: [
        { data: 12, pre_data: '22222', act_data: '23333', con: 'iiejejdjjd', care: '但快点快点看', status: 1 },
        { data: 12, pre_data: '22222', act_data: '23333', con: 'iiejejdjjd', care: '但快点快点看', status: 1 },
        { data: 12, pre_data: '22222', act_data: '23333', con: 'iiejejdjjd', care: '但快点快点看', status: 1 }
      ]
    }
  },
  components: {
    "checkDetail": checkDetail
  }
}
</script>