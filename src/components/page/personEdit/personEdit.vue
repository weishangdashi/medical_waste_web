<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-location-outline"></i> 角色管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>人员编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="borderBox">
        <div class="flex headSelect" style="margin-bottom:10px;">
          <div class="flex">
            <img class="titleIcon" src="../../../assets/img/form.png" alt />
            <div style="margin-top: -4px;    width: 74px;">人员编辑</div>
          </div>

          <div class="flex funcHead">
            <div class="block">
              <span class="demonstration" style="margin-left:10px" >人员名称：</span>
              <el-input style="width:140px" v-model="kName" placeholder="请输入人员名称"></el-input>
            </div>
            <div class="block">
              <span class="demonstration" style="margin-left:10px" >岗位：</span>
              <el-select style="width:140PX" v-model="jName" placeholder="请选择岗位">
                <el-option
                  v-for="(item,index) in options"
                  :key="index"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>
            <el-button
              style="margin-left:10px"
              @click="getData"
              type="primary"
              icon="el-icon-search"
            >搜索</el-button>
            <el-button
              style="margin-left:10px"
              @click="toQrcode()"
              type="primary"
              icon="el-icon-download"
            >导出二维码</el-button>
            <el-button
              style="margin-left:10px"
              type="primary"
              icon="el-icon-download"
            >
            <a style="color:#fff" href="../../../../static/file/人员导入模板.xls" download="人员导入模板.xls" >人员模板</a></el-button>
            <el-button
              style="margin-left:10px"
              @click="upload()"
              type="primary"
              icon="el-icon-upload2"
              v-if="permission=='修改'"
            >导入</el-button>
            <el-button
              style="margin-left:10px"
              @click="openAdd(1)"
              type="primary"
              icon="el-icon-plus"
              v-if="permission=='修改'"
            >新增</el-button>
          </div>
        </div>
        <el-table
            :data="tableData"
            style="width: 100%"
            v-loading="loading"
          >
          <el-table-column type="index" label="序号"  width="55"></el-table-column>
          <el-table-column prop="loginname"  label="账号"  ></el-table-column>
          <el-table-column prop="username"  label="人员名称"  ></el-table-column>
          <el-table-column prop="roleName"  label="角色"  ></el-table-column>
          <el-table-column prop="positionName"  label="岗位"  ></el-table-column>
          <el-table-column prop="departmentName"  label="科室"  ></el-table-column>
          <el-table-column prop="code"  label="二维码"   >
                <template slot-scope="scope">
                        <span class="pointer"  @click="qrCode(scope.$index, scope.row)">点击查看</span>
                 </template>
          </el-table-column>
          <!-- <el-table-column prop="opAt"  label="后台开启权限"   >
          </el-table-column> -->
          <el-table-column prop="time" :formatter="timeFormate"  label="修改时间" width="140"  ></el-table-column>
          <el-table-column  label="操作" width="150px"  > 
                <template slot-scope="scope">
                        <span class="pointer"  v-if="permission=='修改'"  @click="detials(scope.$index, scope.row)"  >编辑</span>
                        <span class="pointer"  v-if="permission=='修改'" style="margin-left:10px"   @click="deal(scope.$index, scope.row)">删除</span>
                        <!-- <span class="pointer" style="margin-left:10px"  @click="reset(scope.$index, scope.row)">重置密码</span> -->
                 </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog :title="mTitle" :visible.sync="editVisible" width="40%"  >
        <el-form ref="ruleForm"  :model="ruleForm"  :rules="rules" label-width="120px" v-loading="loading1"  >
            <el-form-item label="账号：" prop="loginname" required>
                  <el-input v-model="ruleForm.loginname" :disabled="dis" ></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password" required>
                  <el-input v-model="ruleForm.password" ></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="username" required>
                  <el-input v-model="ruleForm.username" ></el-input>
            </el-form-item>
            <el-form-item label="工号：" prop="jobNumber" required>
                  <el-input v-model="ruleForm.jobNumber" ></el-input>
            </el-form-item>
            <el-form-item label="岗位：" prop="positionId" required>
                   <el-select style="width:100%"   @change="jobChange" v-model="ruleForm.positionId" placeholder="请选择">
                     <el-option
                      v-for="(item,index) in options"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                      >
                    </el-option>
                  </el-select>
            </el-form-item>
            <el-form-item label="科室：" prop="departmentId" :required="!hushi">
                   <el-select style="width:100%" v-model="ruleForm.departmentId" placeholder="请选择">
                     <el-option
                      v-for="(item,index) in departments"
                      :key="index"
                      :label="item.name"
                       :value="item.id"
                      >
                    </el-option>
                  </el-select>
            </el-form-item>
            <el-form-item label="卡号：" prop="cardId" >
                  <el-input v-model="ruleForm.cardId" maxlength="8" ></el-input>
            </el-form-item>
             <el-form-item label="权限：" prop="permission">
                     <el-radio v-model="ruleForm.permission" label="">无</el-radio>
                     <el-radio v-model="ruleForm.permission" label="查看">查看</el-radio>
                     <el-radio v-model="ruleForm.permission" label="修改">修改</el-radio>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer"  >
            <el-button @click="editVisible = false;hushi=true">取 消</el-button>
            <el-button type="primary" @click="saveEdit('ruleForm')">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center  >
        <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="delVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteRow">确 定</el-button>
        </span>
    </el-dialog>
   
   <!-- 上传弹出框 -->
    <el-dialog title="导入人员" :visible.sync="visible" width="40%"  >
        <el-form ref="ruleForm"   label-width="120px" v-loading="loading2"  >
            <el-form-item label="文件："  >
                  <el-upload
                    ref="upload"
                    class="upload-demo"
                    accept=".xls"
                    :limit="1"
                    :auto-upload="false"
                    :on-change="inputChange"
                    action="https://jsonplaceholder.typicode.com/posts/"
                   >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer"  >
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="uploads">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 二维码弹出框 -->
    <el-dialog title="二维码展示" :visible.sync="codeVisible" width="40%"  >
        <div class="flex" style="height:120px;background:#FEFF00;">
                <div style="margin-top: 4px;" ><v-Code :name="codeText" ></v-Code></div>
                <div style=" color: #000;padding-left:20px">
                    <div style="margin: 5px 0px 18px; font-size: 18px;font-weight: 600;">{{codeText.name}}</div>
                    <div>医卫士医疗废物追溯</div>
                    <div>yiweishiyiliaofeiwuzhuisu</div>
                </div>
        </div>
        <span slot="footer" class="dialog-footer"  >
            <el-button type="primary"  @click="codeVisible = false">确 定</el-button>
        </span>
    </el-dialog>

   <div class="picBox" >
        <div class="flex" v-for="(item,index) in tableData" v-bind:key="index" :id="'canvasBox'+index" style="height:120px;background:#FEFF00;width:280px;">
                <div style="margin-top: 3px;" ><canvas class="canvas" :id="'canvas'+index"></canvas></div>
                <div style=" color: #000;padding-left:20px">
                    <div style="margin: 5px 0px 18px; font-size: 18px;font-weight: 600;">{{item.name}}</div>
                    <div>医卫士医疗废物追溯</div>
                    <div>yiweishiyiliaofeiwuzhuisu</div>
                </div>
        </div>
    </div>
  </div>
