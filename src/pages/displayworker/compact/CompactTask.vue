<template>
  <div class="content">
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
        <span>合同类型：</span>
        <me-select @valueChange="valueChange" :init-value="search_compacttype" type-code="2"></me-select>
        <!--<span>合同号:</span>-->
        <el-input v-model="search_compactno" size="small" placeholder="合同号"></el-input>
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
            prop="Name"
            label="姓名"
            width="180">

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
            label="签约时间"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.ReceiveTime | date('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="DesignHtNo"
            label="设计合同"
            width="180">
            <template slot-scope="scope">
              <span style="color: #72ACE3;cursor: pointer"
                    @click="openDesignCompact(scope.row.ID)">{{ scope.row.DesignHtNo}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="PurchaseHtNo"
            label="采购合同"
            width="180">
            <template slot-scope="scope">
              <span style="color: #72ACE3;cursor: pointer"
                    @click="openPurchaseCompact(scope.row.ID)">{{ scope.row.PurchaseHtNo}}</span>
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
        tableHeight: 0,//网格高度
        search_start: "",//搜索开始日期
        search_end: "",//搜索截至日期
        search_compacttype: '',//合同类型
        search_compactno: '',//合同单号
        pageSize: 10,
        currPage: 1,
        total: 0,
        tableData: []
      }
    },
    methods: {
      //数据字典选择后回调方法
      valueChange: function (val) {
        this.search_compacttype = val;
      },
      reset: function () {
        this.search_start = '';
        this.search_end = '';
        this.search_compacttype = '';
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
          receiveTimeFrom: this.search_start ? this.$format(this.search_start) : '',
          receiveTimeTo: this.search_end ? this.$format(this.search_end) : '',
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
      openDesignCompact: function (id) {

      },
      openPurchaseCompact: function (id) {

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

</style>
