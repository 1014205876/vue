export default {
    data() {
        return {
            listLoading: false, // 遮罩
            listQuery: {}, // 查询参数对象
            list: null, // 表格数据
            callback: '', // 列表查询api
            isPage: true,
            multipleSelection: [], // 被选中对象
            total: 0
        }
    },
    computed: {
        ids() {
            // 选中的id 数组 仅属性为id可用
            const arr = []
            this.multipleSelection.map(v => {
                arr.push(v.id)
            })
            return arr
        },
        batchStatus() {
            // 判断是否有选中默认
            if (this.multipleSelection.length > 0) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        handleSelectionChange(obj) { // 获取全选数据
            this.multipleSelection = obj
        },
        checkRows(row) { // 单击行选中
            this.$refs.dataTable.toggleRowSelection(row)
        },
        /*
         * 无特殊形式的获取表格
         * @param {Function} callback 请求方法
         * @param {Object} params 请求参数
         * @param {Boolean} isPage 是否有分页
         */
        getList(callback, params, isPage = true) {
            this.listLoading = true
            this.callback = callback
            this.isPage = isPage
            callback(params).then(res => {
                if (res.code === 200) {
                    if (isPage) {
                        this.total = res.data.total
                        this.list = res.data.list
                    } else {
                        this.list = res.data
                    }
                }
                this.listLoading = false
            })
        },


        getPage(current, size) {
            // 翻页方法
            this.listQuery.pageNum = current
            this.listQuery.pageSize = size
            this.getList(this.callback, this.listQuery)
        },
        
        handleSearchList() {
            // 查询函数
            this.listQuery.pageNum = 1
            this.list = []
            this.getList(this.callback, this.listQuery)
        },

        /*
         *  删除参数为自定义的使用当前方法
         * @param {Function} callback 请求方法
         * @param {Object|string|number} params 请求参数
         * @param {Object} row 当前选中的行
         * @param {Boolean} message 是否有分页
         */
        deleteTableData(callback, params, row, message = '您确定删除此条数据吗') {
            this.$confirm(message, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    callback(params).then(res => {
                        if (res.code === 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            this.getList(this.callback, this.listQuery, this.isPage)
                        } else {
                            this.$message({
                                message: '删除失败',
                                type: 'warning',
                                duration: 1000
                            })
                        }
                    })
                })
                .catch(() => {
                    this.checkRows(row)
                })
        },

        deleteTableDatas(callback, ids, message = '您确定批量删除数据吗') {
            // 删除参数为ids的使用当前方法
            if (this.batchStatus || ids.length) {
                if(ids.length==1){
                    message="您确定删除该条数据吗"
                }
                this.$confirm(message, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        let params = new URLSearchParams()
                        params.append('ids', ids)
                        callback(params).then(res => {
                            if (res.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                })
                                this.getList(this.callback, this.listQuery, this.isPage)
                            } else {
                                this.$message({
                                    message: '删除失败',
                                    type: 'warning',
                                    duration: 1000
                                })
                            }
                        })
                    })
            }
        },
        resolveNum(data, pageNum, pageSize) {
            // 分页列表序号
            data.map((item, index) => {
                let no = (pageNum - 1) * pageSize + index + 1
                item.no = no
            })
        }

    }
}
