# TimeTracker

Timer:

1. 增加倒计时
2. 倒计时完成后增加推送提醒
3. 计时开始后，将 timer 存储 storage。
   重新打开 timer 后，检查 storage 是否存在运行中的 timer 并自动运行
4. 计时完成后，将计时数据添加到 timer record

TimerList

1. 左滑菜单：快速启动正计时和倒计时
2. 右划菜单：编辑和删除功能 (done)
   1. 编辑页面 (done)
3. 将 TimerList 存入 storage / 从 storage 取出 TimerList (done)

Analysis

1. 增设 detail 页面，按日获取每日的 timer record，同时可以修改 time record
2. 对每项 trend 增设 trend detail 页面，使用柱形图展现当前周与上一周的对比
3. Analysis 增设一个 year headmap

Setting

1. 同步功能（后期）
2. About 页面
3. 联系我们
4. 写评论
5. 版本号
6. 清除所有数据