</template>

<script>
const moment = require("moment");
import vCode from '../../common/qrcode.vue';
import QRCode from 'qrcode'
import html2canvas from 'html2canvas';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
export default {
  data() {
      var checkDepart  = (rule, value, callback) => {
        if(this.hushi){
          
        }else{
          if (!value) {
            return callback(new Error('请选择科室'));
          }
        }
         callback();
      };
    return {
      loading: false,
      loading1: false,
      loading2: false,
      delVisible: false,
      permission:false,
      visible: false,
      codeVisible: false,
      dis: false,
      codeText:'',
      kName:'',
      hushi:true,
      jName:'',
      mTitle:'新增',
      tableData: [
        {
          id: 1,
          name: "输液大厅",
          user:'qw12',
          time: "2018-10-08 14:44",
          name1:'121212',
          status:true,
          power:'修改'
        }
      ],
      total: 0,
      cur_page: 1,
      editVisible:false,
      ruleForm:{
        loginname:'',
        password:'',
        username:'',
        jobNumber:'',
        departmentId:'',
        positionId:'',
        permission:'查看',
        cardId:''
      },
      rules: {
          loginname: [
              { required: true, message: '请输入账号' }
          ],
          password: [
              { required: true, message: '请输入密码' }
          ],
          username: [
              { required: true, message: '请输入姓名' }
          ],
          jobNumber: [
              { required: true, message: '请输入工号' }
          ],
          departmentId: [
              { validator: checkDepart, message: '请选择科室' }
          ],
          positionId: [
              { required: true, message: '请选择岗位' }
          ],
          cardId: [
              { message: '请输入8位卡号',min:8,max:8 }
          ],
      },
      options:[
      ],
      departments:[
      ]
    };
  },
  components:{
         vCode
  },
  methods: {
    timeFormate(row){
         return moment(row.opAt*1000).format('YYYY-MM-DD HH:mm:ss');
    },
    // 点击切换页码
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    // 查询
    search() {
      console.log(this.date);
    },
    toQrcode(){
          this.loading=true;
          var imgArr=[],i=this.tableData.length-1,that=this;
          setTimeout(()=>{
              this.tableData.forEach((ele,ind)=>{
                    var canvas = document.getElementById('canvas'+ind),name={id:ele.id,name:ele.username};
                    // 生成二维码
                    QRCode.toCanvas(canvas, JSON.stringify(name),{width:120,height:120,margin:0,logo:'121212'}, function (error) {
                      if (error) console.error(error)
                    })
                    var canvasBox = document.getElementById('canvasBox'+ind);
                      // dom生成base64图片
                    html2canvas(canvasBox).then(function(canvas1) {
                        var fullQuality = canvas1.toDataURL("image/jpeg", 1.0);
                        fullQuality=fullQuality.substring(fullQuality.indexOf(',')+1);
                        imgArr.push({text:ele.username+'-'+new Date().getTime()+'.png',img:fullQuality});
                        if(ind==i){
                          // 调用打包函数
                             that.wrapImageToZip(that,imgArr,'人员二维码打包');
                        }
                    });
              })
               this.loading=false;
          },500)
    },
    jobChange(e){
      var name;
      this.options.forEach((ele)=>{
           if(ele.id==e){
              name=ele.name
           }
      })
      if(name=='护士'){
        this.hushi=false;
      }else{
        this.hushi=true;
        setTimeout(()=>{
          this.$refs['ruleForm'].validate((valid) => {
            console.log(valid)
          })
        },500)
      
      }
    },
    checkDepart(rule, value, callback){
       if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
    },
    wrapImageToZip(app,strFileList, filename){
        let that = this,
          arrImages = strFileList,
          imageCount = arrImages.length,
          numCount = 0,
          arrBase64 = [];
        arrImages.map(item => {
            numCount++;
            if (numCount == imageCount) {             
              Promise.all([
                // 下面是引入依赖包
                require('jszip'),
              ]).then(([JSZip, FileSaver]) => {
                let zip = new JSZip();
                let img = zip.folder('');
                arrImages.map((ele)=>{
                  img.file(ele.text,ele.img, {base64: true});
                })
                let fileName = `${filename}.zip`;
                zip.generateAsync({type: 'blob'})
                  .then(function (content) {
                    saveAs(content, fileName);
                  });
              });
            }
       });
    },
    openAdd(type,row){
      this.loading1=false;
      if(type==1){
        this.mTitle='新增';
        this.ruleForm={
              loginname:'',
              password:'',
              username:'',
              jobNumber:'',
              departmentId:'',
              positionId:'',
              permission:'查看',
        };
        if(this.$refs['ruleForm']){
           this.$refs['ruleForm'].resetFields();
        }
        this.dis=false;
      }else{
        this.dis=true;
        this.ruleForm.password='';
        if(this.$refs['ruleForm']){
           this.$refs['ruleForm'].resetFields();
        }
        this.mTitle='详情';
        var form=this.ruleForm;
        for(var key in row){
          form[key]=row[key]
        }
        this.ruleForm=form;
      }
      this.editVisible=true;
    },
    detials(index,row){
      this.openAdd(2,row);
    },
    // 保存编辑
    saveEdit(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
              if(this.mTitle=='新增'){
                this.add()
              }else{
                this.edit()
              }
            } else {
                return false;
            }
        });
    },
    // 添加
    add(){
        this.loading1=true;
        var data=this.ruleForm;
          this.options.forEach((ele)=>{
            if(ele.id==data.positionId){
                if(data.positionId==999){
                  data.roleId=''
                }else{
                  data.roleId=ele.roleId
                }
           }
        })
        this.$axios({
              method:'post',
              url:'/platform/sys/user/addDo',
              data:data,
          }).then((res) =>{
              if(res.data.code==0){
              this.loading1=false;
              this.editVisible = false;
              this.getData();
              this.$message.success('操作成功');
              }else{
                  this.$message.error(res.data.msg);
              }
          }).catch((error) =>{
              console.log(error)    
          })
    },
     // 编辑
    edit(){
        this.loading1=true;
        var data=this.ruleForm;
        this.options.forEach((ele)=>{
           if(ele.id==data.positionId){
             if(data.positionId==999){
               data.roleId=''
             }else{
               data.roleId=ele.roleId
             }
           }
        })
        this.$axios({
              method:'put',
              url:'/platform/sys/user/editDo',
              data:data
          }).then((res) =>{
              if(res.data.code==0){
              this.loading1=false;
              this.editVisible = false;
              this.getData();
               this.$message.success('操作成功');
              }else{
                  this.$message.error(res.data.msg);
              }
          }).catch((error) =>{
              console.log(error)    
        })
    },
    // 删除数据
    deleteRow(){
        this.$axios({
              method:'DELETE',
              url:'/platform/sys/user/delete/'+this.id,
              // url:'/platform/sys/user/delete?id='+this.id,
          }).then((res) =>{
              if(res.status==200){
                 if(res.data.code==0){
                    this.$message.success('删除成功');
                    this.getData();
                 }else{
                    this.$message.error(res.data.msg);
                 }
                   this.delVisible=false;
              }else{
                  this.$message.error(res.data.msg);
              }
          }).catch((error) =>{
              console.log(error)    
        })
    },
    // 批量添加
    allAdd(data){
        this.loading2=true;
        this.$axios({
              method:'post',
              url:'/platform/sys/user/batch',
              data:data
          }).then((res) =>{
             this.loading2=false;
              if(res.data.code==0){
              this.visible = false;
              this.$message.success('添加成功');
              this.getData()
              }else{
                  this.$message.error(res.data.msg);
              }
          }).catch((error) =>{
              console.log(error)    
          })
    },
    inputChange(file){
      const reader = new FileReader();
			reader.onload = (e) => {
				/* Parse data */
				const bstr = e.target.result;
				const wb = XLSX.read(bstr, {type:'binary'});
				/* Get first worksheet */
				const wsname = wb.SheetNames[0];
				const ws = wb.Sheets[wsname];
				/* Convert array of arrays */
				const data = XLSX.utils.sheet_to_json(ws, {header:1});
        /* Update state */
        data.shift();
        if(data[0]&&data[0].length!==7){
            this.$message('模板格式错误');
            this.$refs.upload.clearFiles();
            return 
        }else if(!data[0]){
            this.$message('空模板');
            this.$refs.upload.clearFiles();
            return 
        }
        var arr=data.map((ele)=>{
            return{loginname:ele[0],password:ele[1],username:ele[2],jobNumber:ele[3],positionName:ele[4],departmentName:ele[5],permission:ele[6]=='无'?'':ele[6]}
        })
        // this.allAdd(arr)
        this.newData=arr;
			};
			reader.readAsBinaryString(file.raw);
    },
    deal(index,row){
      this.id=row.id;
      this.delVisible=true;
    },
    exportCode(){
      console.log(11)
    },
    upload(){
      if( this.$refs.upload){
        this.$refs.upload.clearFiles();
      }
      this.visible=true;
    },
    uploads(){
      // this.$refs.upload.submit();
       this.allAdd(this.newData)
    },
    qrCode(index,row){
        this.codeText={id:row.id,name:row.username}
        this.codeVisible=true;
    },
    statusChange(){
        
    },
    // 重置密码
    reset(){
      this.$confirm('此操作将重置密码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '重置成功!'
          });
        }).catch(() => {         
        });
    },
    getJob(){
        this.$axios({
            method:'get',
            url:'/platform/hospital/position/data',
        }).then((res) =>{
            if(res.status==200){
                var data=res.data.data;
                data.unshift({id: "999", name: "不限制", roleId:""});
                this.options=data;
            }else{
                this.$message.error(res.data.msg);
            }
        }).catch((error) =>{
            console.log(error)    
        })
        this.$axios({
            method:'get',
            url:'/platform/hospital/department/data',
        }).then((res) =>{
            if(res.status==200){
                this.departments=res.data.data;
            }else{
                this.$message.error(res.data.msg);
            }
        }).catch((error) =>{
            console.log(error)    
        })
    },
    getData(){
        this.loading=true;
        var name=this.jName=='不限制'?'':this.jName;
        this.$axios({
            method:'get',
            url:'/platform/sys/user/listPage?pageNumber='+this.cur_page+'&pageSize=10&username='+this.kName+'&positionName='+name,
        }).then((res) =>{
            if(res.status==200){
                this.loading=false;
                this.tableData=[];
                this.tableData=res.data.list.map((ele)=>{
                  ele.permission=ele.permission?ele.permission:'';
                  return ele
                });
                this.total=res.data.totalCount;
            }else{
                this.$message.error(res.data.msg);
            }
        }).catch((error) =>{
            console.log(error)    
        })
    },
  },
  mounted() {
    this.permission=localStorage.permission;
    this.getJob()
    this.getData()
  }
};
</script>


<style scoped>
.cloudBox > div {
  text-align: center;
  box-sizing: border-box;
  overflow: hidden;
  min-height: 300px;
  position: relative;
}

.upload-demo /deep/ .el-upload--text{
  height:46px;
  width:100%;
  padding:5px 0;
}
.picBox{
  position: absolute;
  left:-100vw;
}

</style>

