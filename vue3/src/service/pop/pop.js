export default {
    createMessage(that, data) {
        that.$message({
            type: data.type || 'info',//类型
            message: data.message || '提示内容',//内容
            dangerouslyUseHTMLString: data.dangerouslyUseHTMLString || false,//内容是否为富文本
            offset: data.offset?data.offset: 20,//距顶部的距离
            center: data.center != false,//是否居中
            duration: data.duration != null? data.duration: 3000,//显示时间
            showClose: data.showClose || false,//是否显示关闭按钮
            onClose: () => {//关闭后的回调函数
                if (data.onClose && typeof data.onClose === 'function') {
                    data.onClose();
                }
            }
        });
    }
}