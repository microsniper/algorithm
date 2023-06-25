<template>
  <div class="div">
    <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
      <el-form-item label="题目" prop="topic">
        <el-input v-model="formInline.topic" placeholder="题目"></el-input>
      </el-form-item>
      <el-form-item label="难度" prop="difficulty" >
        <el-select v-model="formInline.difficulty" placeholder="请选择题目难度">
          <el-option label="简单" value="简单"></el-option>
          <el-option label="中等" value="中等"></el-option>
          <el-option label="困难" value="困难"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getAlgorithmList()">查询</el-button>
        <el-button  type="success" @click="resetForm">清空</el-button>
      </el-form-item>
    </el-form>

    <el-button type="primary" class="button" @click="addOrUpdate(undefined)">添加</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
      stripe
      v-loading="dataListLoading"
      height="500"
    >
      <el-table-column
        type="index"
        :index="indexMethod">
      </el-table-column>
      <el-table-column
        prop="topic"
        label="题目"
        width="150">
      </el-table-column>
      <el-table-column
        prop="difficulty"
        label="难度"
        width="50">
      </el-table-column>
      <el-table-column
        prop="content"
        label="描述"
        width="140">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p v-html="scope.row.content">内容</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" v-if="scope.row.content">{{ scope.row.content }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="example"
        label="示例"
        width="140">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p v-html="scope.row.example"></p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" v-if="scope.row.example">{{ scope.row.example }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="tip"
        label="提示"
        width="140">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p v-html="scope.row.tip"></p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" v-if="scope.row.tip">{{ scope.row.tip }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="result"
        label="返回值"
        width="100">
      </el-table-column>
      <el-table-column
        prop="param"
        label="参数"
        width="100">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p v-html="scope.row.param"></p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" v-if="scope.row.param">{{ scope.row.param }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        width="140">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p v-html="scope.row.remark"></p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" v-if="scope.row.remark">{{ scope.row.remark }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="创建日期"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime | dataFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="修改日期"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.updateTime | dataFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="addOrUpdate(scope.row.algorithmId)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block page">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="formInline.pageNum"
        :page-sizes="[4,6,8,10,12,14]"
        :page-size="formInline.pageSize"
        layout="sizes, prev, pager, next, total"
        :total="total">
      </el-pagination>
    </div>
    <add-or-update v-if="visible" ref="addOrUpdate" @refreshList="getAlgorithmList"></add-or-update>
  </div>
</template>

<script>
import {list, del} from "../../api/list";
import AddOrUpdate from "./add-or-update.vue";

export default {
  name: "list",
  components: {AddOrUpdate},
  data() {
    return {
      formInline: {
        topic: '',
        difficulty: '',
        pageNum: 1,
        pageSize: 8
      },
      tableData: [],
      visible: false,
      dataListLoading: false,
      total: 0,
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    // 列表
    getAlgorithmList() {
      this.dataListLoading = true
      list(this.formInline).then(res => {
        let result = res.data;
        if (result.status === 1000) {
          this.tableData = result.data.records;
          this.total = result.data.total;
        } else {
          this.tableData = []
          this.total = 0
        }
      })
      this.dataListLoading = false
    },
    handleCurrentChange(val) {
      this.formInline.pageNum = val
      this.getAlgorithmList()
      console.log(`当前页: ${val}`);
    },
    handleSizeChange(val){
      this.formInline.pageSize = val
      this.getAlgorithmList()
      console.log(`每页大小: ${val}`)
    },
    resetForm(){
      this.$refs['formInline'].resetFields()
    },
    addOrUpdate(id) {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    handleDelete(algorithm) {

      this.$confirm(`确定要删除【${algorithm.topic}】的题目吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(algorithm.algorithmId).then(res => {
          let result = res.data
          if (result.status === 1000) {
            this.$message({
              message: `题目为【${algorithm.topic}】，已删除成功`,
              type: "success",
              duration: 1500
            })
            this.getAlgorithmList();
          } else {
            this.$message({
              message: result.message,
              type: "error"
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  created() {
    this.getAlgorithmList();
  }
}
</script>

<style scoped>
.button {
  margin-left: 80%;
}
.page{
  margin-left: 60%;
  margin-top: 15px;
}
</style>
