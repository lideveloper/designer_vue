<template>
  <div class="content">
    <el-tabs :tab-position="'top'" v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="未邀约" name="01"></el-tab-pane>
      <el-tab-pane label="已邀约" name="102"></el-tab-pane>
      <el-tab-pane label="比价中" name="701"></el-tab-pane>
      <el-tab-pane label="拟合同" name="a01"></el-tab-pane>
      <el-tab-pane label="收尾款" name="e01"></el-tab-pane>
      <el-tab-pane label="摆场中" name="h01"></el-tab-pane>
      <el-tab-pane label="已完成" name="i01"></el-tab-pane>
    </el-tabs>
    <div class="body">
      <div class="search-area">
        <span>签约时间：</span>
        <el-date-picker
          v-model="search_start"
          size="small"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <span>至</span>
        <el-date-picker
          v-model="search_end"
          type="date"
          size="small"
          placeholder="选择日期">
        </el-date-picker>
        <span>失效期限:</span>
        <me-select @valueChange="valueChange" :init-value="search_deadline" type-code="1"></me-select>
        <div class="search-button-area">
          <el-button plain @click="refresh">查询</el-button>
          <el-button plain @click="reset">重置</el-button>
        </div>
      </div>
      <div class="table-area" ref="table-area">
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          :height="tableHeight"
          style="width: 100%">

          <el-table-column
            type="index"
            label="序号"
            width="50">
          </el-table-column>

          <el-table-column
            label="姓名"
            width="180">
            <template slot-scope="scope">
              <span style="color: #72ACE3;cursor: pointer" @click="openDetail(scope.row.ID)">{{ scope.row.Name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="Phone"
            label="电话"
            width="180">
          </el-table-column>
          <el-table-column
            prop="Address"
            label="项目地址">
          </el-table-column>
          <el-table-column
            prop="ReceiveTime"
            label="交房时间"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.ReceiveTime | date('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="activeName!='102'&&activeName!='i01'"
            label="失效期限"
            width="180">
            <template slot-scope="scope">
              <span :style="expiredColor(scope.row.expired)">{{ scope.row.expired | expiredShow}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        loading: false, //网格loading状态
        isShow: false,
        tableHeight: 0,//网格高度
        activeName: this.$route.query.status ? this.$route.query.status : '01',//激活的tab状态
        search_start: "",//搜索开始日期
        search_end: "",//搜索截至日期
        search_deadline: '',//搜索状态
        pageSize: 10,
        currPage: 1,
        total: 0,
        tableData: []
      }
    },
    methods: {
      //数据字典选择后回调方法
      valueChange: function (val) {
        this.search_deadline = val;
      },
      reset: function () {
        this.search_start = '';
        this.search_end = '';
        this.search_deadline = '';
      },
      tabClick: function (val) {
        /*this.status = val;*/
        this.refresh();
      },
      handleSizeChange: function (val) {
        this.pageSize = val;
        this.refresh();
      },
      handleCurrentChange: function (val) {
        this.currPage = val;
        this.refresh();
      },
      refresh: function () {
        var params = {
          userId: 1,
          status: this.activeName,
          receiveTimeFrom: this.search_start ? this.$format(this.search_start) : '',
          receiveTimeTo: this.search_end ? this.$format(this.search_end) : '',
          expired: this.search_deadline,
          pageSize: this.pageSize,
          currPage: this.currPage,
          total: this.total
        };
        var _this = this;
        this.loading = true;
        this.$axios.post("/displayworker/getDisplayWorkerTasks", params)
          .then(function (response) {
            _this.loading = false;
            var data = response.data;
            _this.total = data.totalRecord;
            _this.tableData = data.results;
          }).catch(function (response) {
          _this.loading = false;
        });

      },
      expiredColor: function (expired) {
        expired = parseInt(expired);
        if (expired > 5) {
          return {};
        } else if (expired > 3) {
          return {
            color: '#ff9e9b'
          };
        } else if (expired > 1) {
          return {
            color: '#ff625f'
          };
        } else {
          return {
            color: '#ff0000'
          };
        }
      },
      openDetail: function (id) {
        if (this.activeName == '01') {
          this.$router.push({name: "noinvited", params: {id: id}})
        }
      }
    },
    filters: {
      expiredShow: function (value) {
        var expired = parseInt(value);
        if (expired > 5) {
          return '正常';
        } else if (expired < 0) {
          return '已超期' + Math.abs(expired) + '天';
        } else {
          return expired + '天';
        }
      }
    },
    mounted: function () {
      const that = this;
      that.tableHeight = that.$refs["table-area"]['offsetHeight'] - 2;
      window.onresize = function () {
        that.tableHeight = that.$refs["table-area"]['offsetHeight'] - 2;
      }
      this.refresh();
    }
  }
</script>

<style scoped>
  .el-tabs {
    width: 100%;
    display: block;
    height: 35px;
  }
</style>
