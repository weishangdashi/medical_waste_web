webpackJsonp([13],{"4pqw":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=a("ryJa");var l={data:()=>({loading:!1,loading1:!1,loading2:!1,dateType:"daterange",types:[],columns:[],startYear:"",endYear:"",activeName:"1",kName:"",date:"",cType:"day",type:"1",tableData:[],tableData2:[],total:0,total1:0,total2:0,vFormate:"yyyy-MM-dd",cur_page:1,cur_page1:1,chooseIds:[],tableVisble1:!1,tableVisble2:!1,editVisible:!1,ruleForm:{type:""}}),methods:{formatter(t,e){var a=t[e.property];return""==a?a="0kg":a+="kg",a},formatterStatus(t,e){var a=t.status;return a=1==a?"暂存点已出库":"暂存点未出库"},formatterType(t,e){var a=t.type;return a=1==a?"感染性":"损伤性"},handleCurrentChange(t){this.cur_page=t,this.getTable()},handleCurrentChange1(t){this.cur_page1=t},handleCurrentChange2(t){this.cur_page1=t},handleClick(t,e){1==t.index?this.type=2:this.type=1,this.getTable()},handleSelectionChange(t){var e=t.map(t=>t.id);this.chooseIds=e},getExcel(t){},getExcel1(t){},getExcel2(t){},getSummaries(t){const{columns:e,data:a}=t,i=[];return e.forEach((t,e)=>{if(0===e)return void(i[e]="");if(1===e)return void(i[e]="合计");if("操作记录"==t.label)return void(i[e]="");const l=a.map(e=>Number(e[t.property]));l.every(t=>isNaN(t))||(i[e]=l.reduce((t,e)=>{const a=Number(e);return isNaN(a)?t:t+e},0),2!==e&&(i[e]+=" kg"))}),i},yearChange(t,e){var a=this.date;1==e?a[0]=t:a[1]=t,this.startYear>=this.endYear&&(this.endYear="",a[1]=""),this.date=a},detials(t,e,a){1==a?(this.tableVisble1=!0,this.storeTime=e.storeTime,this.getDetailTable(e.storeTime)):2==a&&(this.tableVisble2=!0)},edit(t,e){this.editVisible=!0,this.editId=e.id,this.ruleForm.type=e.typeId},saveEdit(){this.loading2=!0,this.$axios({method:"put",url:"/platform/hospital/rubbish/editType?id="+this.editId+"&typeId="+this.ruleForm.type}).then(t=>{200==t.status?(this.loading2=!1,this.editVisible=!1,this.getDetailTable(this.storeTime)):this.$message.error(t.data.msg)}).catch(t=>{console.log(t)})},getTable(){this.loading=!0;var t="";t=1==this.activeName?"/platform/hospital/rubbish/weightPerType?formatType="+this.cType+"&start="+this.date[0]+"&end="+this.date[1]+"&isBottle=false&status=2&pageNumber="+this.cur_page+"&pageSize=10":"/platform/hospital/rubbish/weightPerType?formatType="+this.cType+"&start="+this.date[0]+"&end="+this.date[1]+"&isBottle=true&status=2&pageNumber="+this.cur_page+"&pageSize=10",this.$axios({method:"get",url:t}).then(t=>{if(200==t.status){this.loading=!1;var e=[],a=t.data.list.map((t,a)=>{var i={storeTime:t.storeTime,total:t.total,storeTimes:1};return t.typeNames=t.typeNames.split(","),t.totals=t.totals.split(","),t.typeNames.forEach((l,s)=>{i[l]=parseFloat(t.totals[s]),0==a&&e.push(l)}),i});this.columns=e,this.tableData=a,this.total=t.data.totalCount}else this.$message.error(t.data.msg)}).catch(t=>{console.log(t)})},getDetailTable(t){this.loading1=!0;var e="";e=1==this.activeName?"/platform/hospital/rubbish/listPageByDate?formatType="+this.cType+"&date="+t+"&isBottle=false&status=2&pageNumber="+this.cur_page+"&pageSize=10":"/platform/hospital/rubbish/listPageByDate?formatType="+this.cType+"&date="+t+"&isBottle=true&status=2&pageNumber="+this.cur_page+"&pageSize=10",this.$axios({method:"get",url:e}).then(t=>{200==t.status?(this.loading1=!1,this.tableData2=t.data.list,this.total=t.data.totalCount):this.$message.error(t.data.msg)}).catch(t=>{console.log(t)})},getType(){this.$axios({method:"get",url:"/platform/hospital/type/data"}).then(t=>{if(200==t.status){this.types=t.data.data;var e={type:t.data.data[0].id};this.ruleForm=e}else this.$message.error(t.data.msg)}).catch(t=>{console.log(t)})}},mounted(){var t=i().format("YYYY-MM-DD"),e=i().subtract(30,"days").format("YYYY-MM-DD");this.date=[e,t],this.getTable(),this.getType()}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-location-outline"}),t._v(" 统计分析\n      ")]),t._v(" "),a("el-breadcrumb-item",[t._v("\n        出库统计\n      ")])],1)],1),t._v(" "),a("div",{staticClass:"container"},[a("div",[a("el-tabs",{attrs:{type:"card"},on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"医废类",name:"1"}}),t._v(" "),a("el-tab-pane",{attrs:{label:"盐水瓶",name:"2"}})],1)],1),t._v(" "),a("div",{staticClass:"borderBox"},[a("div",{staticClass:"flex headSelect",staticStyle:{"margin-bottom":"10px"}},[t._m(0),t._v(" "),a("div",{staticClass:"flex funcHead"},[a("span",{staticClass:"demonstration"},[t._v("重量统计时间：")]),t._v(" "),a("el-date-picker",{staticStyle:{width:"280px"},attrs:{type:t.dateType,"range-separator":"~","value-format":t.vFormate,"start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}}),t._v(" "),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.getTable}},[t._v("搜索")]),t._v(" "),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-download"},on:{click:t.getExcel}},[t._v("导出报表")])],1)]),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,"show-summary":"","summary-method":t.getSummaries},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"index",label:"序号",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{prop:"storeTime",label:"出库时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"storeTimes",label:"出库次数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"total",sortable:"",label:"应出库总重量",formatter:t.formatter}}),t._v(" "),t._l(t.columns,function(e,i){return a("el-table-column",{key:i,attrs:{prop:e,sortable:"",label:e,formatter:t.formatter}})}),t._v(" "),a("el-table-column",{attrs:{label:"操作记录",width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"pointer",on:{click:function(a){return t.detials(e.$index,e.row,1)}}},[t._v("点击查看")])]}}])})],2),t._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],1)]),t._v(" "),a("el-dialog",{attrs:{title:"操作记录",visible:t.tableVisble1,width:"80%"},on:{"update:visible":function(e){t.tableVisble1=e}}},[a("div",{staticStyle:{"margin-top":"-40px"},attrs:{align:"right"}},[a("el-button",{attrs:{type:"primary",icon:"el-icon-download"},on:{click:t.getExcel2}},[t._v("导出报表")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading1,expression:"loading1"}],staticStyle:{width:"100%"},attrs:{data:t.tableData2},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"index",label:"序号",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createdTime",label:"新增时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"departmentName",sortable:"",label:"科室"}}),t._v(" "),a("el-table-column",{attrs:{prop:"weight",sortable:"",label:"重量",formatter:t.formatter}}),t._v(" "),a("el-table-column",{attrs:{prop:"typeName",sortable:"",label:"类型",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"weight2",label:"记录状态"}},[t._v("\n              暂存点已出库\n            ")]),t._v(" "),a("el-table-column",{attrs:{prop:"operatorName",label:"操作人",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{prop:"staffName",label:"交接人",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"pointer",on:{click:function(a){return t.detials(e.$index,e.row,2)}}},[t._v("查看详情")])]}}])})],1),t._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next, jumper",total:t.total2},on:{"current-change":t.handleCurrentChange2}})],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"查看详情",visible:t.tableVisble2,width:"80%"},on:{"update:visible":function(e){t.tableVisble2=e}}},[a("div",{staticClass:"cTitle"},[t._v("垃圾编号： 54bbbb1Hbbbb3b7637dddd5d9859rJAs")]),t._v(" "),a("div",{staticClass:"flex detailBox"},[a("div",[a("div",{staticClass:"ball",staticStyle:{background:"#67C23A"}},[t._v("科室出库")]),t._v(" "),a("div",{staticClass:"infoBox infoBox1"},[a("div",[a("span",[t._v("所属类型：")]),t._v(" 感染性")]),t._v(" "),a("div",[a("span",[t._v("垃圾重量：")]),t._v(" 4.48kg ")]),t._v(" "),a("div",[a("span",[t._v("垃圾回收员：")]),t._v(" 回收员1")]),t._v(" "),a("div",[a("span",[t._v("垃圾回收时间：")]),t._v(" 2019-07-04 15:52")]),t._v(" "),a("div",[a("span",[t._v("垃圾交接人：")]),t._v(" 姜柳柳")]),t._v(" "),a("div",[a("span",[t._v("异常信息：")]),t._v(" -")])])]),t._v(" "),a("div",[a("div",{staticClass:"ball",staticStyle:{background:"#E6A23C"}},[t._v("暂存点出库")]),t._v(" "),a("div",{staticClass:"infoBox"},[a("div",[a("span",[t._v("暂存点交接人：")]),t._v(" 暂存点复核员")]),t._v(" "),a("div",[a("span",[t._v("暂存点出库时间：")]),t._v(" 2019-07-04 16:10 ")]),t._v(" "),a("div",[a("span",[t._v("暂存点核对重量：")]),t._v(" 4.48kg")])])]),t._v(" "),a("div",[a("div",{staticClass:"ball",staticStyle:{background:"#F56C6C"}},[t._v("暂存点出库")]),t._v(" "),a("div",{staticClass:"infoBox"},[a("div",[a("span",[t._v("所属回收公司：")]),t._v(" -")]),t._v(" "),a("div",[a("span",[t._v("回收公司回收员：")]),t._v("- ")]),t._v(" "),a("div",[a("span",[t._v("回收时间：")]),t._v("-")])])])])]),t._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:t.editVisible,width:"40%"},on:{"update:visible":function(e){t.editVisible=e}}},[a("el-form",{directives:[{name:"loading",rawName:"v-loading",value:t.loading2,expression:"loading2"}],ref:"ruleForm",attrs:{model:t.ruleForm,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"类型：",prop:"status"}},[a("el-radio-group",{model:{value:t.ruleForm.type,callback:function(e){t.$set(t.ruleForm,"type",e)},expression:"ruleForm.type"}},t._l(t.types,function(e,i){return a("el-radio",{key:i,attrs:{label:e.id}},[t._v(t._s(e.name))])}),1)],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.editVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.saveEdit("ruleForm")}}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"flex"},[e("img",{staticClass:"titleIcon",attrs:{src:a("xxCs"),alt:""}}),this._v(" "),e("div",{staticStyle:{"margin-top":"-4px"}},[this._v("出库报表")])])}]};var r=a("C7Lr")(l,s,!1,function(t){a("faj9")},"data-v-60c54c76",null);e.default=r.exports},faj9:function(t,e){}});
//# sourceMappingURL=13.1302c31bc3c08cdc9aab.js.map