<template>
  <div>
    <el-dialog
      :title="ruleForm.algorithmId ? '修改' : '新增'"
      :close-on-click-modal="false"
      :visible.sync="visible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm div">
        <el-form-item label="题目" prop="topic">
          <el-input v-model="ruleForm.topic"></el-input>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-select v-model="ruleForm.difficulty" placeholder="请选择题目难度">
            <el-option label="简单" value="简单"></el-option>
            <el-option label="中等" value="中等"></el-option>
            <el-option label="困难" value="困难"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="content">
          <el-input type="textarea" v-model="ruleForm.content" :rows="5"></el-input>
        </el-form-item>
        <el-form-item label="示例" prop="example">
          <el-input type="textarea" v-model="ruleForm.example" :rows="5"></el-input>
        </el-form-item>
        <el-form-item label="提示" prop="tip">
          <el-input type="textarea" v-model="ruleForm.tip" :rows="5"></el-input>
        </el-form-item>
        <el-form-item label="返回值" prop="result">
          <el-input v-model="ruleForm.result"></el-input>
        </el-form-item>
        <el-form-item label="参数" prop="param">
          <el-input v-model="ruleForm.param"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="ruleForm.remark" :rows="3"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {add, update, getOne} from "../../api/add-or-update";

export default {
  name: "add-or-update",
  data() {
    return {
      visible: false,
      ruleForm: {
        algorithmId: 0,
        topic: '',
        difficulty: '简单',
        content: '',
        example: '',
        tip: '',
        result: '',
        param: '',
        remark: ''
      },
      rules: {
        topic: [
          {required: true, message: '请输入题目', trigger: 'blur'},
          {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
        ],
        region: [
          {difficulty: true, message: '请选择题目难度', trigger: 'change'}
        ],
        content: [
          {required: true, message: '请填写描述', trigger: 'blur'}
        ],
        example: [
          {required: true, message: '请填写示例', trigger: 'blur'}
        ],
        tip: [
          {required: true, message: '请填写提示', trigger: 'blur'}
        ],
        result: [
          {required: true, message: '请填写方法返回值', trigger: 'blur'}
        ],
        param: [
          {required: true, message: '请填写方法参数', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.algorithmId) {
            // 修改
            update(this.ruleForm).then(res => {
              let result = res.data;
              if (result.status === 1000) {
                this.$message({
                  message: '修改成功',
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshList')
                  }
                })

              } else {
                this.$message({
                  message: result.message,
                  type: "error"
                })
              }
            })
          } else {
            add(this.ruleForm).then(res => {
              if (res.data.status === 1000) {
                this.$message({
                  message: '添加成功',
                  type: "success",
                  duration: 1500,
                  onClose: () =>{
                    this.visible = false
                    this.$emit('refreshList')
                  }
                })
              } else {
                this.$message({
                  message: res.data.message,
                  type: "error"
                })
              }
            })
          }
        } else {
          this.$message({
            message: '请输入内容',
            type: "error"
          })
          return false;
        }
      });
    },
    resetForm() {
      this.$refs['ruleForm'].resetFields()
      this.ruleForm.difficulty = '简单'
    },
    init(id) {
      console.log("id",id)
      this.ruleForm.algorithmId = id || 0
      this.$nextTick(() =>{
        if (this.$refs['ruleForm']){
          this.$refs['ruleForm'].resetFields()
        }
        if (this.ruleForm.algorithmId){
          getOne(this.ruleForm.algorithmId).then(res => {
            let result = res.data;
            if (result.status === 1000) {
              this.ruleForm.algorithmId = result.data.algorithmId
              this.ruleForm.topic = result.data.topic
              this.ruleForm.content = result.data.content
              this.ruleForm.example = result.data.example
              this.ruleForm.tip = result.data.tip
              this.ruleForm.difficulty = result.data.difficulty
              this.ruleForm.result = result.data.result
              this.ruleForm.param = result.data.param
              this.ruleForm.remark = result.data.remark
            } else {
              this.$message({
                message: result.message,
                type: "error"
              })
            }
          })
        }
      })
      this.visible = true
    }
  }
}
</script>

<style scoped>
.div {
  /*border: black 1px solid;*/
  margin-left: 20%;
  margin-right: 20%;
  margin-bottom: 1%;
  height: 800px;
}
</style>
